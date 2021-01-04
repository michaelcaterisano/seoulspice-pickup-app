<template>
  <section>
    <div class="component-container">
      <!-- <transition-group name="fade"> -->
      <div class="addons-container">
        <AddonsOptions
          :key="drinkOptions.type"
          :group="drinkOptions"
          v-if="active === 'drinks'"
        />

        <AddonsOptions
          :key="dessertOptions.type"
          :group="dessertOptions"
          v-if="active === 'desserts'"
        />
        <!-- </transition-group> -->
      </div>
      <b-button class="next-button is-success" @click.prevent="addItems()">
        <span>{{ buttonText }}</span>
      </b-button>
    </div>
  </section>
</template>

<script>
import { ADD_ITEM } from "../store/mutations.type";
import AddonsOptions from "./AddonsOptions";
import drinkOptions from "../config/drink-options";
import dessertOptions from "../config/dessert-options";
export default {
  components: {
    AddonsOptions,
  },
  data() {
    return {
      drinkOptions: drinkOptions,
      dessertOptions: dessertOptions,
      active: "drinks",
    };
  },
  computed: {
    buttonText() {
      return "NEXT";
    },
  },
  methods: {
    addItems() {
      const choices =
        this.active === "drinks"
          ? this.drinkOptions.choices
          : this.dessertOptions.choices;
      const choicesToAdd = choices.filter((choice) => choice.qty > 0);

      if (choicesToAdd.length) {
        choicesToAdd.forEach((choice) => {
          const itemToAdd = {
            name: choice.name,
            qty: choice.qty,
            type: this.active === "drinks" ? "drink" : "dessert",
            price: choice.price,
            options: null,
          };
          this.$store.commit(ADD_ITEM, itemToAdd);
        });
      }

      if (this.active === "drinks") {
        window.scrollTo(0, 0);
        this.active = "desserts";
      } else {
        this.$emit("update", "confirmation");
      }
    },
  },
  name: "OrderAddons",
};
</script>

<style scoped>
.component-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.addons-container {
  max-width: 600px;
}
.next-button {
  margin-bottom: 30px;
}

.buttons {
  margin-top: 1em;
}

@media screen and (max-width: 480px) {
  .addons-container {
    width: 75%;
  }
}
</style>
