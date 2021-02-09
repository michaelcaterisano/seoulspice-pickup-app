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
        <p v-if="preorder" class="preorder">
          Preorder available
        </p>
        <p v-if="preorder" class="preorder">
          Next pickup {{ pickupDate }} 11:00am
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  openingTimeHour,
  closingTimeHour,
  closingTimeMinute,
} from "../config/config";
const PhoneNumber = require("awesome-phonenumber");
export default {
  computed: {
    formattedPhoneNumber() {
      const formattedNumber = new PhoneNumber(this.location.phoneNumber, "US");
      return formattedNumber.getNumber("national");
    },
    pickupDate() {
      const date = new Date(this.now);
      if (date > this.closingTime) {
        date.setDate(date.getDate() + 1);
      }
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
  },
  data() {
    return {
      now: null,
      preorder: false,
      openingTime: null,
      closingTime: null,
    };
  },
  created() {
    this.now = new Date();
    this.openingTime = new Date(this.now);
    this.closingTime = new Date(this.now);
    this.openingTime.setHours(openingTimeHour);
    this.closingTime.setHours(closingTimeHour);
    this.closingTime.setMinutes(closingTimeMinute);

    if (this.now < this.openingTime) {
      this.preorder = true;
    } else if (this.now > this.closingTime) {
      this.preorder = true;
    }
  },
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
.preorder {
  color: red;
}
</style>
