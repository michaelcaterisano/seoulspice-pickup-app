<template>
  <section>
    <b-sidebar
      type="is-light"
      :fullheight="true"
      :fullwidth="false"
      :overlay="true"
      :right="true"
      :open="isOpen"
      @close="close"
    >
      <OrderConfirmation @edit="edit" @update="update" type="cart" />
    </b-sidebar>
  </section>
</template>

<script>
import OrderConfirmation from "./OrderConfirmation";

export default {
  name: "CartSideBar",
  props: ["isOpen"],
  components: {
    OrderConfirmation,
  },
  methods: {
    edit(val) {
      this.$emit("edit", val);
    },
    update(val) {
      this.$emit("update", val);
    },
    close() {
      this.$emit("close-cart");
    },
  },
};
</script>

<style></style>
