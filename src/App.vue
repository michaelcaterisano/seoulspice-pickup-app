<template>
  <div id="app">
    <NavBar :active="active" />
    <CartSideBar
      :isOpen="cartIsOpen"
      @update="setActive"
      @edit="setEdit"
      @close-cart="closeCart"
    />
    <section class="site-wrapper">
      <transition name="fade">
        <OrderLocation v-if="active === 'location'" @update="setActive" />
        <OrderEntrees
          v-if="active === 'entree'"
          @update="setActive"
          :edit="edit"
        />
        <OrderAddons v-if="active === 'addon'" @update="setActive" />
        <OrderConfirmation
          v-if="active === 'confirmation'"
          @update="setActive"
          @edit="setEdit"
          type="page"
        />
        <OrderInformation v-if="active === 'order-info'" @update="setActive" />
        <OrderPayment v-if="active === 'payment'" @update="setActive" />
        <OrderSummary v-if="active === 'summary'" @update="setActive" />
      </transition>
    </section>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import CartSideBar from "./components/CartSideBar";

// import OrderTotals from "./components/OrderTotals";
import OrderLocation from "./components/OrderLocation";
import OrderEntrees from "./components/OrderEntrees";
import OrderAddons from "./components/OrderAddons";
import OrderConfirmation from "./components/OrderConfirmation";
import OrderInformation from "./components/OrderInformation";
import OrderPayment from "./components/OrderPayment";
import OrderSummary from "./components/OrderSummary";

import { SET_CART_OPEN } from "./store/mutations.type";
import { mapGetters } from "vuex";
export default {
  components: {
    NavBar,
    CartSideBar,
    OrderAddons,
    OrderLocation,
    OrderEntrees,
    // OrderTotals,
    OrderConfirmation,
    OrderInformation,
    OrderPayment,
    OrderSummary,
  },
  computed: {
    ...mapGetters(["cartIsOpen", "orderIsPaid"]),
  },
  created() {
    window.addEventListener("beforeunload", this.handleUnload);
  },
  data() {
    return {
      active: "location", // current active module
      edit: false,
    };
  },
  watch: {
    orderIsPaid(status) {
      if (status === true) {
        window.removeEventListener("beforeunload", this.handleUnload);
      }
    },
  },
  methods: {
    setActive(section) {
      this.active = section;
      this.edit = false;
      document.documentElement.scrollTop = 0;
      document.scrollTop = 0;
    },
    setEdit(section) {
      this.setActive(section);
      this.edit = true;
    },
    closeCart() {
      this.$store.commit(SET_CART_OPEN, false);
    },
    handleUnload(event) {
      event.preventDefault();
      event.returnValue = "";
    },
  },
  name: "App",
};
</script>

<style lang="scss">
$body-size: 24px;

@import "~bulma/sass/utilities/_all";
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@800&family=Rubik:wght@700&family=Source+Sans+Pro:wght@300;400;600;700&family=Inter&display=swap");

$primary: #dd3333;
$primary-invert: findColorInvert($primary);
$warning: #f9d400;
$warning-invert: findColorInvert($warning);
$black: #000000;
$black-invert: findColorInvert($black);

$colors: (
  "primary": (
    $primary,
    $primary-invert,
  ),
  "counter-button": (
    $warning,
    $warning-invert,
  ),
  "warning": (
    $warning,
    $warning-invert,
  ),
  "info": (
    $info,
    $info-invert,
  ),
  "success": (
    $success,
    $success-invert,
  ),
  "danger": (
    $danger,
    $danger-invert,
  ),
  "black": (
    $black,
    $black-invert,
  ),
  "light": (
    $light,
    $light-invert,
  ),
  "dark": (
    $dark,
    $dark-invert,
  ),
);

$steps-active-color: $warning;
$steps-previous-color: $warning;
$radio-active-background-color: $warning;
$navbar-breakpoint: 0;

