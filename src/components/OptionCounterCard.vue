<template>
  <div class="card" tabindex="0">
    <div class="card-image">
      <figure class="image is-3x2">
        <img
          v-bind:src="option.imageUrl"
          width="300"
          height="200"
          loading="lazy"
          style="width: 100%; height: auto; background-color: rgb(220, 220, 220);"
          alt="image of option"
        />
      </figure>
    </div>
    <div class="card-content">
      <span class="card-title">{{ option.name.toUpperCase() }}</span>
      <span v-if="option.description" class="card-description">{{
        option.description.charAt(0).toUpperCase() +
          option.description.slice(1).toLowerCase()
      }}</span>
    </div>
    <footer class="card-footer">
      <span class="card-price">{{ price }}</span>

      <b-field>
        <b-numberinput
          class="counter-buttons"
          type="is-warning"
          :min="0"
          v-model="option.qty"
          @input="setSelected"
        ></b-numberinput>
      </b-field>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    price() {
      return "$" + this.option.price / 100;
    },
  },
  methods: {
    setSelected(value) {
      if (value > 0) {
        this.option.selected = true;
      } else {
        this.option.selected = false;
      }
    },
  },
  name: "OptionCounterCard",
  props: ["option"],
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px !important;
  overflow: hidden;
  border-radius: 10px;
}

.counter-buttons {
  width: 40px !important;
}

.card-content {
  padding: 20px 20px 0 20px !important;
  margin-bottom: 12px;
  flex-grow: 1;
  text-align: center;
}
.option-name {
  font-weight: 700;
}
.option-price {
  font-weight: 400;
}
.option-description {
  display: block;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.02rem;
  line-height: 0.8rem;
}
.card-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 0;
  border-top: none !important;
}
.card-footer-item {
  padding: 0 20px 20px 20px !important;
  justify-content: flex-start !important;
}

input {
  color: black !important;
  border: none !important;
  box-shadow: none !important;
}
</style>
