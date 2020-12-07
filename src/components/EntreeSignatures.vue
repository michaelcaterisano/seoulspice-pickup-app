<template>
  <div class="container">
    <div class="signature-title is-size-6">
      <span>WOULD YOU LIKE A SIGNATURE COMBO OR TO BUILD YOUR OWN?</span>
    </div>

    <div class="card-container">
      <OptionCard
        class="signature-card"
        v-for="(signature, index) in signatures"
        :key="index"
        :option="signature"
        :isCombo="true"
        @click.native="setActive"
        @keyup.enter.native="setActive"
      />
    </div>
  </div>
</template>

<script>
import OptionCard from "../components/OptionCard";

export default {
  components: {
    OptionCard,
  },
  methods: {
    setActive(signature) {
      this.$emit("signature-selected", signature);
      this.$emit("update", "entree-options");
    },
  },
  name: "EntreeSignatures",
  props: ["signatures"],
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
  width: 100%;
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

.signature-card {
  margin: 0 12px 24px 12px;
  flex-basis: calc(100% / 3 - 24px);
  cursor: pointer;
}

@media screen and (max-width: 900px) and (min-width: 600px) {
  .signature-card {
    flex-basis: calc(100% / 2 - 24px);
  }
}

@media screen and (max-width: 599px) {
  .card-container {
    width: 85%;
  }
  .signature-card {
    margin: 0 0 24px 0;
    flex-basis: 100%;
  }
}
</style>
