<template>
  <div id="app">
    <!-- <OrderTotals></OrderTotals> -->
    <NavBar @toggle-cart-open="toggleCartOpen" />
    <CartSideBar :open="cartOpen" />
    <section class="site-wrapper">
      <transition name="fade">
        <OrderLocation v-if="active === 'location'" @update="setActive" />
        <OrderEntrees v-if="active === 'entree'" @update="setActive" />
        <OrderAddons v-if="active === 'addon'" @update="setActive" />
        <OrderConfirmation
          v-if="active === 'confirmation'"
          @update="setActive"
          @edit="setEdit"
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
  data() {
    return {
      active: "location", // current active module
      edit: false,
      cartOpen: false,
    };
  },
  methods: {
    setActive(section) {
      if (this.edit) {
        this.active = "confirmation";
      } else {
        this.active = section;
      }
      this.edit = false;
      document.documentElement.scrollTop = 0;
      document.scrollTop = 0;
    },
    setEdit(section) {
      this.setActive(section);
      this.edit = true;
    },
    toggleCartOpen() {
      this.cartOpen = !this.cartOpen;
    },
  },
  name: "App",
};
</script>

<style lang="scss">
$body-size: 24px;

@import "~bulma/sass/utilities/_all";
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap");
$primary: #dd3333;
$primary-invert: findColorInvert($primary);
$warning: #f9d400;
$warning-invert: findColorInvert($warning);
$black: #0a0000;
$black-invert: findColorInvert($black);

$colors: (
  "primary": (
    $primary,
    $primary-invert,
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

html,
body {
  font-family: "Source Sans Pro", sans-serif;
  letter-spacing: 0.1rem;
}

// input:focus {
//   color: yellow !important;
// }

#app {
  font-family: "Source Sans Pro", sans-serif;
}

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
  padding: 100px 0 0 0;
}

/******** BULMA OVERRIDES *************/
.b-checkbox.checkbox {
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent !important;
  outline: none;
  color: black;
}

.b-checkbox.checkbox.button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  background: transparent !important;
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

.is-text {
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
input.input {
  border: none !important;
  box-shadow: none !important;
}

.control.is-clearfix {
  margin: 0 !important;
}

button.button.is-warning {
  width: 100%;
  border-radius: 0px !important;
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

@media (hover: hover) {
  .card:hover {
    outline: none;
    box-shadow: 0 0 2px 2px yellow;
  }
}

.button.button:focus {
  // outline: none;
  // box-shadow: 0 0 2px 2px rgb(0, 100, 255) !important;
}
</style>
