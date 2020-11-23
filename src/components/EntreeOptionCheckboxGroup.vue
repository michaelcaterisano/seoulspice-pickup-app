<template>
  <b-field :addons="false" :label="labelText">
    <div class="checkbox-container">
      <b-checkbox-button
        class="image-checkbox"
        v-for="choice in group.choices"
        :key="choice.name"
        v-model="choice.selected"
        :disabled="checkboxIsDisabled(choice)"
        type="is-text"
      >
        <img :src="getImageUrl(choice)" @click="toggleClicked()" />
        {{ getChoiceName(choice) }}
      </b-checkbox-button>
    </div>
  </b-field>
</template>

<script>
export default {
 
  computed: {
    labelText() {
      return this.group.label + " (Choose up to  " + this.group.max + ")";
    },
    countSelectedOptions() {
      return this.group.choices.filter(choice => choice.selected).length;
    }
  },
  methods: {
    checkboxIsDisabled(item) {
      return this.countSelectedOptions >= this.group.max && !item.selected;
    },
    getChoiceName(choice) {
      let choiceName = choice.name;
      if (choice.price > 0) {
        choiceName += " (+" + choice.price + ")";
      }
      return choiceName;
    },
    updateOption() {
      return 1;
    },
    getImageUrl(choice) {
      return choice.selected ? "http://placekitten.com/200/200" : "https://via.placeholder.com/200";
    }
  },
  name: "OrderOptionCheckboxGroup",
  props: {
    group: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>

  .checkbox-container {
    display: flex;
    flex-direction: row;
  }
</style>
