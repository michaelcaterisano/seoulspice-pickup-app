<template>
  <div class="component-container">
    <div class="component-title page-title">
      <span>{{ title.toUpperCase() }}</span>
    </div>
    <div class="card-container">
      <OptionCounterCard
        class="component-card"
        v-for="(option, index) in group"
        :option="option"
        :key="index"
        tabindex="0"
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
  mounted() {
    // resets tab focus to top of page
    document.body.setAttribute("tabindex", "-1");
    document.body.focus();
    document.body.removeAttribute("tabindex");
  },
  name: "AddonsOptions",
  props: ["name", "group", "title"],
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.component-title {
  text-align: center;
  margin-bottom: 12px;
  font-weight: 700;
}

.component-card {
  margin: 0 12px;
  cursor: pointer;
  flex-basis: calc(100% / 2 - 24px);
}

@media screen and (max-width: 480px) {
  .component-card {
    flex-basis: 100%;
  }
}
</style>
