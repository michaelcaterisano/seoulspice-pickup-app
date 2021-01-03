<template>
  <div class="box body-text">
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
  props: ["type"],
};
</script>

<style lang="scss" scoped>
// .navbar-start {
//   margin: 0 auto;
//   padding-right: 280px;
// }

// .navbar-item img {
//   max-height: 2.75em;
// }

// /* mobile and tablet */
// @media screen and (max-width: 768px) {
//   .navbar-start {
//     padding-right: 0;
//     .navbar-item {
//       padding-right: 0;
//     }
//   }

//   .navbar {
//     font-size: 80%;
//   }
// }

// /* tablet and bigger */
// @media screen and (min-width: 768px) {
//   .button.is-medium {
//     display: none;
//   }
// }
// /* mobile */
// @media screen and (max-width: 767px) {
//   .navbar-brand {
//     .button {
//       margin: 0 auto;
//     }

//     .navbar-item {
//       padding: 0;
//     }
//   }
// }
</style>
