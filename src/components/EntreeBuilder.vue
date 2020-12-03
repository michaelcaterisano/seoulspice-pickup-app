<template>
  <div class="entree-builder">
    <section class="section">
      <div class="container">
        <transition class="fade">
          <div v-if="!selectedLocation">
            <order-location @location-selected="setLocation" />
          </div>
          <div v-if="selectedLocation && !entree.category">
            <entree-categories
              :categories="menuData.categories"
              @category-selected="setCategory"
            ></entree-categories>
            <!-- <h3>What would you like to order?</h3>
            <div class="button-group">
              <b-button
                class="yellow-button"
                v-for="category in menuData.categories"
                :key="category.name"
                @click="setCategory(category)"
              >
                {{ category.name }}
              </b-button>
            </div> -->
          </div>
          <div v-if="showCombos">
            <signature-combos
              :combos="menuData.combos"
              @combo-selected="setCombo"
            ></signature-combos>
          </div>
          <entree-options
            :options="menuData"
            :price="price"
            :category="entree.category"
            :combo="entree.combo"
            v-if="showOptions"
            @note="addNote"
            @valid="addToCart"
          ></entree-options>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import menuData from "../config/menu-data";
import EntreeCategories from "../components/EntreeCategories";
import SignatureCombos from "../components/SignatureCombos";
import EntreeOptions from "../components/EntreeOptions";
import OrderLocation from "../components/OrderLocation";
import { ADD_ITEM } from "../store/mutations.type";

export default {
  components: {
    EntreeCategories,
    SignatureCombos,
    EntreeOptions,
    OrderLocation,
  },
  name: "EntreeBuilder",
  computed: {
    price() {
      let price = 0;
      if (this.entree.category) {
        price += this.entree.category.price;
      }
      this.menuData.options.forEach((option) => {
        option.choices.forEach((choice) => {
          if (choice.selected) {
            price += choice.price;
          }
        });
      });
      return price;
    },
    showCombos() {
      if (this.entree.category) {
        return (
          this.entree.combo === null &&
          this.entree.category.name !== "Korean Feast For 2" &&
          this.entree.category.name !== "Korean Feast For 4"
        );
      }
      return false;
    },
    showOptions() {
      if (this.entree.category) {
        return (
          this.entree.combo !== null ||
          this.entree.category.name === "Korean Feast For 2" ||
          this.entree.category.name === "Korean Feast For 4"
        );
      }
      return false;
    },
  },
  data() {
    return {
      selectedLocation: null,
      entree: {
        category: null,
        combo: null,
        type: "entree",
      },
      menuData: menuData,
      notes: [],
    };
  },
  methods: {
    addToCart() {
      let options = this.menuData.options
        .map((option) => {
          let choices = option.choices.filter((choice) => choice.selected);
          if (choices.length) {
            return {
              type: option.type,
              cartLabel: option.cartLabel,
              choices: choices,
            };
          }
          return null;
        })
        .filter((option) => option !== null);

      const optionsToAdd = JSON.parse(JSON.stringify(options));

      const entreeToAdd = {
        name: this.entree.category.name,
        combo: this.entree.combo ? this.entree.combo.name : null,
        price: this.price,
        qty: 1,
        type: this.entree.type,
        options: optionsToAdd,
        notes: this.notes,
      };

      this.$store.commit(ADD_ITEM, entreeToAdd);
      this.confirmContinue();
    },
    confirmContinue() {
      this.$buefy.dialog.confirm({
        message: "Would you like to add another entree?",
        onConfirm: () => this.clearEntree(),
        onCancel: () => {
          this.$emit("update", "addon");
          this.clearEntree();
        },
        confirmText: "Yes",
        cancelText: "No",
      });
    },
    clearEntree() {
      this.entree.category = null;
      this.entree.combo = null;
      this.menuData.options.forEach((option) => {
        option.choices.forEach((choice) => {
          choice.selected = false;
          choice.onTheSide ? choice.onTheSide === false : null;
        });
      });
    },
    setCategory(category) {
      this.entree.category = category;
    },
    setCombo(combo) {
      this.entree.combo = combo;
    },
    setLocation() {
      this.selectedLocation = true;
    },
    addNote(value) {
      this.notes.push(value);
    },
  },
};
</script>

<style type="text/scss" scoped>
.box {
  width: 25%;
  margin-top: 1em;
}

.button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.yellow-button {
  margin-right: 0rem !important; /* overring buefy */
  margin-bottom: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  background: rgb(249, 212, 0);
  border: 3px solid black !important; /* overring buefy */
}

.yellow-button:hover {
  background: rgb(249, 225, 0);
}
</style>
