<template>
  <section>
    <div class="container">
      <div class="box is-size-7">
        <p>
          Thank you for choosing SEOULSPICE!
          <br />
          We are so excited to #FEEDYOURSEOUL with delicious Korean comfort food
          💪 🇰🇷
        </p>
        <p v-if="curbside" class="curbside">
          <em>
            Please call {{ location.phone }} upon arriving at the restaurant and
            we will bring your order out to you.
          </em>
        </p>
      </div>
      <div class="box is-size-7">
        <span class="is-size-7"><strong>Order Information</strong></span>
        <p>
          Name:
          {{ name }}
          <br />
          Email:
          {{ email }}
          <br />
          Location:
          {{ location.description }} ({{ location.address }})
          <br />
          Time:
          {{ shortTime }}
          <br />
        </p>
      </div>
      <div class="box is-size-7">
        <span class="is-size-7"><strong>Items Ordered</strong></span>
        <div class="items-ordered" v-for="(item, index) in items" :key="index">
          <span>
            {{ item.qty }} {{ item.signature }} {{ item.name }} -
            {{ ((item.price * item.qty) / 100) | currency }}
          </span>
          <ul v-if="item.type === 'entree'" class="options is-size-7">
            <li
              v-for="(option, index) in item.options"
              v-html="printOptions(option)"
              :key="index"
            ></li>
            <li v-for="note in item.notes" :key="note">
              Order Note: {{ note }}
            </li>
          </ul>
        </div>
      </div>
      <div class="box is-size-7">
        <p>
          <strong>Subtotal:</strong>
          {{ (itemSubtotal / 100) | currency }}
          <br />
          <strong>Tax:</strong>
          {{ (tax / 100) | currency }}
          <br />
          <span v-if="tip > 0">
            <strong>Tip:</strong>
            {{ (tip / 100) | currency }}
            <br />
          </span>
          <strong>Total:</strong>
          {{ (total / 100) | currency }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "getOrderField",
  mutationType: "updateOrderField",
});
export default {
  computed: {
    ...mapGetters(["total", "itemSubtotal", "tax", "items", "tip"]),
    ...mapFields(["name", "location", "time", "email", "curbside"]),
    shortTime() {
      return this.time.toLocaleTimeString("en-US", {
        timeStyle: "short",
      });
    },
  },
  methods: {
    printOptions(option) {
      let optionText = "";
      optionText += option.cartLabel + ": ";
      optionText += option.choices
        .map((choice) => {
          let choiceText = choice.qty
            ? choice.name + ` (${choice.qty})`
            : choice.name;
          return choiceText;
        })
        .join(", ");
      return optionText;
    },
  },
  name: "OrderSummary",
};
</script>

<style scoped>
.container {
  width: 95%;
  max-width: 600px !important;
}
h3 {
  margin-top: 20px;
}
.options {
  margin-top: 0px !important;
}

.box {
  margin-bottom: 20px !important;
}

.items-ordered {
  margin-bottom: 10px;
}
.curbside {
  font-size: 13px;
}

li {
  list-style-type: "- ";
}
</style>
