<template>
  <section>
    <b-sidebar
      type="is-light"
      :fullheight="true"
      :fullwidth="false"
      :overlay="true"
      :right="true"
      v-model="open"
    >
      <div>sidebar</div>
    </b-sidebar>
  </section>
</template>

<script>
export default {
  name: "CartSideBar",
  props: ["open"],
};
</script>

<style></style>
