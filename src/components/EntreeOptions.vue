<template>
  <div class="component-container">
    <transition-group class="transition-group" name="fade" mode="out-in">
      <EntreeOptionsCheckboxGroup
        v-for="step in checkboxSteps"
        :group="options.getOption(step)"
        :price="price"
        v-show="active === step"
        :key="step"
        :category="category"
        :signature="signature"
        @next="setActiveOrderStep"
        @cancel="$emit('cancel')"
      />

      <EntreeOptionsExtras
        v-if="active === 'kbbq-sides'"
        :key="'kbbq-sides'"
        :option="options.getOption('kbbq-sides')"
        title="additional items"
        @next="setActiveOrderStep"
        @cancel="$emit('cancel')"
      />

      <EntreeOptionsExtras
        v-if="active === 'extras'"
        :key="'extras'"
        :option="options.getOption('extras')"
        title="extras"
        @add-item="addItem"
        @next="setActiveOrderStep"
        @cancel="$emit('cancel')"
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
    ...mapGetters(["items"]),
    checkboxSteps() {
      return this.steps.filter(
        step => step !== "extras" && step !== "kbbq-sides",
      );
    },
  },
  data() {
    return {
      active: this.getInitialActive(),
      steps: this.getSteps(),
    };
  },
  methods: {
    optionInStock(option) {
      return this.options.getOption(option).choices.length;
    },
    addItem() {
      this.$emit("valid");
    },
    advanceStep(numSteps) {
      window.scrollTo(0, 0);
      let nextStep, inStock;
      if (!numSteps) {
        nextStep = this.steps[
          this.steps.findIndex(step => step === this.active) + 1
        ];
      } else {
        nextStep = this.steps[
          this.steps.findIndex(step => step === this.active) + numSteps
        ];
      }
      inStock = this.optionInStock(nextStep);
      if (nextStep === "extras" && !inStock) {
        this.addItem();
      } else {
        this.active = nextStep;
      }
    },
    checkMinSelected(option) {
      if (option.type === "extra proteins") {
        return true;
      }
      return option.choices.some(choice => choice.selected);
    },
    setActiveOrderStep() {
      const option = this.options.getOption(this.active);

      if (this.hasNoneSelected(option)) {
        if (this.isRequiredOption(option)) {
          this.showOptionRequiredDialog(option);
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
          if (this.signature.name === "Korean BBQ Refills") {
            active = "kbbq-sides";
          } else {
            active = "kbbq-proteins";
          }
          break;
        default:
          active = "bases";
      }
      return active;
    },
    getSteps() {
      let steps;
      if (this.isKBBQ()) {
        if (this.signature.name === "Korean BBQ Refills") {
          steps = ["kbbq-sides", "extras"];
        } else {
          steps = ["kbbq-proteins", "veggies", "kbbq-sides", "extras"];
        }
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
      return (
        this.category.name === "Bowl" ||
        this.category.name === "$6 Signature Sundays"
      );
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
    isRequiredOption(option) {
      return (
        option.type === "bases" ||
        option.type === "rices" ||
        option.type === "kbbq-proteins" ||
        (option.type === "proteins" && this.isKoreanFeast()) ||
        (option.type === "kbbq-sides" &&
          this.signature.name === "Korean BBQ Refills")
      );
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
        this.steps[this.steps.findIndex(step => step === this.active) + 1] ===
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
    showOptionRequiredDialog(option) {
      let message;
      switch (true) {
        case option.type === "bases" || option.type === "rices":
          message = "Please choose a base";
          break;
        case option.type === "kbbq-proteins":
          message = "Please pick a protein";
          break;
        case option.type === "proteins":
          message = "Please pick a protein";
          break;
        case option.type === "kbbq-sides":
          message = "Please choose at least one item";
          break;
      }
      this.$buefy.dialog.confirm({
        message,
        confirmText: "Ok",
      });
    },
    showNoneSelectedDialog(option) {
      this.$buefy.dialog.confirm({
        message:
          "Are you sure you want to continue without selecting any options?",
        onConfirm: () => {
          option.type === "proteins" &&
          !this.isKoreanFeast() &&
          !this.isKidsBowl()
            ? this.advanceStep(2)
            : this.advanceStep();
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
