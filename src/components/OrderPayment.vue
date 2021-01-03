<template>
  <section>
    <div class="container">
      <b-message
        type="is-danger"
        title="Payment Error"
        v-if="paymentErrors.length"
      >
        <p>Please correct the following errors:</p>
        <div class="content">
          <ul>
            <li v-for="(error, index) in paymentErrors" :key="index">
              {{ error.message }}
            </li>
          </ul>
        </div>
      </b-message>
      <b-message type="is-danger" title="Order Error" v-if="orderErrors.length">
        <p>We were unable to create your order.</p>
        <div v-if="development" class="content">
          <ul>
            <li v-for="(error, index) in orderErrors" :key="index">
              {{ error.message }}
            </li>
          </ul>
        </div>
      </b-message>
      <div id="form-container">
        <div v-if="hasReward" class="loyalty box is-size-7">
          <div v-if="!rewardRedeemed">
            <span>You have a reward!</span><br />
            <span>{{ rewardName }}</span
            ><br />
            <b-button
              class="redeem is-size-7"
              @click.native="createLoyaltyReward"
              >Redeem loyalty reward</b-button
            >
          </div>
          <div v-if="rewardRedeemed">
            Order discounted {{ rewardDiscount | currency }}
          </div>
        </div>

        <div id="sq-card-number"></div>
        <div class="third" id="sq-expiration-date"></div>
        <div class="third" id="sq-cvv"></div>
        <div class="third" id="sq-postal-code"></div>
        <button
          id="sq-creditcard"
          class="button-credit-card"
          @click.prevent="processPayment"
        >
          Pay with card {{ ((orderTotal + tip) / 100) | currency }}
        </button>
        <button id="sq-apple-pay"></button>
      </div>
    </div>
  </section>

  <!-- end #form-container -->
</template>

<script>
import { mapGetters } from "vuex";
import { orderService } from "../config/api.service";
import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "getOrderField",
  mutationType: "updateOrderField",
});
export default {
  computed: {
    ...mapGetters(["total", "itemSubtotal", "tax", "taxRate", "items", "tip"]),
    ...mapFields([
      "name",
      "location",
      "time",
      "email",
      "phone",
      "curbside",
      "orderId",
    ]),
    priceDollars() {
      return this.total / 100;
    },
    development() {
      return process.env.NODE_ENV === "development";
    },
  },
  data() {
    return {
      paymentForm: null,
      paymentErrors: [],
      orderErrors: [],
      submitDisabled: false,
      // orderId: null,
      orderTotal: null,
      hasReward: false,
      rewardName: null,
      rewardRedeemed: false,
      loadingComponent: null,
    };
  },
  async mounted() {
    this.loadingComponent = this.$buefy.loading.open();
    // create order
    const order = await this.createOrder();
    if (!order.data.success) {
      this.orderErrors.push({ message: order.data.message });
    } else {
      this.orderId = order.data.orderId;
      this.orderTotal = order.data.orderTotal;

      // handle loyalty reward lookup
      const rewards = await this.getRewards();
      if (rewards.data.success && rewards.data.hasReward) {
        // add button
        this.hasReward = true;
        this.rewardName = rewards.data.name;
      }

      // payment
      // eslint-disable-next-line no-undef
      this.paymentForm = new SqPaymentForm({
        // Initialize the payment form elements
        applicationId: process.env.VUE_APP_SQUAREUP_APPLICATION_ID,
        inputClass: "sq-input",
        locationId: this.location.id,
        autoBuild: false,
        // Customize the CSS for SqPaymentForm iframe elements
        inputStyles: [
          {
            fontSize: "16px",
            lineHeight: "24px",
            padding: "16px",
            placeholderColor: "#a0a0a0",
            backgroundColor: "transparent",
          },
        ],
        // Initialize the credit card placeholders
        cardNumber: {
          elementId: "sq-card-number",
          placeholder: "Card Number",
        },
        cvv: {
          elementId: "sq-cvv",
          placeholder: "CVV",
        },
        expirationDate: {
          elementId: "sq-expiration-date",
          placeholder: "MM/YY",
        },
        postalCode: {
          elementId: "sq-postal-code",
          placeholder: "Postal",
        },
        applePay: {
          elementId: "sq-apple-pay",
        },
        // SqPaymentForm callback functions
        callbacks: {
          paymentFormLoaded: () => {
            this.loadingComponent.close();
          },
          /*
           * callback function: cardNonceResponseReceived
           * Triggered when: SqPaymentForm completes a card nonce request
           */
          cardNonceResponseReceived: async (errors, nonce) => {
            if (errors) {
              // Log errors from nonce generation to the browser developer console.
              errors.forEach((error) => {
                this.paymentErrors.push(error);
              });
              return;
            }

            this.submitDisabled = true;
            const loadingComponent = this.$buefy.loading.open({
              container: null,
            });
            // change this to hit /create-payment
            let response = await orderService.post("/create-payment", {
              phoneNumber: "+1" + this.phone,
              locationId: this.location.id,
              sourceId: nonce,
              orderId: this.orderId,
              amount: this.orderTotal,
              tip: this.tip,
            });
            loadingComponent.close();

            if (response.status === 200) {
              if (response.data.success) {
                this.$gtag.event("transaction", {
                  transaction_id:
                    new Date().getTime() + Math.ceil(Math.random() * 1000),
                  value: this.total.toFixed(2),
                  tax: this.tax.toFixed(2),
                });

                this.$emit("update", "summary");
              } else {
                this.submitDisabled = false;
                this.paymentErrors.push({ message: response.data.message });
              }
            }
          },
          methodsSupported: (methods, unsupportedReason) => {
            // eslint-disable-next-line

            var applePayBtn = document.getElementById("sq-apple-pay");

            // Only show the button if Apple Pay on the Web is enabled
            // Otherwise, display the wallet not enabled message.
            if (methods.applePay === true) {
              applePayBtn.style.display = "inline-block";
            } else {
              // eslint-disable-next-line
              console.log(unsupportedReason);
            }
          },
          createPaymentRequest: () => {
            const paymentRequestJson = {
              requestShippingAddress: false,
              requestBillingInfo: false,
              currencyCode: "USD",
              countryCode: "US",
              total: {
                label: "Seoulspice",
                amount: this.orderTotal,
                pending: false,
              },
            };

            return paymentRequestJson;
          },
        },
      });
    }

    this.paymentForm.build();
  },
  methods: {
    async createOrder() {
      const result = await orderService.post("/create-order", {
        items: this.items,
        locationId: this.location.id,
        name: this.name,
        email: this.email,
        curbside: this.curbside,
        // tip: this.tip,
        taxRate: this.taxRate,
        time: this.time,
      });
      return result;
    },
    async getRewards() {
      const result = await orderService.post("/get-loyalty-account", {
        phoneNumber: "+1" + this.phone,
      });
      return result;
    },
    async createLoyaltyReward() {
      const loadingComponent = this.$buefy.loading.open();
      const result = await orderService.post("/create-loyalty-reward", {
        phoneNumber: "+1" + this.phone,
        orderId: this.orderId,
      });
      loadingComponent.close();
      if (result.data.success) {
        this.orderTotal = result.data.updatedOrderTotal;
        this.rewardRedeemed = true;
        this.rewardDiscount = result.data.discount / 100;
      }
    },
    processPayment() {
      this.paymentErrors = [];
      if (!this.submitDisabled) {
        this.paymentForm.requestCardNonce();
      }
    },
  },
  name: "OrderPayment",
};
</script>

