<template>
  <div class="component-container">
    <div class="page-title category-title">
      <span>CHOOSE YOUR ENTREE</span>
    </div>
    <div class="card-container">
      <OptionCard
        class="category-card"
        v-for="category in availableCategories"
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
  computed: {
    availableCategories() {
      const day = new Date().getDay();
      return day === 0
        ? this.categories
        : this.categories.filter(
            category => category.name !== "$6 Signature Sundays",
          );
    },
  },
  methods: {
    setActive(category) {
      let message;
      if (
        category.name === "Korean Feast For 2" ||
        category.name === "Korean Feast For 4" ||
        category.name === "Kid's Bowl"
      ) {
        message = "entree-options";
      } else if (category.name === "Korean BBQ") {
        message = "entree-kbbq";
      } else {
        message = "entree-signatures";
      }

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
  max-width: 600px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
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
