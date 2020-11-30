<template>
  <div class="container">
    <transition-group name="fade" mode="out-in">
      <entree-option-checkbox-group
        v-for="step in steps"
        :group="options.getOption(step)"
        v-show="active === step"
        :key="step"
        :category="category"
        :combo="combo"
      ></entree-option-checkbox-group>
    </transition-group>
    <div class="has-text-centered buttons">
      <a
        class="button is-info"
        @click.prevent="setActiveOrderStep()"
        v-if="active !== 'extras'"
      >
        <span>Next</span>
        <span class="icon"><i class="fas fa-arrow-right"></i></span>
      </a>
      <a
        class="button is-success"
        @click.prevent="addItem()"
        v-if="active === 'extras'"
      >
        <span>Add to Cart ({{ price | currency }})</span>
      </a>
    </div>
  </div>
</template>

<script>
import EntreeOptionCheckboxGroup from './EntreeOptionCheckboxGroup';
import { mapGetters } from 'vuex';

export default {
  components: {
    EntreeOptionCheckboxGroup,
  },
  computed: {
    ...mapGetters(['items']),
  },
  data() {
    return {
      active: this.riceOnly() ? 'rices' : 'bases',
      steps: this.riceOnly()
        ? this.isKoreanFeast()
          ? ['rices', 'proteins', 'veggies', 'korean feast toppings', 'extras']
          : [
              'rices',
              'proteins',
              'extraProteins',
              'veggies',
              'sauces',
              'toppings',
              'extras',
            ]
        : [
            'bases',
            'proteins',
            'extraProteins',
            'veggies',
            'sauces',
            'toppings',
            'extras',
          ],
      comboSteps: ['bases', 'extraProteins', 'extras'],
      korritoComboSteps: ['rices', 'extras'],
    };
  },
  methods: {
    addItem() {
      this.$emit('valid');
    },
    advanceStep() {
      if (this.combo) {
        if (this.combo.name === 'Build Your Own') {
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
      return option.choices.some((choice) => choice.selected);
    },
    setActiveOrderStep() {
      const option = this.options.getOption(this.active);
      if (
        option.type === 'extraProteins' ||
        (this.checkMinSelected(option) &&
          (this.category.name === 'Korrito' || option.type !== 'sauces'))
      ) {
        this.advanceStep();
      }

      if (!this.checkMinSelected(option)) {
        this.$buefy.dialog.confirm({
          message:
            'Are you sure you want to continue without selecting any options?',
          onConfirm: () => this.advanceStep(),
          confirmText: 'Yes',
          cancelText: 'No',
        });
      }
      if (
        option.type === 'sauces' &&
        this.category.name !== 'Korrito' &&
        this.checkMinSelected(option)
      ) {
        this.$buefy.dialog.confirm({
          message: 'Do you want your sauce on the side?',
          onConfirm: () => {
            let choice = option.choices.find((choice) => choice.selected);
            choice.onTheSide = true;
            this.advanceStep();
          },
          onCancel: () => {
            // record sauce "on it"
            this.advanceStep();
          },
          confirmText: 'Yes',
          cancelText: 'No',
        });
      }
    },
    riceOnly() {
      return (
        this.category.name === 'Korean Feast For 2' ||
        this.category.name === 'Korean Feast For 4' ||
        this.category.name === 'Korrito'
      );
    },
    isKoreanFeast() {
      return (
        this.category.name === 'Korean Feast For 2' ||
        this.category.name === 'Korean Feast For 4'
      );
    },
    isKorrito() {
      return this.category.name === 'Korrito';
    },
  },
  name: 'OrderDetailsOptions',
  props: ['options', 'price', 'category', 'combo'],
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
