<template>
  <div class="card" tabindex="0">
    <div class="card-image">
      <figure class="image is-16by9">
        <img :src="locationImageUrl" alt="Image of Seoulspice location" />
      </figure>
    </div>
    <div class="card-content columns is-mobile">
      <div class="column is-two-thirds is-size-7">
        <span class="card-title location-description">{{
          location.name.toUpperCase()
        }}</span>

        <div class="card-description location-details">
          <span>{{ location.address }}</span
          ><br />
          <span>{{ formattedPhoneNumber }}</span>
        </div>
      </div>
      <!-- <div class="column is-one-third" align="right">
        <figure class="image is-96x96">
          <img
            width="100"
            height="100"
            :src="locationImageUrl"
            loading="lazy"
          />
        </figure>
      </div> -->
    </div>
  </div>
</template>

<script>
const PhoneNumber = require("awesome-phonenumber");
export default {
  computed: {
    locationImageUrl() {
      let url;
      switch (this.location.name.toLowerCase()) {
        case "seoulspice noma":
          url = require("../assets/images/locations/noma.jpg");
          break;
        case "seoulspice tenley":
          url = require("../assets/images/locations/tenley.jpg");
          break;
        case "seoulspice umd":
          url = require("../assets/images/locations/umd.jpg");
          break;
        default:
          url = require("../assets/images/locations/noma.jpg");
      }
      return url;
    },
    formattedPhoneNumber() {
      const formattedNumber = new PhoneNumber(this.location.phone, "US");
      return formattedNumber.getNumber("national");
    },
  },
  method: {},
  name: "OrderLocationCard",
  props: ["location"],
};
</script>

<style scoped>
.card {
  border-radius: 5px;
}
.column {
  padding: 0px !important;
}
.location-details {
  font-size: 13px;
}
</style>
