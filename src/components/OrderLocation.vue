<template>
  <section>
    <div class="location-container">
      <div class="card-container">
        <span class="page-title location-title">CHOOSE YOUR LOCATION</span>
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
    // have to add info to location in dev because square sandbox has limited info here
    if (process.env.NODE_ENV === "development") {
      const result = await orderService.get("/locations");
      const locationData = result.data.reduce((acc, curr) => {
        const {
          address: { addressLine1 },
          id,
          name,
        } = curr;
        acc.push({
          address: addressLine1,
          id,
          name,
          phone: "2125551111",
          taxRate: 10,
        });
        return acc;
      }, []);
      console.log(locationData);
      this.locations = locationData;
      // get location from square production
    } else {
      // const result = await orderService.get("/locations");
      // const locationData = result.data.reduce((acc, curr) => {
      //   const { address, id, name}
      // }, [])
    }
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
