<template>
  <section>
    <div class="container">
      <div class="box body-text">
        <span>
          <strong> Thank you for choosing SEOULSPICE! </strong>
          <br />
        </span>
        <span>
          We are so excited to #FEEDYOURSEOUL with delicious Korean comfort food
          💪 🇰🇷
        </span>
        <p v-if="curbside" class="curbside">
          <em>
            Please call {{ locationPhoneNumber }} upon arriving at the
            restaurant and we will bring your order out to you.
          </em>
        </p>
      </div>
      <div class="box body-text">
        <span><strong>Order Information</strong></span>
        <p>
          Name:
          {{ name }}
          <br />
          Email:
          {{ email }}
          <br />
          Phone:
          {{ customerPhoneNumber }}
          <br />
          Location:
          {{ location.name }}
          <br />
          Address:
          {{ location.address.addressLine1 }}
          <br />
          Time:
          {{ shortTime }}
          <br />
        </p>
        <p v-if="accumulateLoyaltyPointsSuccess">
          Loyalty Points Earned: {{ accumulatedLoyaltyPoints }}
        </p>
      </div>
      <div class="box body-text">
        <span><strong>Items Ordered</strong></span>
        <div class="items-ordered" v-for="(item, index) in items" :key="index">
          <span>
            {{ item.qty }} {{ item.signature }} {{ item.name }} -
            {{ ((item.price * item.qty) / 100) | currency }}
          </span>
          <div v-if="item.type === 'entree'" class="item-list">
            <p
              v-for="(option, index) in item.options"
              v-html="printOptions(option)"
              :key="index"
            ></p>
            <p v-for="note in item.notes" :key="note">Order Note: {{ note }}</p>
          </div>
        </div>
      </div>
      <div class="box body-text">
        <p v-if="discount > 0">
          <strong>Discount:</strong>
          {{ -(discount / 100) | currency }}
        </p>
        <p>
          <strong>Subtotal:</strong>
          {{ ((total - (tax + tip)) / 100) | currency }}
        </p>
        <p>
          <strong>Tax:</strong>
          {{ (tax / 100) | currency }}
        </p>

        <p v-if="tip > 0">
          <strong>Tip:</strong>
          {{ (tip / 100) | currency }}
        </p>

        <p>
          <strong>Total:</strong>
          {{ (total / 100) | currency }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
// import { mapGetters } from "vuex";
import { orderService } from "../config/api.service";
import { EMPTY_CART } from "../store/mutations.type";
import PhoneNumber from "awesome-phonenumber";

import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "getOrderField",
  mutationType: "updateOrderField",
});
export default {
  computed: {
    // ...mapGetters(["items"]),
    ...mapFields([
      "name",
      "location",
      "time",
      "email",
      "phone",
      "curbside",
      "orderId",
      "receiptUrl",
    ]),
    shortTime() {
      return this.time.toLocaleTimeString("en-US", {
        timeStyle: "short",
      });
    },
    locationPhoneNumber() {
      const formattedPhoneNumber = new PhoneNumber(
        this.location.phoneNumber,
        "US"
      );
      return formattedPhoneNumber.getNumber("national");
    },
    customerPhoneNumber() {
      const formattedPhoneNumber = new PhoneNumber(this.phone, "US");
      return formattedPhoneNumber.getNumber("national");
    },
  },
  beforeMount() {
    this.items = [...this.$store.getters.items];
    this.$store.commit(EMPTY_CART);
  },
  async mounted() {
    const orderSummary = await this.getOrderSummary();
    if (orderSummary.data.success) {
      const {
        totalMoney,
        totalTaxMoney,
        totalDiscountMoney,
        totalTipMoney,
      } = orderSummary.data.totals;

      this.total = totalMoney.amount;
      this.tax = totalTaxMoney.amount;
      this.tip = totalTipMoney.amount;
      this.discount = totalDiscountMoney.amount;
    }

    const accumulatedPoints = await this.accumulateLoyaltyPoints();
    if (accumulatedPoints.data.success) {
      this.accumulateLoyaltyPointsSuccess = true;
      this.accumulatedLoyaltyPoints =
        accumulatedPoints.data.accumulatedLoyaltyPoints;
    }

    const receiptResponse = await this.textReceipt();
    if (receiptResponse.data.success) {
      console.log(receiptResponse.data);
    }
  },
  data() {
    return {
      tax: null,
      tip: null,
      total: null,
      discount: null,
      items: [],
      accumulatedLoyaltyPoints: null,
      accumulateLoyaltyPointsSuccess: false,
    };
  },
  methods: {
    printOptions(option) {
      let optionText = "";
      optionText += option.cartLabel + ": ";
      optionText += option.choices
        .map((choice) => {
          let choiceText = choice.qty
            ? choice.name + ` (${choice.qty})`
            : choice.name;
          return choiceText;
        })
        .join(", ");
      return optionText;
    },
    async getOrderSummary() {
      const orderSummary = await orderService.get("/order-summary", {
        params: {
          orderId: this.orderId,
        },
      });
      return orderSummary;
    },
    async accumulateLoyaltyPoints() {
      const accumulatedPoints = await orderService.post(
        "accumulate-loyalty-points",
        {
          phoneNumber: this.getSquareFormattedPhoneNumber(),
          orderId: this.orderId,
          locationId: this.location.id,
        }
      );
      return accumulatedPoints;
    },

    async textReceipt() {
      const receiptResponse = await orderService.post("/text-receipt", {
        phoneNumber: this.getSquareFormattedPhoneNumber(),
        receiptUrl: this.receiptUrl,
      });
      return receiptResponse;
    },
    getSquareFormattedPhoneNumber() {
      return new PhoneNumber(this.phone, "US").getNumber();
    },
  },
  name: "OrderSummary",
};
</script>

<style scoped>
.container {
  width: 95%;
  max-width: 600px !important;
}
h3 {
  margin-top: 20px;
}

.item-list {
  font-size: 12px;
  margin-left: 12px;
}

.box {
  margin-bottom: 20px !important;
}

.items-ordered {
  margin-bottom: 10px;
}
.curbside {
  font-size: 13px;
}
</style>
