<template>
  <div class="container">
    <transition-group name="fade" mode="out-in">
      <entree-option-checkbox-group
        v-for="step in optionSteps"
        :group="options.getOption(step)"
        :price="price"
        v-show="active === step"
        :key="step"
        :category="category"
        :combo="combo"
        @next="setActiveOrderStep()"
        @add-item="addItem()"
      ></entree-option-checkbox-group>
      <entree-option-extras
        v-show="active === 'extras'"
        :key="'extras'"
        :extras="options.getOption('extras')"
        @add-item="addItem()"
      ></entree-option-extras>
    </transition-group>
  </div>
</template>

<script>
import EntreeOptionCheckboxGroup from "./EntreeOptionCheckboxGroup";
import EntreeOptionExtras from "./EntreeOptionExtras";
import { mapGetters } from "vuex";

export default {
  components: {
    EntreeOptionCheckboxGroup,
    EntreeOptionExtras,
  },
  computed: {
    optionSteps() {
      return this.steps.filter((step) => step !== "extras");
    },
    ...mapGetters(["items"]),
  },
  data() {
    return {
      active: this.riceOnly() ? "rices" : "bases",
      steps: this.riceOnly()
        ? this.isKoreanFeast()
          ? ["rices", "proteins", "veggies", "korean feast toppings", "extras"]
          : [
              "rices",
              "proteins",
              "extraProteins",
              "veggies",
              "sauces",
              "toppings",
              "extras",
            ]
        : [
            "bases",
            "proteins",
            "extraProteins",
            "veggies",
            "sauces",
            "toppings",
            "extras",
          ],
      comboSteps: ["bases", "extraProteins", "extras"],
      korritoComboSteps: ["rices", "extras"],
    };
  },
  methods: {
    addItem() {
      this.$emit("valid");
    },
    advanceStep() {
      window.scrollTo(0, 0);
      if (this.combo) {
        if (this.combo.name === "Build Your Own") {
          this.active = this.steps[
            this.steps.findIndex((step) => step === this.active) + 1
          ];
        } else {
          if (this.isKorrito()) {
            this.active = this.korritoComboSteps[
              this.korritoComboSteps.findIndex((step) => step === this.active) +
                1
            ];
          } else {
            this.active = this.comboSteps[
              this.comboSteps.findIndex((step) => step === this.active) + 1
            ];
          }
        }
      } else {
        this.active = this.steps[
          this.steps.findIndex((step) => step === this.active) + 1
        ];
      }
    },
    checkMinSelected(option) {
      if (option.type === "extraProteins") {
        return true;
      }
      return option.choices.some((choice) => choice.selected);
    },
    setActiveOrderStep() {
      const option = this.options.getOption(this.active);
      if (
        this.checkMinSelected(option) &&
        (this.category.name === "Korrito" || option.type !== "sauces")
      ) {
        this.advanceStep();
      }

      if (
        !this.checkMinSelected(option) &&
        (option.type === "bases" || option.type === "rices")
      ) {
        this.$buefy.dialog.confirm({
          message: "Please select a base",
          confirmText: "Ok",
        });
      }

      // build your own -> choose your base is not optional fix
      if (
        !this.checkMinSelected(option) &&
        option.type !== "bases" &&
        option.type !== "rices"
      ) {
        this.$buefy.dialog.confirm({
          message:
            "Are you sure you want to continue without selecting any options?",
          onConfirm: () => this.advanceStep(),
          confirmText: "Yes",
          cancelText: "No",
        });
      }
      if (
        option.type === "sauces" &&
        this.category.name !== "Korrito" &&
        this.checkMinSelected(option)
      ) {
        this.$buefy.dialog.confirm({
          message: "Do you want your sauce on the side?",
          onConfirm: () => {
            this.$emit("note", "Sauce on the side");
            this.advanceStep();
          },
          onCancel: () => {
            // record sauce "on it"
            this.advanceStep();
          },
          confirmText: "Yes",
          cancelText: "No",
        });
      }
    },
    riceOnly() {
      return (
        this.category.name === "Korean Feast For 2" ||
        this.category.name === "Korean Feast For 4" ||
        this.category.name === "Korrito"
      );
    },
    isKoreanFeast() {
      return (
        this.category.name === "Korean Feast For 2" ||
        this.category.name === "Korean Feast For 4"
      );
    },
    isKorrito() {
      return this.category.name === "Korrito";
    },
  },
  name: "OrderDetailsOptions",
  props: ["options", "price", "category", "combo"],
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.add-to-cart-button {
  margin-top: 12px;
}
</style>
