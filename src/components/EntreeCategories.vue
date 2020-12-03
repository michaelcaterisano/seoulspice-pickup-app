<template>
  <section>
    <div class="category-title is-size-5"><span>CHOOSE YOUR ENTREE</span></div>
    <div class="card-container">
      <entree-category-card
        class="category-card"
        v-for="(category, index) in categories"
        :key="index"
        :category="category"
        @click.native="$emit('category-selected', category)"
      ></entree-category-card>
    </div>
  </section>
</template>

<script>
import EntreeCategoryCard from "../components/EntreeCategoryCard";

export default {
  components: {
    EntreeCategoryCard,
  },
  name: "EntreeCategories",
  props: ["categories"],
};
</script>

<style scoped>
.card-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.category-title {
  text-align: center;
  margin-bottom: 12px;
}

.category-card {
  margin: 0 12px;
  flex-basis: calc(100% / 3 - 24px);
  cursor: pointer;
}

.category-card:hover {
  box-shadow: 0 0 1px 2px rgb(249, 212, 0);
}

@media screen and (max-width: 900px) and (min-width: 600px) {
  .category-card {
    flex-basis: calc(100% / 2 - 24px);
  }
}

@media screen and (max-width: 599px) {
  .card-container {
    margin: 0;
    width: 100%;
  }
  .category-card {
    flex-basis: calc(100%);
  }
}
</style>
