<template>
  <div class="box">
    <div>
      <div class="delete-button">
        <button class="delete is-large" @click.prevent="removeItem()"></button>
      </div>
      <div class="item-name">
        <p>{{ item.signature }} {{ item.name }}</p>
        <p>{{ price | currency }}</p>
      </div>
      <div>
        <b-field>
          <b-numberinput
            :value="item.qty"
            @input="updateQty"
            min="1"
            type="is-warning"
          ></b-numberinput>
        </b-field>
      </div>
    </div>
    <ul v-if="item.type === 'entree'" class="options is-size-7">
      <li
        v-for="(option, index) in item.options"
        v-html="printOptions(option)"
        :key="index"
      ></li>
    </ul>

    <ul v-if="item.notes.length > 0" class="notes is-size-7">
      <li v-for="note in item.notes" :key="note">
        <strong>Order Notes:</strong> {{ note }}
      </li>
    </ul>
  </div>
</template>

<script>
import { UPDATE_QTY, REMOVE_ITEM } from "../store/mutations.type";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["countEntrees"]),
    price() {
      return this.item.price * this.item.qty;
    },
  },
  methods: {
    printOptions(option) {
      let optionText = "";
      optionText += "<strong>" + option.cartLabel + ": </strong>";
      optionText += option.choices
        .map((choice) => {
          let choiceText = choice.name;
          // if (choice.price > 0) {
          //   choiceText += " (+" + choice.price + ")";
          // }
          if (choice.qty) {
            choiceText = choice.qty + " " + choiceText;
          }
          return choiceText;
        })
        .join(", ");
      return optionText;
    },
    updateQty(val) {
      this.$store.commit(UPDATE_QTY, { qty: val, index: this.index });
    },
    removeItem() {
      if (this.item.type === "entree" && this.countEntrees === 1) {
        this.$buefy.toast.open({
          duration: 5000,
          message:
            "You must have at least one entree in your cart to place an order.",
          type: "is-danger",
        });
      } else {
        this.$store.commit(REMOVE_ITEM, this.index);
      }
    },
  },
  name: "CartItem",
  props: ["item", "index"],
};
</script>

<style scoped>
.options {
  border-top: 1px solid #ccc;
  margin-top: 15px;
  padding-top: 15px;
}
.notes {
  border-top: 1px solid #ccc;
  margin-top: 15px;
  padding-top: 15px;
}
.delete-button {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: -40px;
}
.item-name {
  font-weight: 700;
}
</style>
