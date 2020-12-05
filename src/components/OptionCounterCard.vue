<template>
  <div class="card" tabindex="0">
    <div class="card-image">
      <figure class="image is-3x2">
        <img v-bind:src="choice.imageUrl" alt="image of entree" />
      </figure>
    </div>
    <div class="card-content is-size-7">
      <div>
        <span class="choice-name">{{ choice.name.toUpperCase() }}</span
        ><br />

        <span class="choice-description">+${{ choice.price }}</span
        ><br />
      </div>
    </div>
    <footer class="card-footer">
      <b-field>
        <b-numberinput
          type="is-warning"
          v-model="choice.qty"
          @input="setSelected"
        ></b-numberinput>
      </b-field>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    // price() {
    //   return "$" + this.choice.price;
    // },
  },
  methods: {
    setSelected(value) {
      if (value > 0) {
        this.choice.selected = true;
      } else {
        this.choice.selected = false;
      }
    },
  },
  name: "OptionCounterCard",
  props: ["choice"],
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-bottom: 24px !important;
  overflow: hidden;
}

.counter-buttons {
  width: 100% !important;
  border: 1px solid blue;
}

.card-content {
  padding: 20px 20px 0 20px !important;
  margin-bottom: 12px;
  flex-grow: 1;
}
.card .choice-name {
  font-weight: 700;
}
.choice-description {
  font-weight: 400;
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
