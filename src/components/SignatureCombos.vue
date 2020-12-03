<template>
  <div class="container">
    <span class="title is-size-5"
      >WOULD YOU LIKE A SIGNATURE COMBO OR TO BUILD YOUR OWN?</span
    >
    <div class="card-container">
      <signature-combo-card
        class="combo-card"
        v-for="(combo, index) in combos"
        :key="index"
        :combo="combo"
        @click.native="$emit('combo-selected', combo)"
      ></signature-combo-card>
    </div>
  </div>
</template>

<script>
import SignatureComboCard from "../components/SignatureComboCard";

export default {
  components: {
    SignatureComboCard,
  },
  name: "SignatureCombos",
  props: ["combos"],
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card-container {
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.title {
  margin-bottom: 24px;
}

.combo-card {
  margin: 0 12px;
  flex-basis: calc(100% / 3 - 24px);
  cursor: pointer;
}

.combo-card:hover {
  box-shadow: 0 0 1px 2px rgb(249, 212, 0);
}

@media screen and (max-width: 900px) and (min-width: 600px) {
  .combo-card {
    flex-basis: calc(100% / 2 - 24px);
  }
}

@media screen and (max-width: 599px) {
  .card-container {
    width: 100%;
  }
  .combo-card {
    flex-basis: calc(100% - 24px);
  }
}
</style>
