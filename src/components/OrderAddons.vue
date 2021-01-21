<template>
  <section>
    <div class="component-container">
      <div class="addons-container">
        <AddonsOptions
          :group="menuData.drinks"
          title="drinks"
          v-if="active === 'drinks'"
        />
        <AddonsOptions
          :group="menuData.desserts"
          title="desserts"
          v-if="active === 'desserts'"
        />
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
import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "getOrderField",
  mutationType: "updateOrderField",
});
export default {
  components: {
    AddonsOptions,
  },
  computed: {
    ...mapFields(["location"]),

    buttonText() {
      return "NEXT";
    },
  },
  beforeMount() {
    switch (this.location.name.toLowerCase()) {
      case "dc noma":
        this.menuData = require("../config/noma-menu.js");
        break;
      case "dc tenleytown":
        this.menuData = require("../config/tenleytown-menu.js");
        break;
      case "md college park":
        this.menuData = require("../config/college-park-menu.js");
        break;
      case "md westfield":
        this.menuData = require("../config/westfield-menu.js");
        break;
      default:
        this.menuData = require("../config/menu-data.js");
    }
  },
  data() {
    return {
      active: "drinks",
    };
  },
  methods: {
    addItems() {
      const choices =
        this.active === "drinks"
          ? this.menuData.drinks
          : this.menuData.desserts;
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
