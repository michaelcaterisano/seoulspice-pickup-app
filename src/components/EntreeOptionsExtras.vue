<template>
  <div class="component-container">
    <div class="page-title">
      <span>{{ title.toUpperCase() }}</span>
    </div>
    <!-- <div v-if="title === 'extras'" class="box free-egg-promotion">
      <p>Promotion: One Free Egg</p>
      <b-button
        type="is-success is-small free-egg-button"
        :disabled="freeEggAdded"
        @click="addFreeEgg"
        >{{ freeEggButtonText }}</b-button
      >
    </div> -->
    <div class="card-container">
      <OptionCounterCard
        class="extras-card"
        v-for="(choice, index) in getChoices()"
        :option="choice"
        :key="index"
        tabindex="0"
      ></OptionCounterCard>
    </div>
    <div class="navigation-buttons">
      <b-button type="is-danger" @click="cancel">
        CANCEL
      </b-button>
      <b-button
        type="is-success"
        @click.prevent="next"
        data-cy="extras-next-button"
      >
        NEXT
      </b-button>
    </div>
  </div>
</template>

<script>
import OptionCounterCard from "./OptionCounterCard";
import { mapMutations } from "vuex";

export default {
  components: {
    OptionCounterCard,
  },
  computed: {
    freeEggButtonText() {
      return this.freeEggAdded ? "ADDED" : "ADD";
    },
  },
  data() {
    return {
      freeEggAdded: false,
    };
  },
  methods: {
    ...mapMutations("routes", ["backToEntrees"]),
    next() {
      if (this.title === "additional items") {
        this.$emit("next");
      } else {
        this.$emit("add-item");
      }
    },
    addFreeEgg() {
      const freeEgg = this.option.choices.find(
        choice => choice.description === "Free egg",
      );
      freeEgg.selected = true;
      freeEgg.qty = 1;
      this.freeEggAdded = true;
    },
    getChoices() {
      return this.option.choices.filter(
        choice => choice.description !== "Free egg",
      );
    },
    cancel() {
      this.backToEntrees();
      this.$emit("cancel");
    },
  },
  name: "EntreeOptionsExtras",
  props: ["option", "promotions", "title"],
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
  max-width: 600px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.next-button {
  margin-bottom: 30px;
}

.extras-card {
  margin: 0 12px 24px 12px;
  flex-basis: calc(100% / 2 - 24px);
  cursor: pointer;
}

.buttons {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 1px 0;
  background: white;
  position: fixed;
  bottom: 0;
}
.free-egg-button {
  margin-top: 12px;
}
.free-egg-promotion {
  text-align: center;
}

.navigation-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  margin-bottom: 30px;
}

@media screen and (max-width: 480px) {
  .card-container {
    width: 75%;
  }
  .extras-card {
    margin: 0 0 24px 0;
    flex-basis: 100%;
  }
}
</style>
