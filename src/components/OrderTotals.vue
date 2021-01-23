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
      <p>
        <span>Subtotal: </span>
        {{ (orderTotal / 100) | currency }}
      </p>
      <p>
        <span>Tax:</span>
        {{ (orderTax / 100) | currency }}
      </p>
      <p>
        <span>Tip: </span>
        {{ (orderTip / 100) | currency }}
      </p>
      <p>
        <span>Total: </span>
        {{
          ((orderTotal + orderTip + orderTax - orderDiscount) / 100) | currency
        }}
      </p>
      <p v-if="orderDiscount > 0">
        <span>Discount</span>
        {{ (orderDiscount / 100) | currency }}
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
export default {
  name: "Totals",
  computed: {
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
    ...mapGetters(["subtotal", "tip", "tax", "taxRate", "total"]),
  },
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
  },
  props: ["type", "orderTotal", "orderTax", "orderTip", "orderDiscount"],
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
