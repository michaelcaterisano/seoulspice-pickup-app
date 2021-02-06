<template>
  <div class="box" tabindex="0">
    <div class="item-body">
      <div class="delete-button">
        <b-button
          size="is-small"
          icon-left="fas fa-times-circle"
          @click.native="removeItem"
        >
        </b-button>
      </div>
      <div class="card-title">
        <span
          >{{ item.name.toUpperCase() }}
          {{ signatureText.toUpperCase() }} </span
        ><br />
        <!-- <span>{{ price | currency }}</span> -->
      </div>
      <ul
        v-if="item.type === 'entree'"
        class="card-description cart-item-description"
      >
        <li
          v-for="(option, index) in item.options"
          v-html="printOptions(option)"
          :key="index"
        ></li>
      </ul>

      <ul class="notes is-size-7">
        <li v-for="note in item.notes" :key="note">
          <strong>Order Notes:</strong> {{ note }}
        </li>
      </ul>
    </div>

    <div>
      <b-field>
        <b-numberinput
          :value="item.qty"
          @input="updateQty"
          min="1"
          type="is-counter-button"
          size="is-small"
        ></b-numberinput>
      </b-field>
    </div>
  </div>
</template>

<script>
import { UPDATE_QTY, REMOVE_ITEM } from "../store/mutations.type";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["countEntrees"]),
    price() {
      return (this.item.price / 100) * this.item.qty;
    },
    signatureText() {
      return !this.item.signature || this.item.signature === "Build Your Own"
        ? ""
        : "- " + this.item.signature;
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
            choiceText = `${choiceText} x ${choice.qty}`;
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
          duration: 2000,
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
  props: ["items", "item", "index"],
};
</script>

<style scoped>
.box {
  padding: 0 !important;
}
.item-body {
  padding: 10px;
}
.options {
  border-top: 1px solid #ccc;
}
.notes {
  border-top: 1px solid #ccc;
  margin-top: 15px;
  padding-top: 15px;
}
.delete-button {
  text-align: right;
}

.item-name {
  font-weight: 700;
  margin-bottom: 10px;
}
.button.button {
  border: none !important;
}
.cart-item-description {
  margin-left: 10px;
}

ul {
  border: none !important;
}
</style>
