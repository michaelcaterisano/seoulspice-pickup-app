<template>
  <section>
    <div class="location-container">
      <div class="card-container">
        <span class="page-title location-title">CHOOSE YOUR LOCATION</span>
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
    // resets tab focus to top of page
    document.body.setAttribute("tabindex", "-1");
    document.body.focus();
    document.body.removeAttribute("tabindex");
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
.location-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.card-container {
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.location-card {
  margin-bottom: 30px;
  cursor: pointer;
  width: 100%;
}

/* @media screen and (max-width: 480px) {
  .card-container {
    width: 90%;
  }
  .location-card {
    width: 100%;
  }
} */
</style>
