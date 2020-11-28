<template>
  <b-field
    class="label-text"
    :addons="false"
    label="Where would you like to pick up?"
  >
    <div class="checkbox-container">
      <b-button
        class="yellow-button"
        v-for="choice in locations"
        :key="choice.address"
        type="is-text"
        @click="
          () => {
            location = choice;
            $emit('location-selected');
          }
        "
      >
        <p>{{ choice.address }}</p>
        {{ choice.description }}
      </b-button>
    </div>
  </b-field>
</template>

<script>
import locations from '../config/locations';
import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: 'getOrderField',
  mutationType: 'updateOrderField',
});

export default {
  computed: {
    ...mapFields(['location']),
  },

  data() {
    return {
      locations: locations,
    };
  },
  methods: {},
  name: 'LocationOptionCheckboxGroup',
  props: {},
};
</script>

<style scoped>
.checkbox-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
</style>
