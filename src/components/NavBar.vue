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
      <b-navbar-item tabindex="0">
        <button class="button" @click="toggleCartOpen">
          <span class="icon is-small">
            <i class="fas fa-shopping-cart"></i>
          </span>
        </button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    toggleCartOpen() {
      this.$emit("toggle-cart-open");
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
