<template>
  <b-navbar :mobile-burger="false" fixed-top shadow>
    <template slot="brand">
      <b-navbar-item>
        <div class="logo">
          <img src="../assets/logo.png" alt="seoulspice restaurant logo" />
          <span v-if="showNodeEnv" class="env-message">
            NODE_ENV=DEVELOPMENT
          </span>
        </div>
      </b-navbar-item>
    </template>
    <template slot="end" v-if="showCart">
      <b-navbar-item>
        <b-button
          @click="openCart"
          icon-left="fas fa-shopping-cart"
          class="cart-icon"
        >
          <span class="cart-count">{{ cartCount }}</span>
        </b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_CART_OPEN } from "../store/mutations.type";
export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["items"]),
    cartCount() {
      return this.items.reduce((acc, item) => {
        acc += item.qty;
        return acc;
      }, 0);
    },
    showCart() {
      return (
        this.active !== "confirmation" &&
        this.active !== "order-info" &&
        this.active !== "payment" &&
        this.active !== "summary"
      );
    },
    showNodeEnv() {
      return process.env.NODE_ENV !== "production";
    },
    nodeEnv() {
      return process.env.NODE_ENV;
    },
  },
  methods: {
    openCart() {
      this.$store.commit(SET_CART_OPEN, true);
    },
  },
  props: ["active"],
};
</script>

<style scoped>
.button {
  border-color: transparent !important;
}
.button.button {
  padding: 10px;
}
.navbar-item {
  background-color: transparent !important;
}
.cart-icon {
  color: black;
}
.cart-count {
  background-color: red;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 19px;
  height: 19px;
  border-radius: 19px;
  position: absolute;
  /* left: 30px;
  top: 10px; */
  left: 20px;
  top: 10px;
  color: white;
  font-size: 11px;
}
.logo {
  display: flex;
  flex-direction: column;
}
.env-message {
  font-size: 10px;
  color: red;
}
</style>
