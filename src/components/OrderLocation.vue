<template>
  <section>
    <div class="location-container">
      <span class="page-title location-title">CHOOSE YOUR LOCATION</span>
      <div class="card-container">
        <order-location-card
          class="location-card"
          v-for="(locationInfo, index) in locations"
          :key="index"
          :location="locationInfo"
          @click.native="
            () => {
              location = locationInfo;
              clicked();
            }
          "
          @keyup.enter.native="
            () => {
              location = locationInfo;
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
import { orderService } from "../config/api.service";

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
      locations: null,
    };
  },
  async mounted() {
    // get location data
    const result = await orderService.get("/locations");
    const locationData = result.data.reduce((acc, curr) => {
      const {
        address: { addressLine1 },
        id,
        name,
        phoneNumber,
      } = curr;
      acc.push({
        address: addressLine1,
        id,
        name,
        phone: phoneNumber ? phoneNumber : "2125551111",
        taxRate: 10,
      });
      return acc;
    }, []);
    this.locations = locationData;
    // }
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  margin-bottom: 24px;
}

.location-card {
}

@media screen and (max-width: 480px) {
  .card-container {
    width: 75%;
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
