<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-16by9">
        <img src="http://placekitten.com/1600/900" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content is-size-7">
      <div>
        <span
          ><strong>{{ category.name }}</strong></span
        ><br />

        <span>{{ category.description }}</span
        ><br />
      </div>
      <!-- <div class="column is-one-third" align="right">
        <figure class="image is-96x96">
          <img class="is-rounded" src="http://placekitten.com/200/200" />
        </figure>
      </div> -->
      <footer class="card-footer">
        <span
          ><strong>${{ category.price }}</strong></span
        >
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
  method: {},
  name: "EntreeCategoryCard",
  props: ["category"],
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  margin-bottom: 24px !important;
  overflow: hidden;
}
</style>
