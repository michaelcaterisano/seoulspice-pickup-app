<template>
  <div class="container">
    <transition-group name="fade" mode="out-in">
      <OptionCheckboxGroup
        v-for="step in optionSteps"
        :group="options.getOption(step)"
        :price="price"
        v-show="active === step"
        :key="step"
        :category="category"
        :signature="signature"
        @next="setActiveOrderStep()"
        @add-item="addItem()"
      ></OptionCheckboxGroup>

      <OptionExtras
        v-show="active === 'extras'"
        :key="'extras'"
        :extras="options.getOption('extras')"
        @add-item="addItem()"
      ></OptionExtras>
    </transition-group>
  </div>
</template>

<script>
import OptionCheckboxGroup from "./OptionCheckboxGroup";
import OptionExtras from "./OptionExtras";
import { mapGetters } from "vuex";

export default {
  components: {
    OptionCheckboxGroup,
    OptionExtras,
  },
  computed: {
    optionSteps() {
      console.log(this.steps);
      return this.steps.filter((step) => step !== "extras");
    },
    ...mapGetters(["items"]),
  },
  data() {
    return {
      active: this.isRiceOnly() ? "rices" : "bases",
      steps: this.getSteps(),
    };
  },
  methods: {
    addItem() {
      this.$emit("valid");
    },
    advanceStep() {
      window.scrollTo(0, 0);
      this.active = this.steps[
        this.steps.findIndex((step) => step === this.active) + 1
      ];
    },
    checkMinSelected(option) {
      if (option.type === "extraProteins") {
        return true;
      }
      return option.choices.some((choice) => choice.selected);
    },
    setActiveOrderStep() {
      const option = this.options.getOption(this.active);
      if (this.hasSauceDialog(option)) {
        this.showSauceDialog();
      }
      if (this.hasBasesDialog(option)) {
        this.showBasesDialog();
      }
      if (this.hasNoneSelectedDialog(option)) {
        this.showNoneSelectedDialog();
      }
      this.advanceStep();
    },
    getSteps() {
      let steps;
      if (this.isRiceOnly()) {
        if (this.isKoreanFeast()) {
          steps = [
            "rices",
            "proteins",
            "veggies",
            "korean feast toppings",
            "extras",
          ];
        }
        if (this.isKorrito()) {
          if (this.isSignature()) {
            steps = ["rices", "extraProteins", "extras"];
          }
          if (this.isBuildYourOwn()) {
            steps = [
              "rices",
              "proteins",
              "extraProteins",
              "veggies",
              "sauces",
              "toppings",
              "extras",
            ];
          }
        }
      } else {
        if (this.isBowl()) {
          if (this.isSignature()) {
            steps = ["bases", "extraProteins", "extras"];
          }
          if (this.isBuildYourOwn()) {
            steps = [
              "bases",
              "proteins",
              "extraProteins",
              "veggies",
              "sauces",
              "toppings",
              "extras",
            ];
          }
        }
        if (this.isKidsBowl()) {
          if (this.isSignature()) {
            steps = ["bases", "extras"];
          }
          if (this.isBuildYourOwn()) {
            steps = [
              "bases",
              "proteins",
              "veggies",
              "sauces",
              "toppings",
              "extras",
            ];
          }
        }
      }

      return steps;
    },
    isRiceOnly() {
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
    isBowl() {
      return this.category.name === "Bowl";
    },
    isKidsBowl() {
      return this.category.name === "Kid's Bowl";
    },
    isSignature() {
      return this.signature.name !== "Build Your Own";
    },
    isBuildYourOwn() {
      return this.signature.name === "Build Your Own";
    },
    hasSauceDialog(option) {
      return (
        this.checkMinSelected(option) &&
        option.type === "sauces" &&
        this.category.name !== "Korrito"
      );
    },
    hasBasesDialog(option) {
      !this.checkMinSelected(option) &&
        (option.type === "bases" || option.type === "rices");
    },
    hasNoneSelectedDialog(option) {
      return (
        !this.checkMinSelected(option) &&
        option.type !== "bases" &&
        option.type !== "rices"
      );
    },
    showSauceDialog() {
      this.$buefy.dialog.confirm({
        message: "Do you want your sauce on the side?",
        onConfirm: () => {
          this.$emit("note", "Sauce on the side");
          this.advanceStep();
        },
        onCancel: () => {
          this.advanceStep();
        },
        confirmText: "Yes",
        cancelText: "No",
      });
    },
    showBasesDialog() {
      this.$buefy.dialog.confirm({
        message: "Please select a base",
        confirmText: "Ok",
      });
    },
    showNoneSelectedDialog() {
      this.$buefy.dialog.confirm({
        message:
          "Are you sure you want to continue without selecting any options?",
        onConfirm: () => this.advanceStep(),
        confirmText: "Yes",
        cancelText: "No",
      });
    },
  },
  name: "EntreeOptions",
  props: ["options", "price", "category", "signature"],
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
