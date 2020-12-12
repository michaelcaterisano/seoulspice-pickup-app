<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-3x2">
        <img v-bind:src="option.imageUrl" alt="image of entree" />
      </figure>
    </div>
    <div class="card-content is-size-7">
      <span class="option-name">{{ option.name.toUpperCase() }}</span>
      <br v-if="option.description" />
      <span v-if="option.description" class="option-description">{{
        option.description.toLowerCase()
      }}</span>

      <span class="option-price">{{ price }}</span>
    </div>
    <footer class="card-footer">
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
  bottom: 0;
  border-top: none !important;
}
.card-footer-item {
  padding: 0 20px 20px 20px !important;
  justify-content: flex-start !important;
}
</style>
