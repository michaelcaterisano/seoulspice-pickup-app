<template>
  <section>
    <transition-group name="fade">
      <AddonsOptions
        :key="drinkOptions.type"
        :group="drinkOptions"
        v-if="active === 'drinks'"
      />

      <AddonsOptions
        :key="dessertOptions.type"
        :group="dessertOptions"
        v-if="active === 'desserts'"
        Add
      />
    </transition-group>
    <div class="has-text-centered buttons">
      <a class="button is-success" @click.prevent="addItems()">
        <span>Next</span>
      </a>
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
.buttons {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 1px 0;
  background: white;
  position: fixed;
  bottom: 0;
}

.buttons {
  margin-top: 1em;
}
</style>
