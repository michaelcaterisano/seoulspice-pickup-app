<template>
  <div class="card" tabindex="0">
    <div class="card-image">
      <figure class="image is-16by9">
        <img :src="location.imageUrl" alt="Image of Seoulspice location" />
      </figure>
    </div>
    <div class="card-content">
      <span class="card-title location-description">{{
        location.name.toUpperCase()
      }}</span>
      <div class="card-description location-details">
        <p>{{ location.address.addressLine1 }}</p>
        <p>{{ formattedPhoneNumber }}</p>
        <p>
          Distance: {{ location.distanceText }}
          <span v-if="index === 0">(closest to you)</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const PhoneNumber = require("awesome-phonenumber");
export default {
  computed: {
    formattedPhoneNumber() {
      const formattedNumber = new PhoneNumber(this.location.phoneNumber, "US");
      return formattedNumber.getNumber("national");
    },
  },
  method: {},
  name: "OrderLocationCard",
  props: ["location", "index"],
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
