<template>
  <div class="component-container">
    <div class="component-title page-title">
      <span>{{ group.type.toUpperCase() }}</span>
    </div>
    <div class="card-container">
      <OptionCounterCard
        class="component-card"
        v-for="(choice, index) in group.choices"
        :option="choice"
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
  props: ["name", "group"],
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
  width: 600px;

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
  flex-basis: calc(100% / 2 - 24px);
}
/* 
@media screen and (max-width: 900px) and (min-width: 600px) {
  .component-card {
    flex-basis: calc(100% / 2 - 24px);
  }
} */

@media screen and (max-width: 480px) {
  .card-container {
    width: 75%;
  }
  .component-card {
    flex-basis: 100%;
  }
}
</style>
