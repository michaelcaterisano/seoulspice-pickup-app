<template>
  <div class="card" tabindex="0">
    <!-- <div class="card-image">
      <figure class="image is-16by9">
        <img src="http://placekitten.com/1600/900" alt="Placeholder image" />
      </figure>
    </div> -->
    <div class="card-content columns is-mobile">
      <div class="column is-two-thirds is-size-7">
        <span class="location-description">{{
          location.description.toUpperCase()
        }}</span
        ><br />

        <div class="location-details">
          <span>{{ location.address }}</span
          ><br />
          <span>{{ location.phone }}</span>
        </div>
      </div>
      <div class="column is-one-third" align="right">
        <figure class="image is-96x96">
          <img
            class="is-rounded"
            width="100"
            height="100"
            src="http://placekitten.com/200/200"
            loading="lazy"
          />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
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
.location-description {
  font-weight: 700;
  letter-spacing: 0.03rem;
}
.location-details {
  letter-spacing: 0.03rem;
}
</style>
