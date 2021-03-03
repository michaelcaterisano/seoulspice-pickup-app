<template>
  <section>
    <div class="location-container">
      <span class="page-title location-title">CHOOSE YOUR LOCATION</span>
      <div class="address-input-container">
        <b-button
          data-cy="get-user-location-button"
          class="is-small get-user-location-button"
          :loading="geoIsLoading"
          @click="getUserLocation"
          >USE MY LOCATION</b-button
        >
        <p>OR</p>
        <b-field class="location-search-field">
          <b-input
            v-model="userLocationInput"
            name="userLocationInput"
            placeholder="Enter address or zip"
            size="is-small"
            icon="search"
            @keyup.native.enter="getLocations"
            class="address-input"
          >
            ></b-input
          >
        </b-field>
        <b-button
          data-cy="submit"
          v-show="userLocationInput"
          :loading="submitIsLoading"
          class="is-small is-success submit-location"
          @click="getLocations"
          >SEARCH</b-button
        >
      </div>

      <div class="card-container">
        <OrderLocationCard
          data-cy="location-card"
          class="location-card"
          v-for="(locationInfo, index) in locations"
          :key="index"
          :index="index"
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
        />
      </div>
    </div>
  </section>
</template>

<script>
import OrderLocationCard from "./OrderLocationCard";
import { orderService } from "../config/api.service";
import { mapMutations } from "vuex";

import { createHelpers } from "vuex-map-fields";
import {
  openingTimeHour,
  closingTimeHour,
  closingTimeMinute,
} from "../config/config";

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
      userLocationInput: null,
      latitude: null,
      longitude: null,
      geoIsLoading: false,
      submitIsLoading: false,
      now: null,
      closingTime: null,
    };
  },
  created() {
    this.now = new Date();
    this.closingTime = new Date();
    this.openingTime = new Date();
    this.openingTime.setHours(openingTimeHour);
    this.closingTime.setHours(closingTimeHour);
    this.closingTime.setMinutes(closingTimeMinute);
  },
  mounted() {
    window.scrollTo(0, 0);
    // resets tab focus to top of page
    document.body.setAttribute("tabindex", "-1");
    document.body.focus();
    document.body.removeAttribute("tabindex");
  },
  methods: {
    ...mapMutations("menu", ["updateMenuData"]),
    async clicked() {
      if (
        this.now > this.closingTime ||
        this.openingTime.getHours() - this.now.getHours() > 3
      ) {
        this.$buefy.toast.open({
          duration: 2000,
          message: "Sorry, we're not accepting orders right now.",
          type: "is-danger",
        });
      } else {
        await this.getMenu();
        this.$emit("update", "entree");
      }
    },
    clearUserLocationInput() {
      this.userLocationInput = null;
    },
    getUserLocation() {
      this.geoIsLoading = true;
      this.userLocationInput = null;
      window.navigator.geolocation.getCurrentPosition(
        this.geoSuccess,
        this.geoFailure,
        { timeout: 10000 },
      );
    },
    geoSuccess(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.getLocations();
    },
    geoFailure() {
      this.geoIsLoading = false;
      this.$buefy.toast.open({
        duration: 2000,
        message:
          "Aw snap! We couldn't find your location. Please enter manually.",
        type: "is-danger",
      });
    },
    async getLocations() {
      if (!this.userLocationInput && !this.latitude && !this.longitude) {
        return;
      }
      this.submitIsLoading = true;
      // get location data
      try {
        const result = await orderService.post("/locations", {
          userAddress: this.userLocationInput,
          latitude: this.latitude,
          longitude: this.longitude,
        });
        this.geoIsLoading = false;
        this.submitIsLoading = false;
        if (result.data.success) {
          const locationData = result.data.locations.map(location => {
            location.phoneNumber = location.phoneNumber
              ? location.phoneNumber
              : "2125551111"; // for dev environment
            return location;
          });
          // don't include westfield location in production
          if (process.env.NODE_ENV === "production") {
            const westfieldIdx = locationData.findIndex(
              location => location.name.toLowerCase() === "md westfield moco",
            );
            locationData.splice(westfieldIdx, 1);
          }
          this.locations = locationData;
        } else {
          this.$buefy.toast.open({
            duration: 2000,
            message: "Something went wrong",
            type: "is-danger",
          });
        }
      } catch (error) {
        this.geoIsLoading = false;
        this.submitIsLoading = false;
        this.$buefy.toast.open({
          duration: 2000,
          message: "Something went wrong",
          type: "is-danger",
        });
      }
    },
    async getMenu() {
      try {
        const response = await orderService.get("/menu", {
          params: {
            locationId: this.location.id,
          },
        });
        if (response.data.success) {
          let menuData = response.data.menuData;
          this.updateMenuData(menuData);
        }
      } catch (error) {
        console.log(error);
      }
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
  max-width: 300px;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  margin-bottom: 24px;
}

.address-input-container {
  width: 90%;
  max-width: 300px;
  margin-bottom: 24px;
  text-align: center;
}

.address-input {
  border: 1px solid #dbdbdb !important;
  border-radius: 4px;
  width: 100%;
}

.submit-location {
  width: 100%;
}

.get-user-location-button {
  width: 100%;
  margin-top: 12px;
  margin-bottom: 12px;
}
.location-search-field {
  margin-top: 12px;
}

@media screen and (max-width: 480px) {
  .card-container {
    width: 75%;
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
