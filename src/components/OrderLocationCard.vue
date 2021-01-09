<template>
  <div class="card" tabindex="0">
    <div class="card-image">
      <figure class="image is-16by9">
        <img :src="locationImageUrl" alt="Image of Seoulspice location" />
      </figure>
    </div>
    <div class="card-content">
      <span class="card-title location-description">{{
        location.name.toUpperCase()
      }}</span>

      <div class="card-description location-details">
        <span>{{ location.address }}</span
        ><br />
        <span>{{ formattedPhoneNumber }}</span>
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
        case "dc noma":
          url = require("../assets/images/locations/noma.jpg");
          break;
        case "dc tenleytown":
          url = require("../assets/images/locations/tenley.jpg");
          break;
        case "md college park":
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
.card-content {
  flex-grow: 1;
}
.column {
  padding: 0px !important;
}
.location-details {
  font-size: 13px;
}
</style>
