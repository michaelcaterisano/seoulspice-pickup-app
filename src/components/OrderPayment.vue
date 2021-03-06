<template>
  <section>
    <b-loading is-full-page v-model="isLoading" :can-cancel="false"></b-loading>
    <div class="container">
      <b-message
        type="is-danger"
        title="Payment Error"
        v-if="paymentErrors.length"
      >
        <p>We were unable to process your payment.</p>
        <div class="content">
          <ul>
            <li v-for="(error, index) in paymentErrors" :key="index">
              {{ error.message.detail }}
            </li>
          </ul>
        </div>
      </b-message>
      <b-message
        type="is-danger"
        title="Payment Error"
        v-if="creditCardErrors.length"
      >
        <p>Please correct the following errors:</p>
        <div class="content">
          <ul>
            <li v-for="(error, index) in creditCardErrors" :key="index">
              {{ error.message }}
            </li>
          </ul>
        </div>
      </b-message>
      <div id="form-container">
        <div v-if="hasReward && !orderError" class="box">
          <div class="loyalty">
            <span class="card-title">YOU HAVE A REWARD!</span>
            <span class="card-subtitle">{{ rewardName.toUpperCase() }}</span>
            <b-button
              :loading="rewardLoading"
              :disabled="rewardRedeemed"
              class="redeem body-text"
              @click.native="createLoyaltyReward"
              >{{ rewardButtonMessage }}</b-button
            >
          </div>
        </div>

        <OrderTotals v-if="!orderError" type="checkout" />

        <div id="sq-card-number"></div>
        <div class="third" id="sq-expiration-date"></div>
        <div class="third" id="sq-cvv"></div>
        <div class="third" id="sq-postal-code"></div>

        <button
          v-if="!orderError"
          id="sq-creditcard"
          class="button-credit-card"
          @click.prevent="processPayment"
        >
          Pay with card {{ ((orderTotal + tip) / 100) | currency }}
        </button>
        <button
          v-if="!orderError"
          class="apple-pay-button apple-pay-button-black"
          id="sq-apple-pay"
        ></button>
        <button
          v-if="!orderError"
          id="sq-google-pay"
          class="button-google-pay"
        ></button>
      </div>
    </div>
  </section>

  <!-- end #form-container -->
</template>

