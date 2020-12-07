<template>
  <section>
    <div class="container">
      <div class="card-container">
        <span class="location-title is-size-6">CHOOSE YOUR LOCATION</span>
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
          @keyup.enter.native="
            () => {
              location = loc;
              clicked();
            }
          "
        ></order-location-card>
      </div>
    </div>
  </section>
</template>

<script>
import OrderLocationCard from "./OrderLocationCard";
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
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    clicked() {
      this.$emit("update", "entree");
    },
  },
  name: "OrderLocation",
  props: [],
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.location-title {
  text-align: center;
  margin-bottom: 24px;
  font-weight: 700;
}
.card-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.location-card {
  margin-bottom: 30px;
  width: 600px;
  cursor: pointer;
}

@media screen and (max-width: 599px) {
  .card-container {
    width: 85%;
  }
  .location-card {
    width: 100%;
  }
}
</style>
