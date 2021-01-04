<template>
  <div class="options-checkbox-group-container">
    <div class="page-title">
      <span>{{ group.label.toUpperCase() }} </span>
      <span class="card-title">{{ quantityText.toUpperCase() }}</span>
    </div>
    <div class="checkbox-container">
      <b-checkbox-button
        v-for="choice in group.choices"
        :key="choice.name"
        v-model="choice.selected"
        :disabled="checkboxIsDisabled(choice)"
        type="is-text"
      >
        <div class="option-container">
          <div
            class="image-container"
            v-bind:class="{ selected: choice.selected }"
          >
            <img
              :src="getImageUrl(choice)"
              width="625"
              height="625"
              loading="lazy"
            />
            <div
              v-bind:class="{ overlay: true, selected: choice.selected }"
            ></div>
          </div>
          <span class="choice-name body-text"
            >{{ getChoiceName(choice) }}
          </span>
          <span class="body-text">{{ getChoicePrice(choice) }}</span>
        </div>
      </b-checkbox-button>
    </div>
    <div class="has-text-centered buttons">
      <b-button
        type="is-success"
        @click.prevent="$emit('next')"
        v-if="active !== 'extras'"
      >
        NEXT
      </b-button>
    </div>
  </div>
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
        return "choose one";
      }
      return max === Infinity ? "unlimited" : " Choose up to  " + max + "";
    },
    countSelectedOptions() {
      return this.group.choices.filter((choice) => choice.selected).length;
    },
    showPrice() {
      return (
        this.category.name !== "Korean Feast For 2" &&
        this.category.name !== "Korean Feast For 4" &&
        this.category.name !== "Kid's Bowl"
      );
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
      return choiceName.toLowerCase();
    },
    getChoicePrice(choice) {
      if (this.showPrice && choice.price > 0) {
        return " (+" + choice.price / 100 + ")";
      } else {
        return "";
      }
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
.options-checkbox-group-container {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-content: center;
}
.checkbox-container {
  width: 100%;
  max-width: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 200px;
}

.option-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  margin-bottom: -35px;
  /* flex-basis: calc(100% / 2);
  min-width: 150px; */
}

.choice-name {
  margin-bottom: -10px;
}

.body-text {
  font-size: 13px !important;
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
  width: 100%;
  height: auto;
  background-color: rgb(220, 220, 220);
  border-radius: 15px;
}
.image-container {
  position: relative;
  border-radius: 15px;
  width: 120px;
  height: 120px;
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
  opacity: 0;
}

.selected {
  opacity: 1;
}
.label-text {
  text-align: center;
}

@media screen and (max-width: 480px) {
  .checkbox-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .overlay {
    /* background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border-radius: 15px;
    background-image: url("~@/assets/check.png");
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center; */
  }
}
</style>
