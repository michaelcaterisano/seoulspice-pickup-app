<template>
  <div class="card-container">
    <location-card
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
    ></location-card>
  </div>
</template>

<script>
import LocationCard from '../components/LocationCard';
import locations from '../config/locations';
import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: 'getOrderField',
  mutationType: 'updateOrderField',
});

export default {
  components: {
    LocationCard,
  },
  computed: {
    ...mapFields(['location']),
  },

  data() {
    return {
      locations: locations,
    };
  },
  methods: {
    clicked() {
      this.$emit('location-selected');
    },
  },
  name: 'OrderLocation',
  props: [],
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.location-card {
  margin-bottom: 30px;
  width: 60%;
  cursor: pointer;
}

.location-card:hover {
  box-shadow: 0 0 1px 2px rgb(249, 212, 0);
}

.yellow-button {
  height: auto;
  margin-right: 0rem !important; /* overring buefy */
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  background: rgb(249, 212, 0) !important;
  border: 3px solid black !important; /* overring buefy */
  margin: 20px;
}

.yellow-button:hover {
  background: rgb(249, 225, 0);
}

.label-text {
  text-align: center;
}

@media screen and (max-width: 767px) {
  .location-card {
    width: 100%;
  }
}
</style>
