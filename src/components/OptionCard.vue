<template>
  <div class="card" tabindex="0">
    <div v-if="!hideImage" class="card-image">
      <figure class="image is-3x2">
        <img
          v-bind:src="option.imageUrl"
          width="300"
          height="200"
          loading="lazy"
          style="width: 100%; height: auto; background-color: rgb(220, 220, 220);"
          alt="image of entree"
        />
      </figure>
    </div>
    <div class="card-content">
      <span class="card-title">{{ option.name.toUpperCase() }}</span>
      <!-- <br v-if="option.subtitle" /> -->
      <span v-if="option.subtitle" class="card-subtitle">{{
        option.subtitle
      }}</span>
      <span class="card-description">{{ option.description }}</span>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">
        <span class="card-price">{{ price }}</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    price() {
      return this.option.price > 0
        ? this.isSignature
          ? "+$" + this.option.price / 100
          : "$" + this.option.price / 100
        : "";
    },
  },
  methods: {},
  name: "OptionCard",
  props: ["option", "isSignature", "hideImage"],
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
  /* display: block;
  line-height: 0.3rem;
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 8px; */
}
.option-description {
  /* display: block; */
  /* font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.02rem;
  line-height: 0.8rem; */
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
