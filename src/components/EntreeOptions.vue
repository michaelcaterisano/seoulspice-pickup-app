<template>
  <div class="component-container">
    <transition-group class="transition-group" name="fade" mode="out-in">
      <EntreeOptionsCheckboxGroup
        v-for="step in optionSteps"
        :group="options.getOption(step)"
        :price="price"
        v-show="active === step"
        :key="step"
        :category="category"
        :signature="signature"
        @next="setActiveOrderStep()"
        @add-item="addItem()"
      />

      <EntreeOptionsExtras
        v-show="active === 'extras'"
        :key="'extras'"
        :extras="options.getOption('extras')"
        @add-item="addItem()"
      />
    </transition-group>
  </div>
</template>

<script>
import EntreeOptionsCheckboxGroup from "./EntreeOptionsCheckboxGroup";
import EntreeOptionsExtras from "./EntreeOptionsExtras";
import { mapGetters } from "vuex";

export default {
  components: {
    EntreeOptionsCheckboxGroup,
    EntreeOptionsExtras,
  },
  computed: {
    optionSteps() {
      return this.steps.filter((step) => step !== "extras");
    },
    ...mapGetters(["items"]),
  },
  data() {
    return {
      active: this.getInitialActive(),
      steps: this.getSteps(),
    };
  },
  methods: {
    addItem() {
      this.$emit("valid");
    },
    advanceStep(numSteps) {
      window.scrollTo(0, 0);
      if (!numSteps) {
        this.active = this.steps[
          this.steps.findIndex((step) => step === this.active) + 1
        ];
      } else {
        this.active = this.steps[
          this.steps.findIndex((step) => step === this.active) + numSteps
        ];
      }
    },
    checkMinSelected(option) {
      if (option.type === "extra proteins") {
        return true;
      }
      return option.choices.some((choice) => choice.selected);
    },
    setActiveOrderStep() {
      const option = this.options.getOption(this.active);

      if (this.hasNoneSelected(option)) {
        if (this.isBasesOption(option)) {
          this.showBasesRequiredDialog();
        } else {
          this.showNoneSelectedDialog(option);
        }
      } else if (this.hasSauceDialog(option)) {
        this.showSauceDialog();
      } else if (this.hasExtraProteinDialog(option)) {
        this.showExtraProteinDialog();
      } else {
        this.advanceStep();
      }
    },
    getInitialActive() {
      let active;
      switch (true) {
        case this.isKorrito():
          active = "rices";
          break;
        case this.isKBBQ():
          active = "proteins";
          break;
        default:
          active = "bases";
      }
      return active;
    },
    getSteps() {
      let steps;
      if (this.isKBBQ()) {
        steps = ["proteins", "extras"];
      }
      if (this.isKorrito()) {
        if (this.isSignature()) {
          steps = ["rices", "extra proteins", "extras"];
        }
        if (this.isBuildYourOwn()) {
          steps = [
            "rices",
            "proteins",
            "extra proteins",
            "veggies",
            "sauces",
            "toppings",
            "extras",
          ];
        }
      }
      if (this.isKoreanFeast()) {
        steps = [
          "bases",
          "proteins",
          "veggies",
          "korean feast toppings",
          "extras",
        ];
      }
      if (this.isBowl()) {
        if (this.isSignature()) {
          steps = ["bases", "extra proteins", "extras"];
        }
        if (this.isBuildYourOwn()) {
          steps = [
            "bases",
            "proteins",
            "extra proteins",
            "veggies",
            "sauces",
            "toppings",
            "extras",
          ];
        }
      }
      if (this.isKidsBowl()) {
        steps = [
          "bases",
          "proteins",
          "veggies",
          "sauces",
          "toppings",
          "extras",
        ];
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
    isKBBQ() {
      return this.category.name === "Korean BBQ";
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
    isBasesOption(option) {
      return option.type === "bases" || option.type === "rices";
    },
    hasSauceDialog(option) {
      return (
        this.checkMinSelected(option) &&
        option.type === "sauces" &&
        this.category.name !== "Korrito"
      );
    },
    hasNoneSelected(option) {
      return !this.checkMinSelected(option);
    },
    hasExtraProteinDialog(option) {
      return (
        this.checkMinSelected(option) &&
        this.steps[this.steps.findIndex((step) => step === this.active) + 1] ===
          "extra proteins"
      );
    },
    showExtraProteinDialog() {
      this.$buefy.dialog.confirm({
        message: "Do you want extra proteins?",
        onConfirm: () => {
          this.advanceStep();
        },
        onCancel: () => {
          this.advanceStep(2);
        },
        confirmText: "Yes",
        cancelText: "No",
      });
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
    showBasesRequiredDialog() {
      this.$buefy.dialog.confirm({
        message: "Please select a base",
        confirmText: "Ok",
      });
    },
    showNoneSelectedDialog(option) {
      this.$buefy.dialog.confirm({
        message:
          "Are you sure you want to continue without selecting any options?",
        onConfirm: () => {
          option.type === "proteins" ? this.advanceStep(2) : this.advanceStep();
        },
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
.component-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.transition-group {
  width: 100%;
}
.add-to-cart-button {
  margin-top: 12px;
}
</style>