<style>
#form-container {
  position: relative;
  width: 380px;
  height: 100vh;
  margin: 0 auto;
}

.third {
  float: left;
  width: calc((100% - 32px) / 3);
  padding: 0;
  margin: 0 16px 16px 0;
}

.third:last-of-type {
  margin-right: 0;
}

/* Define how SqPaymentForm iframes should look */
.sq-input {
  height: 56px;
  box-sizing: border-box;
  border: 1px solid #e0e2e3;
  background-color: white;
  border-radius: 6px;
  display: inline-block;
  -webkit-transition: border-color 0.2s ease-in-out;
  -moz-transition: border-color 0.2s ease-in-out;
  -ms-transition: border-color 0.2s ease-in-out;
  transition: border-color 0.2s ease-in-out;
}

/* Define how SqPaymentForm iframes should look when they have focus */
.sq-input--focus {
  border: 1px solid #6e4eec;
}

/* Define how SqPaymentForm iframes should look when they contain invalid values */
.sq-input--error {
  border: 1px solid #e02f2f;
}

#sq-card-number {
  margin-bottom: 16px;
}

/* Customize the "Pay with Credit Card" button */
.button-credit-card {
  border-radius: 50px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.04);
  height: auto;
  font-size: 16px;
  letter-spacing: 0.5px;
  line-height: 24px;
  margin-top: 16px;
  padding: 16px;
  position: relative;
  text-transform: uppercase;
  width: 100%;
  z-index: 1;
  background: linear-gradient(180deg, #8e72ff -57.14%, #6e4eec 125%);
  border: none;
  color: #fff;
}

.button-credit-card:hover {
  background: linear-gradient(180deg, #a791ff -57.14%, #856aef 125%);
  color: #fff;
}

@media screen and (max-width: 767px) {
  #form-container {
    width: 95%;
  }
}

/* Customize the Apple Pay on the Web button */
#sq-apple-pay {
  width: 100%;
  height: 48px;
  padding: 0;
  margin: 24px 0 16px 0;
  background-image: -webkit-named-image(apple-pay-logo-white);
  background-color: black;
  background-size: 100% 60%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 4px;
  cursor: pointer;
  display: none;
}

.loyalty {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
