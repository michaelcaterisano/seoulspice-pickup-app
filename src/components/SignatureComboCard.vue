<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-3x2">
        <img v-bind:src="combo.imageUrl" alt="image of entree" />
      </figure>
    </div>
    <div class="card-content is-size-7">
      <div>
        <span
          ><strong>{{ combo.name.toUpperCase() }}</strong></span
        ><br />

        <span>{{ combo.description.toLowerCase() }}</span
        ><br />
      </div>
      <!-- <div class="column is-one-third" align="right">
        <figure class="image is-96x96">
          <img class="is-rounded" src="http://placekitten.com/200/200" />
        </figure>
      </div> -->
      <!-- <footer class="card-footer">
        <span
          ><strong>${{ combo.price }}</strong></span
        >
      </footer> -->
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
  method: {},
  name: "SignatureComboCard",
  props: ["combo"],
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  margin-bottom: 24px !important;
  overflow: hidden;
}
.card-footer {
  margin: 12px 0 -24px 0;
  border-top: none !important;
}
</style>
