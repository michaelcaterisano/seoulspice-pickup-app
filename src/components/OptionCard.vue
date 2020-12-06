<template>
  <div ref="card" class="card" tabindex="0">
    <div class="card-image">
      <figure class="image is-3x2">
        <img v-bind:src="option.imageUrl" alt="image of entree" />
      </figure>
    </div>
    <div class="card-content is-size-7">
      <div>
        <span class="option-name">{{ option.name.toUpperCase() }}</span
        ><br />

        <span class="option-description">{{
          option.description.toLowerCase()
        }}</span
        ><br />
      </div>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">
        <span
          ><strong>{{ price }}</strong></span
        >
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    price() {
      return this.option.price > 0
        ? this.isCombo
          ? "+$" + this.option.price
          : "$" + this.option.price
        : "";
    },
  },
  mounted() {
    this.$refs.card.blur();
  },
  method: {},
  name: "OptionCard",
  props: ["option", "isCombo"],
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-bottom: 24px !important;
  overflow: hidden;
}

.card-content {
  padding: 20px 20px 0 20px !important;
  flex-grow: 1;
}
.card .option-name {
  font-weight: 700;
}
.option-description {
  font-weight: 400;
}
.card-footer {
  bottom: 0;
  border-top: none !important;
}
.card-footer-item {
  padding: 0 20px 20px 20px !important;
  justify-content: flex-start !important;
}
</style>
