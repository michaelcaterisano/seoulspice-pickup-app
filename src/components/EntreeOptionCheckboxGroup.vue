<template>
  <b-field class="label-text" :addons="false">
    <div class="container">
      <div class="option-title is-size-5">
        <span>{{ labelText.toUpperCase() }}</span>
      </div>

      <div class="checkbox-container">
        <b-checkbox-button
          class="option"
          v-for="choice in group.choices"
          :key="choice.name"
          v-model="choice.selected"
          :disabled="checkboxIsDisabled(choice)"
          type="is-text"
        >
          <div
            class="image-container"
            v-bind:class="{ selected: choice.selected }"
          >
            <img :src="getImageUrl(choice)" />
            <div
              v-bind:class="{ overlay: true, selected: choice.selected }"
            ></div>
          </div>
          <span class="is-size-7">{{ getChoiceName(choice) }}</span>
        </b-checkbox-button>
      </div>

      <div class="has-text-centered buttons">
        <b-button
          type="is-warning"
          @click.prevent="$emit('next')"
          v-if="active !== 'extras'"
        >
          Next
          <span class="icon"><i class="fas fa-arrow-right"></i></span>
        </b-button>
        <b-button
          type="is-success"
          class="add-to-cart-button"
          @click.prevent="$emit('add-item')"
          v-if="active === 'extras'"
        >
          <span>Add to Cart ({{ price | currency }})</span>
        </b-button>
      </div>
    </div>
  </b-field>
</template>

<script>
export default {
  computed: {
    labelText() {
      let max =
        this.category.name === "Korean Feast For 2" ||
        this.category.name === "Korean Feast For 4"
          ? this.group.KFmax
            ? this.group.KFmax
            : this.group.max
          : this.group.max;

      return max === Infinity
        ? this.group.label
        : this.group.label + " (Choose up to  " + max + ")";
    },
    countSelectedOptions() {
      return this.group.choices.filter((choice) => choice.selected).length;
    },
  },
  methods: {
    checkboxIsDisabled(item) {
      let max =
        this.category.name === "Korean Feast For 2" ||
        this.category.name === "Korean Feast For 4"
          ? this.group.KFmax
            ? this.group.KFmax
            : this.group.max
          : this.group.max;
      return this.countSelectedOptions >= max && !item.selected;
    },
    getChoiceName(choice) {
      let choiceName = choice.name;
      if (choice.price > 0) {
        choiceName += " (+" + choice.price + ")";
      }
      return choiceName.toLowerCase();
    },
    updateOption() {
      return 1;
    },
    getImageUrl(choice) {
      return choice.imageUrl;
    },
  },
  name: "OrderOptionCheckboxGroup",
  props: {
    group: {
      type: Object,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
    active: {
      type: String,
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.checkbox-container {
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.option {
  flex-basis: calc(100% / 4);
}

.option-title {
  font-weight: 700;
}

img {
  display: block;
  /* max-width: 100%; */
  width: auto;
  height: auto;
  /* box-shadow: 0 0 1px 2px black; */
  border-radius: 15px;
}
.image-container {
  position: relative;
  width: 100%;
  border-radius: 15px;
}
.overlay {
  flex-basis: calc(100% / 4);
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 15px;
  background-image: url("~@/assets/check.png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0;
}

.selected {
  opacity: 1;
}
.label-text {
  text-align: center;
}

@media screen and (max-width: 900px) and (min-width: 600px) {
  .option {
    flex-basis: calc(100% / 2 - 24px);
  }

  .overlay {
    flex-basis: calc(100% / 2 - 24px);
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border-radius: 15px;
    background-image: url("~@/assets/check.png");
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
  }
}

@media screen and (max-width: 599px) {
  .checkbox-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .option {
    flex-basis: auto;
    width: 50%;
  }

  .overlay {
    flex-basis: 30%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border-radius: 15px;
    background-image: url("~@/assets/check.png");
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
