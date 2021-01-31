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
          url = `https://res.cloudinary.com/seoulspice/image/upload/c_scale,w_300,f_auto,q_auto/seoulspice/locations/noma_r4ry5w.jpg`;
          break;
        case "dc tenleytown":
          url = `https://res.cloudinary.com/seoulspice/image/upload/c_scale,w_300,f_auto,q_auto/seoulspice/locations/tenley_c3qjoq.jpg`;
          break;
        case "md college park":
          url = `https://res.cloudinary.com/seoulspice/image/upload/c_scale,w_300,f_auto,q_auto/seoulspice/locations/umd_i06l2i.jpg`;
          break;
        default:
          url = `https://res.cloudinary.com/seoulspice/image/upload/c_scale,w_300,f_auto,q_auto/seoulspice/locations/noma_r4ry5w.jpg`;
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
