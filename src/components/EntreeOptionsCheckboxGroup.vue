<template>
  <div class="component-container">
    <div class="page-title">
      <span>{{ group.label.toUpperCase() }} </span>
      <span class="card-title">{{ quantityText.toUpperCase() }}</span>
    </div>
    <div class="options-and-button">
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
            <p class="choice-name body-text">
              {{ getChoiceName(choice).toUpperCase() }}
            </p>
            <p v-if="choice.description" class="choice-name body-text">
              {{ choice.description.toUpperCase() }}
            </p>
            <p class="body-text">{{ getChoicePrice(choice) }}</p>
          </div>
        </b-checkbox-button>
      </div>
      <div class="navigation-buttons">
        <b-button v-if="active !== 'extras'" type="is-danger" @click="cancel">
          CANCEL
        </b-button>
        <b-button
          v-if="active !== 'extras'"
          type="is-success"
          @click.prevent="$emit('next')"
        >
          NEXT
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  computed: {
    quantityText() {
      let max = this.getOptionMax(this.category, this.group);
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
    ...mapMutations("routes", ["backToEntrees"]),
    checkboxIsDisabled(item) {
      let max = this.getOptionMax(this.category, this.group);
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
    getImageUrl(choice) {
      return choice.imageUrl;
    },
    getOptionMax(category, group) {
      return category.name === "Korean Feast For 2" ||
        category.name === "Korean Feast For 4" ||
        category.name === "Kid's Bowl"
        ? group.KFmax
          ? group.KFmax
          : group.max
        : group.max;
    },
    cancel() {
      this.backToEntrees();
      this.$emit("cancel");
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
.component-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.options-and-button {
  text-align: center;
  max-width: 600px;
}
.checkbox-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 40px;
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
}

.choice-name {
  margin-bottom: -10px;
  width: 120px;
  white-space: normal;
}

.body-text {
  font-size: 13px !important;
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
.image-description {
  max-width: 120px;
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

.navigation-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  margin-bottom: 30px;
}

@media screen and (max-width: 480px) {
  .checkbox-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