<script>
import OrderTotals from "./OrderTotals";
import { EMPTY_CART } from "../store/mutations.type";
import { mapGetters, mapMutations } from "vuex";
import { orderService } from "../config/api.service";
import PhoneNumber from "awesome-phonenumber";
import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "getOrderField",
  mutationType: "updateOrderField",
});
export default {
  components: {
    OrderTotals,
  },
  computed: {
    ...mapGetters([
      "total",
      "itemSubtotal",
      "tax",
      "taxRate",
      "items",
      "tip",
      "orderIsPaid",
    ]),
    ...mapFields([
      "name",
      "location",
      "time",
      "email",
      "phone",
      "curbside",
      "orderId",
      "orderTotal",
      "orderTip",
      "orderTax",
      "orderDiscount",
    ]),
    priceDollars() {
      return this.total / 100;
    },
    development() {
      return process.env.NODE_ENV === "development";
    },
    rewardButtonMessage() {
      return this.rewardRedeemed ? "REWARD REDEEMED" : "REDEEM LOYALTY REWARD";
    },
  },
  created() {
    window.addEventListener("unload", async () => {
      await this.cleanUp();
    });
  },
  data() {
    return {
      isLoading: false,
      paymentForm: null,
      paymentErrors: [],
      creditCardErrors: [],
      orderError: false,
      submitDisabled: false,
      hasReward: false,
      rewardName: null,
      rewardRedeemed: false,
      rewardLoading: false,
      rewardId: null,
      loadingComponent: null,
    };
  },
  async mounted() {
    await this.createOrder();
  },
  methods: {
    ...mapMutations(["updateReceiptUrl", "updateOrderPaid"]),
    getFormattedPhoneNumber() {
      return new PhoneNumber(this.phone, "US").getNumber();
    },
    showStartOverDialog() {
      this.$buefy.dialog.alert({
        title: "Order Error",
        message:
          "Something went wrong and we were unable to create your order.",
        type: "is-danger",
        ariaRole: "alertdialog",
        ariaModal: true,
        confirmText: "Start Over",
        onConfirm: () => {
          this.$store.commit(EMPTY_CART);
          this.$emit("update", "location");
        },
      });
    },
    async createOrder() {
      this.isLoading = true;
      try {
        const order = await orderService.post("/create-order", {
          items: this.items,
          locationId: this.location.id,
          name: this.name,
          email: this.email,
          curbside: this.curbside,
          phoneNumber: this.phone,
          taxRate: this.taxRate,
          time: this.time,
        });
        if (!order.data.success) {
          this.isLoading = false;
          this.orderError = true;
          this.showStartOverDialog();
        } else {
          this.orderError = false;
          this.orderId = order.data.orderId;
          this.orderTotal = order.data.orderTotal;
          this.orderTax = order.data.orderTax;
          this.orderTip = order.data.orderTip;
          this.orderDiscount = order.data.orderDiscount;

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
                fontFamily: "helvetica",
                lineHeight: "24px",
                placeholderFontWeight: 300,
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
            googlePay: {
              elementId: "sq-google-pay",
            },
            // SqPaymentForm callback functions
            callbacks: {
              paymentFormLoaded: async () => {
                await this.getRewards();
              },
              /*
               * callback function: cardNonceResponseReceived
               * Triggered when: SqPaymentForm completes a card nonce request
               */
              cardNonceResponseReceived: async (errors, nonce) => {
                if (errors) {
                  this.isLoading = false;
                  // Log errors from nonce generation to the browser developer console.
                  errors.forEach(error => {
                    // eslint-disable-next-line
                    console.log(error);
                    window.scrollTo(0, 0);
                    this.creditCardErrors.push(error);
                  });
                  return;
                }

                this.submitDisabled = true;
                // const loadingComponent = this.$buefy.loading.open({
                //   container: null,
                // });
                this.isLoading = true;
                // change this to hit /create-payment
                let response = await orderService.post("/create-payment", {
                  locationId: this.location.id,
                  sourceId: nonce,
                  orderId: this.orderId,
                  amount: this.orderTotal,
                  tip: this.tip,
                });

                if (response.status === 200) {
                  if (response.data.success) {
                    this.isLoading = false;
                    // this.$gtag.event("transaction", {
                    //   transaction_id:
                    //     new Date().getTime() + Math.ceil(Math.random() * 1000),
                    //   value: this.total.toFixed(2),
                    //   tax: this.tax.toFixed(2),
                    // });

                    this.updateReceiptUrl(response.data.receiptUrl);
                    this.updateOrderPaid(true);
                    this.$emit("update", "summary");
                  } else {
                    this.isLoading = false;
                    window.scrollTo(0, 0);
                    this.submitDisabled = false;
                    this.paymentErrors.push({
                      message: response.data.error.errors[0],
                    });
                  }
                }
              },
              methodsSupported: (methods, unsupportedReason) => {
                // eslint-disable-next-line
                console.log(methods);

                var applePayBtn = document.getElementById("sq-apple-pay");
                var googlePayBtn = document.getElementById("sq-google-pay");

                // Only show the button if Apple Pay on the Web is enabled
                // Otherwise, display the wallet not enabled message.
                if (methods.applePay === true) {
                  applePayBtn.style.display = "inline-block";
                }
                if (methods.googlePay === true) {
                  googlePayBtn.style.display = "inline-block";
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
                    amount: ((this.orderTotal + this.tip) / 100)
                      .toFixed(2)
                      .toString(),
                    pending: false,
                  },
                };

                return paymentRequestJson;
              },
            },
          });
          this.paymentForm.build();
        }
      } catch (error) {
        this.isLoading = false;
        this.orderError = true;
        this.showStartOverDialog();
      }
    },

    // handle loyalty reward lookup
    // const rewards = await this.getRewards();

    async getRewards() {
      try {
        const rewards = await orderService.post("/get-loyalty-account", {
          phoneNumber: this.getFormattedPhoneNumber(),
        });
        if (rewards.data.success) {
          // add button
          if (rewards.data.hasReward) {
            this.hasReward = true;
            this.rewardName = rewards.data.name;
          }
          this.isLoading = false;
        } else {
          this.isLoading = false;
          if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line
            console.log("loyalty failed");
          }
        }
      } catch (error) {
        this.isLoading = false;
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line
          console.log(error);
        }
      }
    },
    async createLoyaltyReward() {
      try {
        this.rewardLoading = true;
        const result = await orderService.post("/create-loyalty-reward", {
          phoneNumber: this.getFormattedPhoneNumber(),
          orderId: this.orderId,
        });
        if (result.data.success) {
          this.rewardLoading = false;
          this.orderTotal = result.data.updatedOrderTotal;
          this.rewardRedeemed = true;
          this.orderDiscount = result.data.orderDiscount;
          this.orderTax = result.data.orderTax;
          this.rewardDiscount = result.data.orderDiscount / 100;
          this.rewardId = result.data.rewardId;
        } else {
          this.rewardLoading = false;
        }
      } catch (error) {
        this.rewardLoading = false;
      }
    },
    processPayment() {
      this.paymentErrors = [];
      this.creditCardErrors = [];
      if (!this.submitDisabled) {
        this.paymentForm.requestCardNonce();
      }
    },
    async cleanUp() {
      if (this.rewardId && !this.orderIsPaid) {
        try {
          await orderService.post("/delete-loyalty-reward", {
            rewardId: this.rewardId,
          });
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line
            console.log(error);
          }
        }
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
  height: auto;
  margin: 0 auto 30px auto;
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

.button-google-pay {
  width: 100%;
  min-width: 200px;
  min-height: 48px;
  padding: 11px 24px;
  margin: 24px 0 0 0;
  background-color: #000;
  background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22103%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M.148%202.976h3.766c.532%200%201.024.117%201.477.35.453.233.814.555%201.085.966.27.41.406.863.406%201.358%200%20.495-.124.924-.371%201.288s-.572.64-.973.826v.084c.504.177.912.471%201.225.882.313.41.469.891.469%201.442a2.6%202.6%200%200%201-.427%201.47c-.285.43-.667.763-1.148%201.001A3.5%203.5%200%200%201%204.082%2013H.148V2.976zm3.696%204.2c.448%200%20.81-.14%201.085-.42.275-.28.413-.602.413-.966s-.133-.684-.399-.959c-.266-.275-.614-.413-1.043-.413H1.716v2.758h2.128zm.238%204.368c.476%200%20.856-.15%201.141-.448.285-.299.427-.644.427-1.036%200-.401-.147-.749-.441-1.043-.294-.294-.688-.441-1.183-.441h-2.31v2.968h2.366zm5.379.903c-.453-.518-.679-1.239-.679-2.163V5.86h1.54v4.214c0%20.579.138%201.013.413%201.302.275.29.637.434%201.085.434.364%200%20.686-.096.966-.287.28-.191.495-.446.644-.763a2.37%202.37%200%200%200%20.224-1.022V5.86h1.54V13h-1.456v-.924h-.084c-.196.336-.5.611-.91.826-.41.215-.845.322-1.302.322-.868%200-1.528-.259-1.981-.777zm9.859.161L16.352%205.86h1.722l2.016%204.858h.056l1.96-4.858H23.8l-4.41%2010.164h-1.624l1.554-3.416zm8.266-6.748h1.666l1.442%205.11h.056l1.61-5.11h1.582l1.596%205.11h.056l1.442-5.11h1.638L36.392%2013h-1.624L33.13%207.876h-.042L31.464%2013h-1.596l-2.282-7.14zm12.379-1.337a1%201%200%200%201-.301-.735%201%201%200%200%201%20.301-.735%201%201%200%200%201%20.735-.301%201%201%200%200%201%20.735.301%201%201%200%200%201%20.301.735%201%201%200%200%201-.301.735%201%201%200%200%201-.735.301%201%201%200%200%201-.735-.301zM39.93%205.86h1.54V13h-1.54V5.86zm5.568%207.098a1.967%201.967%200%200%201-.686-.406c-.401-.401-.602-.947-.602-1.638V7.218h-1.246V5.86h1.246V3.844h1.54V5.86h1.736v1.358H45.75v3.36c0%20.383.075.653.224.812.14.187.383.28.728.28.159%200%20.299-.021.42-.063.121-.042.252-.11.392-.203v1.498c-.308.14-.681.21-1.12.21-.317%200-.616-.051-.896-.154zm3.678-9.982h1.54v2.73l-.07%201.092h.07c.205-.336.511-.614.917-.833.406-.22.842-.329%201.309-.329.868%200%201.53.254%201.988.763.457.509.686%201.202.686%202.079V13h-1.54V8.688c0-.541-.142-.947-.427-1.218-.285-.27-.656-.406-1.113-.406-.345%200-.656.098-.931.294a2.042%202.042%200%200%200-.651.777%202.297%202.297%200%200%200-.238%201.029V13h-1.54V2.976zm32.35-.341v4.083h2.518c.6%200%201.096-.202%201.488-.605.403-.402.605-.882.605-1.437%200-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0%205.52v4.736h-1.504V1.198h3.99c1.013%200%201.873.337%202.582%201.012.72.675%201.08%201.497%201.08%202.466%200%20.991-.36%201.819-1.08%202.482-.697.665-1.559.996-2.583.996h-2.485v.001zm7.668%202.287c0%20.392.166.718.499.98.332.26.722.391%201.168.391.633%200%201.196-.234%201.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61%200-1.12.148-1.528.442-.409.294-.613.657-.613%201.093m1.946-5.815c1.112%200%201.989.297%202.633.89.642.594.964%201.408.964%202.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45%201.372-2.486%201.372-.882%200-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96%200-.828.313-1.486.94-1.976s1.463-.735%202.51-.735c.892%200%201.629.163%202.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132%202.132%200%200%200-1.455-.547c-.84%200-1.504.353-1.995%201.062l-1.324-.834c.73-1.045%201.81-1.568%203.238-1.568m11.853.262l-5.02%2011.53H96.42l1.864-4.034-3.302-7.496h1.635l2.387%205.749h.032l2.322-5.75z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M75.448%207.134c0-.473-.04-.93-.116-1.366h-6.344v2.588h3.634a3.11%203.11%200%200%201-1.344%202.042v1.68h2.169c1.27-1.17%202.001-2.9%202.001-4.944%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M68.988%2013.7c1.816%200%203.344-.595%204.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754%200-3.244-1.182-3.776-2.774h-2.234v1.731a6.728%206.728%200%200%200%206.01%203.703%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M65.212%208.267a4.034%204.034%200%200%201%200-2.572V3.964h-2.234a6.678%206.678%200%200%200-.717%203.017c0%201.085.26%202.11.717%203.017l2.234-1.731z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M68.988%202.921c.992%200%201.88.34%202.58%201.008v.001l1.92-1.918c-1.165-1.084-2.685-1.75-4.5-1.75a6.728%206.728%200%200%200-6.01%203.702l2.234%201.731c.532-1.592%202.022-2.774%203.776-2.774%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E);
  background-origin: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 1px 1px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  outline: 0;
  cursor: pointer;
  display: none;
}

