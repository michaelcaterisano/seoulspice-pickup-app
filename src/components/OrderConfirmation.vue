<template>
  <div class="container">
    <CartItem
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :index="index"
    />
    <div class="has-text-centered buttons">
      <a class="button is-danger" @click.prevent="editOrder('entree')">
        <span>Add Entree</span>
      </a>
      <a class="button is-danger" @click.prevent="editOrder('addon')">
        <span>Add Drink/Dessert</span>
      </a>
      <a class="button is-success" @click.prevent="confirmItems()">
        <span>Continue</span>
        <span class="icon"><i class="fas fa-arrow-right"></i></span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartItem from "./CartItem";
export default {
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters(["items"]),
  },
  name: "OrderConfirmation",
  methods: {
    editOrder(type) {
      this.$emit("edit", type);
    },
    confirmItems() {
      this.$gtag.event("begin-checkout");
      this.$emit("update", "order-info");
    },
  },
};
</script>

<style scoped>
.container {
  width: 500px;
}
.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.button {
  width: 100%;
  margin: 0;
}

@media screen and (max-width: 599px) {
  .container {
    width: 85%;
  }
}
</style>
