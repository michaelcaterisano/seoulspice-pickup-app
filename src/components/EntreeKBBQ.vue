<template>
  <div class="component-container">
    <h1 class="page-title category-title">KOREAN BBQ AT HOME</h1>
    <h5 class="body-text category-description">
      <strong
        >Each KBBQ KIT includes 3 pounds of protein, sushi-grade white rice,
        kimchi, pickled radish, kale slaw, bean sprouts, cloves of garlic, and
        an assortment of our signature sauces. Feeds 4+.</strong
      >
    </h5>
    <div class="card-container">
      <OptionCard
        class="category-card"
        v-for="(type, index) in types"
        :hideImage="true"
        :key="index"
        :option="type"
        @click.native="setActive(type)"
        @keyup.enter.native="setActive(type)"
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
    setActive(type) {
      this.$emit("signature-selected", type);
      this.$emit("update", "entree-options");
    },
  },
  name: "EntreeKBBQ",
  props: ["types"],
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
.category-description {
  margin-top: -10px;
  margin-bottom: 24px;
  max-width: 300px;
  text-align: center;
  font-size: 12px;
}

.category-card {
  margin: 0 12px 24px 12px;
  flex-basis: calc(100% / 2 - 24px);
  cursor: pointer;
}

@media screen and (max-width: 480px) {
  .card-container {
    width: 75%;
  }
  .category-card {
    margin: 0 0 24px 0;
    flex-basis: 100%;
  }
}
</style>
