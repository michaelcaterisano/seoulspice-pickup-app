<template>
  <section class="container">
    <div class="category-title is-size-6"><span>CHOOSE YOUR ENTREE</span></div>
    <div class="card-container">
      <option-card
        class="category-card"
        v-for="(category, index) in categories"
        :key="index"
        :option="category"
        @click.native="$emit('category-selected', category)"
        @keyup.enter.native="$emit('category-selected', category)"
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
  name: "EntreeCategories",
  props: ["categories"],
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
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

.category-title {
  text-align: center;
  margin-bottom: 12px;
  font-weight: 700;
}

.category-card {
  margin: 0 12px;
  flex-basis: calc(100% / 2 - 24px);
  cursor: pointer;
}

@media screen and (max-width: 900px) and (min-width: 600px) {
  .category-card {
    flex-basis: calc(100% / 2 - 24px);
  }
}

@media screen and (max-width: 599px) {
  .card-container {
    width: 100%;
  }
  .category-card {
    flex-basis: calc(100%);
  }
}
</style>
