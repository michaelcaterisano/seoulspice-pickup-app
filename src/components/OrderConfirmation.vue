<template>
  <div class="container">
    <div class="page-title">
      <span> {{ title }} </span>
    </div>
    <div class="cart-item-card">
      <OrderTotals v-if="items.length" :type="type" />
      <CartItem
        v-for="(item, index) in items"
        :key="index"
        :items="items"
        :item="item"
        :index="index"
      />
    </div>

    <div v-if="items.length" class="has-text-centered buttons">
      <b-button class="is-warning" @click.prevent="editOrder('entree')">
        <span class="is-size-7">ADD ENTREE</span>
      </b-button>
      <b-button class=" is-warning" @click.prevent="editOrder('addon')">
        <span class="is-size-7">ADD DRINK/DESERT</span>
      </b-button>
      <b-button class="is-success" @click.prevent="confirmItems()">
        <span class="is-size-7">CHECKOUT</span>
      </b-button>
    </div>
    <div v-if="!items.length">
      <span class="body-text">Your cart is empty</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

import CartItem from "./CartItem";
import OrderTotals from "./OrderTotals";
import { SET_CART_OPEN } from "../store/mutations.type";
export default {
  components: {
    CartItem,
    OrderTotals,
  },
  computed: {
    ...mapGetters(["items"]),
    title() {
      return this.type === "page" ? "ORDER CONFIRMATION" : "";
    },
    // showButtons() {
    //   return this.type !== "sidebar";
    // },
  },
  name: "OrderConfirmation",
  methods: {
    ...mapMutations("routes", ["backToEntrees"]),
    editOrder(type) {
      this.$store.commit(SET_CART_OPEN, false);
      this.$emit("edit", type);
      this.backToEntrees();
    },
    confirmItems() {
      this.$store.commit(SET_CART_OPEN, false);
      this.$gtag.event("begin-checkout");
      this.$emit("update", "order-info");
    },
  },
  props: ["type"],
};
</script>

<style scoped>
.container {
  width: 95%;
  max-width: 400px !important;
  margin-top: 12px;
}

.cart-item-card {
  margin: 0 12px 24px 12px;
  flex-basis: calc(100% / 2 - 24px);
  cursor: pointer;
}
.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px !important;
  padding: 0 12px;
}
.button {
  width: 100%;
  margin-right: 0px !important;
}

.page-title {
  text-align: center;
  margin-bottom: 12px;
  font-weight: 700;
}

@media screen and (max-width: 480px) {
  .container {
    width: 85%;
  }
}
</style>
