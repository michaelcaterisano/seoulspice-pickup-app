<template>
  <div class="card-container">
    <span class="location-title is-size-5">CHOOSE YOUR LOCATION</span>
    <order-location-card
      class="location-card"
      v-for="(loc, index) in locations"
      :key="index"
      :location="loc"
      @click.native="
        () => {
          location = loc;
          clicked();
        }
      "
    ></order-location-card>
  </div>
</template>

<script>
import OrderLocationCard from "../components/OrderLocationCard";
import locations from "../config/locations";
import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "getOrderField",
  mutationType: "updateOrderField",
});

export default {
  components: {
    OrderLocationCard,
  },
  computed: {
    ...mapFields(["location"]),
  },

  data() {
    return {
      locations: locations,
    };
  },
  methods: {
    clicked() {
      this.$emit("location-selected");
    },
  },
  name: "OrderLocations",
  props: [],
};
</script>

<style scoped>
.location-title {
  text-align: center;
  margin-bottom: 24px;
}
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.location-card {
  margin-bottom: 30px;
  width: 60%;
  cursor: pointer;
}

.location-card:hover {
  box-shadow: 0 0 1px 2px rgb(249, 212, 0);
}

@media screen and (max-width: 767px) {
  .location-card {
    width: 100%;
  }
}
</style>
