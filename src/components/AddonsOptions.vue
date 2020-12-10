<template>
  <div class="container">
    <div class="component-title is-size-6">
      <span>{{ group.type.toUpperCase() }}</span>
    </div>
    <div class="card-container">
      <OptionCounterCard
        class="component-card"
        v-for="(choice, index) in group.choices"
        :option="choice"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import OptionCounterCard from "./OptionCounterCard";

export default {
  components: {
    OptionCounterCard,
  },
  name: "AddonsOptions",
  props: ["name", "group"],
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  max-width: 900px !important;
  flex-direction: column;
  align-items: center;
}
.card-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 100px;
}

.component-title {
  text-align: center;
  margin-bottom: 12px;
  font-weight: 700;
}

.component-card {
  margin: 0 12px;
  cursor: pointer;
  flex-basis: calc(100% / 3 - 24px);
}

@media screen and (max-width: 900px) and (min-width: 600px) {
  .component-card {
    flex-basis: calc(100% / 2 - 24px);
  }
}

@media screen and (max-width: 599px) {
  .card-container {
    width: 85%;
  }
  .component-card {
    flex-basis: 100%;
  }
}
</style>
