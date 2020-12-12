<template>
  <b-field class="label-text" :addons="false">
    <div class="container">
      <div class="option-title is-size-6">
        <span
          >{{ group.label.toUpperCase() }} <br />
          {{ quantityText.toLowerCase() }}</span
        >
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
          <span class="is-size-7 choice-name">{{ getChoiceName(choice) }}</span>
        </b-checkbox-button>
      </div>

      <div class="has-text-centered buttons">
        <b-button
          type="is-success"
          @click.prevent="$emit('next')"
          v-if="active !== 'extras'"
        >
          Next
        </b-button>
      </div>
    </div>
  </b-field>
</template>

<script>
export default {
  components: {},
  computed: {
    quantityText() {
      let max =
        this.category.name === "Korean Feast For 2" ||
        this.category.name === "Korean Feast For 4"
          ? this.group.KFmax
            ? this.group.KFmax
            : this.group.max
          : this.group.max;

      if (max < 2) {
        return "(choose one)";
      }
      return max === Infinity ? "(unlimited)" : " (Choose up to  " + max + ")";
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
        choiceName += " (+" + choice.price / 100 + ")";
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
  name: "EntreeOptionsCheckboxGroup",
  props: {
    options: {
      type: Object,
    },
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
    price: {
      type: Number,
    },
    step: {
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
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 100px;
}

.option {
  flex-basis: calc(100% / 4);
  min-width: 150px;
}

.option-title {
  font-weight: 700;
  margin-bottom: 20px;
}

.choice-name {
  letter-spacing: 0.05rem;
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
    flex-basis: 33%;
  }

  .overlay {
    flex-basis: 33%;
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
    justify-content: flex-start;
  }
  .option {
    flex-basis: calc(100% / 2);
    min-width: 100px;
  }

  .overlay {
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
