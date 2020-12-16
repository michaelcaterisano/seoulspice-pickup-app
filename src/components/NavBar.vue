<template>
  <b-navbar :mobile-burger="false">
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
        <b-button @click="openCart" tabindex="0">
          <span class="icon is-small">
            <i class="fas fa-shopping-cart"></i>
          </span>
        </b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { SET_CART_OPEN } from "../store/mutations.type";
export default {
  name: "NavBar",
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
</style>
