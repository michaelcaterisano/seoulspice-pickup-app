<template>
  <section class="container">
    <div class="signature-title is-size-6">
      <span>WOULD YOU LIKE A SIGNATURE COMBO OR TO BUILD YOUR OWN?</span>
    </div>

    <div class="card-container">
      <option-card
        class="combo-card"
        v-for="(combo, index) in combos"
        :key="index"
        :option="combo"
        :isCombo="true"
        @click.native="$emit('combo-selected', combo)"
        @keyup.enter.native="$emit('combo-selected', combo)"
      ></option-card>
    </div>
  </section>
</template>

<script>
import OptionCard from "../components/OptionCard";

export default {
  components: {
    OptionCard,
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
}
.card-container {
  width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.signature-title {
  text-align: center;
  margin-bottom: 12px;
  font-weight: 700;
}

.combo-card {
  margin: 0 12px;
  flex-basis: calc(100% / 3 - 24px);
  cursor: pointer;
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
