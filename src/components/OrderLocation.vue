<template>
  <section>
    <div class="location-container">
      <span class="page-title location-title">CHOOSE YOUR LOCATION</span>
      <div class="address-input-container">
        <b-button
          data-cy="getUserLocationButton"
          class="is-small is-success get-user-location-button"
          :loading="geoIsLoading"
          @click="getUserLocation"
          >USE MY LOCATION</b-button
        >

        <p>OR</p>
        <p>
          <b-field>
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
            >FIND</b-button
          >
        </p>
      </div>

      <div class="card-container">
        <OrderLocationCard
          data-cy="location-card"
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
        />
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
      userLocationInput: null,
      latitude: null,
      longitude: null,
      geoIsLoading: false,
      submitIsLoading: false,
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
    clearUserLocationInput() {
      this.userLocationInput = null;
    },
    getUserLocation() {
      this.geoIsLoading = true;
      this.userLocationInput = null;
      window.navigator.geolocation.getCurrentPosition(
        this.geoSuccess,
        this.geoFailure
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
      const result = await orderService.post("/locations", {
        userAddress: this.userLocationInput,
        latitude: this.latitude,
        longitude: this.longitude,
      });
      this.geoIsLoading = false;
      this.submitIsLoading = false;
      const locationData = result.data.map((location) => {
        location.phoneNumber = location.phoneNumber
          ? location.phoneNumber
          : "2125551111"; // for dev environment
        location.taxRate = 6; // make this dynamic
        return location;
      });
      this.locations = locationData;
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
}

@media screen and (max-width: 480px) {
  .card-container {
    width: 75%;
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
