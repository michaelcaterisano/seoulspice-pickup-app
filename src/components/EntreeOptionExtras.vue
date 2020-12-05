<template>
  <section>
    <div class="container">
      <div class="component-title is-size-5"><span>EXTRAS</span></div>
      <div class="card-container">
        <option-counter-card
          v-for="(choice, index) in extras.choices"
          :choice="choice"
          :key="index"
          class="component-card"
        ></option-counter-card>
      </div>
      <div class="buttons">
        <b-button
          type="is-success"
          class="add-to-cart-button"
          @click.prevent="$emit('add-item')"
        >
          <!-- <span>Add to Cart ({{ price | currency }})</span> -->
          <span>Add to Cart </span>
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>
import OptionCounterCard from "./OptionCounterCard";

export default {
  components: {
    OptionCounterCard,
  },
  name: "EntreeOptionExtras",
  props: ["extras"],
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.component-title {
  text-align: center;
  margin-bottom: 12px;
  font-weight: 700;
}

.component-card {
  margin: 0 12px;
  flex-basis: calc(100% / 3 - 24px);
  cursor: pointer;
}

@media screen and (max-width: 900px) and (min-width: 600px) {
  .component-card {
    flex-basis: calc(100% / 2 - 24px);
  }
}

@media screen and (max-width: 599px) {
  .component-card {
    flex-basis: calc(100%);
    max-width: 350px;
  }
}
</style>
