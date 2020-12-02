<template>
  <div class="card">
    <!-- <div class="card-image">
      <figure class="image is-16by9">
        <img src="http://placekitten.com/1600/900" alt="Placeholder image" />
      </figure>
    </div> -->
    <div class="card-content columns is-mobile">
      <div class="column is-two-thirds is-size-6">
        <span
          ><strong>{{ location.description }}</strong></span
        ><br />

        <span>{{ location.address }}</span
        ><br />
        <span>{{ location.phone }}</span>
      </div>
      <div class="column is-one-third" align="right">
        <figure class="image is-96x96">
          <img class="is-rounded" src="http://placekitten.com/200/200" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
  method: {},
  name: 'LocationCard',
  props: ['location'],
};
</script>

<style scoped>
.card {
  border-radius: 5px;
}
.column {
  padding: 0px !important;
}
</style>