@import "~bulma";
@import "~buefy/src/scss/buefy";

html {
  height: -webkit-fill-available;
}

body {
  min-height: 100vh;
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
  font-family: "Source Sans Pro", sans-serif;
}

#app {
  // font-family: "Source Sans Pro", sans-serif;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* GLOBAL TYPOGRAPHY */
.page-title {
  font-family: "Rubik", sans-serif;
  width: 100%;
  max-width: 500px;
  font-size: 27px;
  margin-bottom: 12px;
  text-align: center;
  letter-spacing: -0.025rem;
  color: black;
}

.card-title {
  display: block;
  // margin-bottom: -35px;
  font-family: "Nunito";
  font-weight: 700;
  line-height: 1rem;
  font-size: 20px;
  letter-spacing: -0.025rem;
  color: black;
}

.card-subtitle {
  display: block;
  font-family: "Nunito";
  line-height: 0.7rem;
  font-weight: 700;
  font-size: 14px;
  margin-top: 5px;
  color: black;
}

.card-description {
  display: block;
  font-family: "Inter";
  // font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.01rem;
  // line-height: 0.7rem;
  margin-top: 10px;
  margin-bottom: 10px;
  color: black;
}

.card-price {
  margin-bottom: 5px;
  font-family: "Nunito";
  line-height: 0.7rem;
  font-weight: 700;
  font-size: 20px;
  color: black;
}

.body-text {
  display: block;
  font-family: "Inter";
  // font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.01rem;
  // line-height: 0.7rem;
  margin-top: 10px;
  margin-bottom: 10px;
  color: black;
}

/* END TYPOGRAPHY */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-leave,
.fade-leave-active {
  position: absolute;
}

.order-questions {
  font-size: 150%;
}

.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.site-wrapper {
  padding: 30px 0 0 0;
  width: 100%;
}

/******** BULMA OVERRIDES *************/
.b-checkbox.checkbox {
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent !important;
  padding: 20px;
  // outline: none;
  // color: black;
}

.b-checkbox.checkbox.button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  background: transparent !important;
}

// changing icons to black
i {
  color: black !important;
}

// changing text field label font color
label {
  color: black !important;
}

input.input {
  color: black !important;
  border: none !important;
  box-shadow: none !important;
  // font-family: "Helvetica";
  // font-weight: 300;
  letter-spacing: 0.01rem;
}

// changing dialog font color
.media-content {
  color: black;
}

label.b-checkbox.checkbox.button {
  outline: none !important;
  border: none !important;
}

@media screen and (max-width: 500px) {
  .b-checkbox.checkbox.button.is-focused {
    box-shadow: none !important;
  }
}

.control {
  width: auto;
  background: transparent !important;
}

.b-checkbox.checkbox.button.is-text {
  text-decoration: none !important;
}

.media-content {
  overflow: hidden;
}

// number input override
.field.has-numberinput {
  width: 100% !important;
}
div.b-numberinput.field.is-grouped {
  width: 100% !important;
}

.control.is-clearfix {
  margin: 0 !important;
}

button.button.is-counter-button {
  width: 100%;
}

p.control.minus {
  width: calc(100% / 3) !important;
  margin: 0 !important;
}

p.control.plus {
  width: calc(100% / 3) !important;
  margin: 0 !important;
}

// accessibility
.card:focus {
  outline: none;
  box-shadow: 0 0 2px 2px yellow;
}
.box:focus {
  outline: none;
  box-shadow: 0 0 2px 2px yellow;
}

@media (hover: hover) {
  .card:hover {
    outline: none;
    box-shadow: 0 0 2px 2px yellow;
  }
  .box:focus {
    outline: none;
    box-shadow: 0 0 2px 2px yellow;
  }
}

// .button.button:focus {
//   outline: none;
//   box-shadow: 0 0 2px 2px rgb(0, 100, 255) !important;
// }
</style>
