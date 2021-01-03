<template>
  <div class="component-container">
    <div class="page-title is-size-6">
      <span>WOULD YOU LIKE A SIGNATURE COMBO OR TO BUILD YOUR OWN?</span>
    </div>

    <div class="card-container">
      <OptionCard
        class="signature-card"
        v-for="(signature, index) in signatures"
        :key="index"
        :option="signature"
        :isSignature="true"
        @click.native="setActive(signature)"
        @keyup.enter.native="setActive(signature)"
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
.component-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.card-container {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.signature-card {
  margin: 0 12px 24px 12px;
  flex-basis: calc(100% / 2 - 24px);
  cursor: pointer;
}

@media screen and (max-width: 480px) {
  .card-container {
    width: 75%;
  }
  .signature-card {
    margin: 0 0 24px 0;
    flex-basis: 100%;
  }
}
</style>
