<template>
  <div class="component-container">
    <div class="category-title is-size-6"><span>CHOOSE YOUR ENTREE</span></div>
    <div class="card-container">
      <OptionCard
        class="category-card"
        v-for="category in categories"
        :key="category.name"
        :option="category"
        @click.native="setActive(category)"
        @keyup.enter.native="setActive(category)"
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
    setActive(category) {
      let message =
        category.name === "Korean Feast For 2" ||
        category.name === "Korean Feast For 4"
          ? "entree-options"
          : "entree-signatures";

      this.$emit("category-selected", category);
      this.$emit("update", message);
    },
  },
  name: "EntreeCategories",
  props: ["categories"],
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
  width: 600px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.category-title {
  width: 600px;

  text-align: center;
  margin-bottom: 12px;
  font-weight: 700;
}

.category-card {
  margin: 0 12px 24px 12px;
  flex-basis: calc(100% / 2 - 24px);
  cursor: pointer;
}

/* @media screen and (max-width: 900px) and (min-width: 600px) {
  .category-card {
    flex-basis: calc(100% / 2 - 24px);
  }
} */

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
