<template>
  <div class="component-container">
    <div class="page-title">
      <span>{{ title.toUpperCase() }}</span>
    </div>
    <div class="box">
      <p>Promotion: One Free Egg</p>
      <b-button type="is-success is-small">ADD</b-button>
    </div>
    <div class="card-container">
      <OptionCounterCard
        class="extras-card"
        v-for="(choice, index) in items.choices"
        :option="choice"
        :key="index"
        tabindex="0"
      ></OptionCounterCard>
    </div>
    <b-button class="next-button" type="is-success" @click.prevent="next">
      <!-- <span>Add to Cart ({{ price | currency }})</span> -->
      <span>NEXT</span>
    </b-button>
  </div>
</template>

<script>
import OptionCounterCard from "./OptionCounterCard";

export default {
  components: {
    OptionCounterCard,
  },
  methods: {
    next() {
      if (this.title === "additional items") {
        this.$emit("next");
      } else {
        this.$emit("add-item");
      }
    },
  },
  name: "EntreeOptionsExtras",
  props: ["items", "title"],
};
</script>

<style scoped>
.component-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.card-container {
  max-width: 600px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.next-button {
  margin-bottom: 30px;
}

.extras-card {
  margin: 0 12px 24px 12px;
  flex-basis: calc(100% / 2 - 24px);
  cursor: pointer;
}

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
.free-egg-button {
  margin-top: 24px;
}

/* @media screen and (max-width: 900px) and (min-width: 600px) {
  .component-card {
    flex-basis: calc(100% / 2 - 24px);
  }
} */

@media screen and (max-width: 480px) {
  .card-container {
    width: 75%;
  }
  .extras-card {
    margin: 0 0 24px 0;
    flex-basis: 100%;
  }
}
</style>
