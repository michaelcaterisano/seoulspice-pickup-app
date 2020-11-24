<template>
  <div>
    <transition-group name="fade" mode="out-in">
      <entree-option-checkbox-group
        v-for="step in steps"
        :group="options.getOption(step)"
        v-show="active === step"
        :key="step"
      ></entree-option-checkbox-group>
    </transition-group>
    <div class="has-text-centered buttons">
      <a
        class="button is-info"
        @click.prevent="setActiveOrderStep()"
        v-if="active !== 'extras'"
        ><span>Next </span
        ><span class="icon"> <i class="fas fa-arrow-right"></i> </span
      ></a>
      <a
        class="button is-success"
        @click.prevent="addItem()"
        v-if="active === 'extras'"
        ><span>Add to Cart ({{ price | currency }})</span></a
      >
    </div>
  </div>
</template>

<script>
import EntreeOptionCheckboxGroup from "./EntreeOptionCheckboxGroup";
import { mapGetters } from "vuex";


export default {
  components: {
    EntreeOptionCheckboxGroup
  },
  computed: {
    ...mapGetters(["items"]),
  },
  data() {
    return {
      selected: null,
      active: "bases",
      steps: [
        "bases",
        "proteins",
        "extraProteins",
        "veggies",
        "sauces",
        "toppings",
        "extras"
      ],
      comboSteps: [
        "bases",
        "extras",
      ]
    };
  },
  methods: {
    addItem() {
      this.$emit("valid");
    },
    advanceStep() {
      if (this.combo.name === "Build Your Own") {
        this.active = this.steps[
          this.steps.findIndex(step => step === this.active) + 1
        ];
      } else {
        this.active = this.comboSteps[
          this.comboSteps.findIndex(step => step === this.active) + 1
        ];
      }
    },
    checkMinSelected(option) {
      return option.choices.some(choice => choice.selected);
    },
    setActiveOrderStep() {
      const option = this.options.getOption(this.active);

      if (option.type === "extraProteins" || this.checkMinSelected(option)) {
        this.advanceStep();
      } 
      else {
        this.$buefy.dialog.confirm({
          message:
            "Are you sure you want to continue without selecting any options?",
          onConfirm: () => this.advanceStep(),
          confirmText: "Yes",
          cancelText: "No"
        });
      }


    }
  },
  name: "OrderDetailsOptions",
  props: ["options", "price", "category", "combo"]
};
</script>

<style scoped></style>
