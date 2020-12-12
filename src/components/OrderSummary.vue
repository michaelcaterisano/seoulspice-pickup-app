<template>
  <section>
    <div class="container">
      <div class="box">
        <p class="thanks">
          Thank you for choosing SEOULSPICE!
          <br />
          We are so excited to #FEEDYOURSEOUL with delicious Korean comfort food
          💪 🇰🇷
        </p>
        <div class="content">
          <h3>Order Information</h3>
          <p>
            <strong>Name:</strong>
            {{ name }}
            <br />
            <strong>Email:</strong>
            {{ email }}
            <br />
            <strong>Location:</strong>
            {{ location.description }} ({{ location.address }})
            <br />
            <strong>Time:</strong>
            {{ shortTime }}
            <br />
          </p>
          <p v-if="curbside">
            <em>
              Please call {{ location.phone }} upon arriving at the restaurant
              and we will bring your order out to you.
            </em>
          </p>
          <h3>Items Ordered</h3>
          <div v-for="(item, index) in items" :key="index">
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
          <h3>Order Totals</h3>
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
            <strong>Totals:</strong>
            {{ (total / 100) | currency }}
          </p>
        </div>
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
  width: 80%;
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

li {
  list-style-type: "- ";
}
</style>
