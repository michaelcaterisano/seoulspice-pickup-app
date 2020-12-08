<template>
  <div class="card" tabindex="0">
    <div class="card-image">
      <figure class="image is-3x2">
        <img v-bind:src="option.imageUrl" alt="image of entree" />
      </figure>
    </div>
    <div class="card-content is-size-7">
      <span class="option-name">{{ option.name.toUpperCase() }}</span>
      <br v-if="option.subtitle" />
      <span v-if="option.subtitle" class="option-subtitle">{{
        " " + option.subtitle.toUpperCase()
      }}</span>
      <br v-if="!option.subtitle" />

      <span class="option-description">{{
        option.description.toLowerCase()
      }}</span>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">
        <span
          ><strong>{{ price }}</strong></span
        >
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    price() {
      return this.option.price > 0 ? "$" + this.option.price : "";
    },
  },
  methods: {},
  name: "OptionCard",
  props: ["option", "isCombo"],
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
}

.card-content {
  padding: 20px 20px 5px 20px !important;
  flex-grow: 1;
}
.option-name {
  font-weight: 700;
}
.option-subtitle {
  display: block;
  line-height: 0.3rem;
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 8px;
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
  margin-bottom: -10px;
}
.card-footer-item {
  padding: 0 20px 20px 20px !important;
  justify-content: flex-start !important;
}
</style>
