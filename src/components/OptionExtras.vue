<template>
  <div class="container">
    <div class="component-title is-size-6"><span>EXTRAS</span></div>
    <div class="card-container">
      <OptionCounterCard
        class="component-card"
        v-for="(choice, index) in extras.choices"
        :option="choice"
        :key="index"
      ></OptionCounterCard>
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
</template>

<script>
import OptionCounterCard from "./OptionCounterCard";

export default {
  components: {
    OptionCounterCard,
  },
  name: "OptionExtras",
  props: ["extras"],
};
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 1px 0;
  background: white;
  position: fixed;
  bottom: 0;
}
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
  margin-bottom: 100px;
}

.component-title {
  text-align: center;
  margin-bottom: 12px;
  font-weight: 700;
}

.component-card {
  margin: 0 12px 24px 12px;
  cursor: pointer;
  flex-basis: calc(100% / 3 - 24px);
}

@media screen and (max-width: 900px) and (min-width: 600px) {
  .component-card {
    flex-basis: calc(100% / 2 - 24px);
  }
}

@media screen and (max-width: 599px) {
  .card-container {
    width: 85%;
  }
  .component-card {
    margin: 0 0 24px 0;
    flex-basis: 100%;
  }
}
</style>
