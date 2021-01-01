<template>
  <b-navbar :mobile-burger="false" fixed-top shadow>
    <template slot="brand">
      <b-navbar-item>
        <img
          src="https://www.seoulspice.com/wp-content/uploads/2017/05/logo1-1.png"
          alt="seoulspice restaurant logo"
        />
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item>
        <b-button @click="openCart" class="cart-button">
          <span class="icon is-small">
            <i class="fas fa-shopping-cart"></i>
          </span>
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
  },
  methods: {
    openCart() {
      this.$store.commit(SET_CART_OPEN, true);
    },
  },
};
</script>

<style scoped>
.button {
  border-color: transparent !important;
}
.navbar-item {
  background-color: transparent !important;
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
  left: 30px;
  top: 10px;

  color: white;
  font-size: 11px;
}
</style>