@supports (-webkit-appearance: -apple-pay-button) {
  .apple-pay-button {
    display: none;
    -webkit-appearance: -apple-pay-button;
    width: 100%;
    min-width: 200px;
    min-height: 48px;
    padding: 23px !important;
    margin: 24px 0 0 0;
  }
  .apple-pay-button-black {
    -apple-pay-button-style: red;
  }
  .apple-pay-button-white {
    -apple-pay-button-style: white;
  }
  .apple-pay-button-white-with-line {
    -apple-pay-button-style: white-outline;
  }
}

@supports not (-webkit-appearance: -apple-pay-button) {
  .apple-pay-button {
    display: none;
    background-size: 100% 60%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border-radius: 5px;
    box-sizing: border-box;
    width: 100%;
    padding: 23px !important;
    min-width: 200px;
    min-height: 48px;
    margin: 24px 0 0 0;
  }
  .apple-pay-button-black {
    background-image: -webkit-named-image(apple-pay-logo-white);
    background-color: black;
  }
  .apple-pay-button-white {
    background-image: -webkit-named-image(apple-pay-logo-black);
    background-color: white;
  }
  .apple-pay-button-white-with-line {
    background-image: -webkit-named-image(apple-pay-logo-black);
    background-color: white;
    border: 0.5px solid black;
  }
}

@media screen and (max-width: 767px) {
  #form-container {
    width: 95%;
  }
}

/* Customize the Apple Pay on the Web button */
/* #sq-apple-pay {
  width: 100%;
  height: 48px;
  padding: 0;
  margin: 10px;
  background-image: -webkit-named-image(apple-pay-logo-white);
  background-color: black;
  background-size: 100% 60%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 4px;
  cursor: pointer;
  display: none;
} */

.loyalty {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
