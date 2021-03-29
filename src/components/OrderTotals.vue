<template>
  <div class="box body-text">
    <div v-if="type !== 'checkout'">
      <p>
        <span>Subtotal: </span>
        {{ subtotalDollars | currency }}
      </p>
      <p v-if="tip > 0">
        <span>Tip: </span>
        {{ tipDollars | currency }}
      </p>
      <p v-if="taxRate > 0">
        <span>Tax:</span>
        {{ taxDollars | currency }}
      </p>
      <p>
        <span>Total: </span>
        {{ totalDollars | currency }}
      </p>
    </div>
    <div v-if="type == 'checkout'">
      <p v-if="orderDiscount > 0">
        <span>Discount</span>
        {{ -(orderDiscount / 100) | currency }}
      </p>
      <p>
        <span>Subtotal: </span>
        {{ ((orderTotal - orderTax) / 100) | currency }}
      </p>
      <p>
        <span>Tax:</span>
        {{ (orderTax / 100) | currency }}
      </p>
      <p>
        <span>Tip: </span>
        {{ (tip / 100) | currency }}
      </p>

      <p>
        <span>Total: </span>
        {{ ((orderTotal + tip) / 100) | currency }}
      </p>
    </div>
    <div v-if="type == 'checkout'">
      <p class="discount-code-label">Discount Code</p>
      <b-field
        :type="{ 'is-danger': invalidDiscountCode }"
        :message="discountCodeMessage"
        class="discount-code-field"
      >
        <b-input
          v-model="discountCode"
          name="discount-code"
          placeholder="(optional)"
          size="is-small"
          class="discount-code"
        ></b-input>
        <p class="control">
          <b-button
            :loading="discountLoading"
            :disabled="discountDisabled"
            class="button is-success is-small"
            @click.native="applyDiscountCode"
            >Apply</b-button
          >
        </p>
      </b-field>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "getOrderField",
  mutationType: "updateOrderField",
});
import { orderService } from "../config/api.service";

export default {
  name: "Totals",
  computed: {
    ...mapGetters(["subtotal", "tip", "tax", "taxRate", "total"]),
    ...mapFields([
      "orderId",
      "orderTotal",
      "orderTip",
      "orderTax",
      "orderDiscount",
    ]),
    subtotalDollars() {
      return this.subtotal / 100;
    },
    tipDollars() {
      return this.tip / 100;
    },
    taxDollars() {
      return this.tax / 100;
    },
    totalDollars() {
      return this.total / 100;
    },
    mobileButtonText() {
      return this.mobileMenuOpen ? "Hide Totals" : "View Totals";
    },
  },
  data() {
    return {
      mobileMenuOpen: false,
      invalidDiscountCode: false,
      discountCodeMessage: "",
      discountCode: null,
      discountLoading: false,
      discountDisabled: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    async applyDiscountCode() {
      this.discountLoading = true;
      try {
        const result = await orderService.post("/discount-code", {
          orderId: this.orderId,
          discountCode: this.discountCode,
        });
        if (result.data.success) {
          this.discountLoading = false;
          this.discountDisabled = true;
          this.orderDiscount = result.data.orderDiscount;
          this.orderTotal = result.data.orderTotal;
          this.orderTax = result.data.orderTax;
          this.invalidDiscountCode = false;
          this.discountCodeMessage = "";
        } else {
          this.discountLoading = false;
          this.invalidDiscountCode = true;
          this.discountCodeMessage = "Invalid discount code";
        }
      } catch (error) {
        // show error toast
        console.log(error);
      }
    },
  },
  props: ["type"],
};
</script>

<style lang="scss" scoped>
.discount-code {
  display: block;
  border: 1px solid #dbdbdb !important;
  border-radius: 4px;
}
.discount-code-field {
  margin-top: 24px;
}
.discount-code-label {
  margin: 24px 0 -24px 2px;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  font-weight: 300;
  color: rgba(0, 0, 0, 0.4) !important;
  font-size: 12px !important;
}
::-moz-placeholder {
  /* Firefox 19+ */
  font-weight: 330;
}
:-ms-input-placeholder {
  /* IE 10+ */
  font-weight: 330;
}
:-moz-placeholder {
  /* Firefox 18- */
  font-weight: 330;
}
</style>
