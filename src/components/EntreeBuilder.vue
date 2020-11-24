<template>
  <div class="entree-builder">
    <section class="section">
      <div class="container">
        <transition class="fade">
          <div v-if="!entree.category" class="has-text-centered">
            <h3>What would you like to order?</h3>
            <div class="buttons">
              <b-button
                class="entree-button"
                v-for="category in entreeOptions.categories"
                :key="category.name"
                @click="setCategory(category)"
                >{{ category.name }} </b-button
              >
            </div>
          </div>
          <div v-if="!entree.combo" class="has-text-centered">
            <h3>Would you like a Signature Combination or to Build Your Own?</h3>
            <div class="buttons">
              <b-button
                class="entree-button"
                v-for="combo in entreeOptions.combos"
                :key="combo.name"
                @click="setCombo(combo)"
                >{{ combo.name }} </b-button
              >
            </div>
          </div>
          <entree-options-component
            :options="entreeOptions"
            :price="price"
            :category="entree.category"
            :combo="entree.combo"
            v-if="entree.category && entree.combo"
            @valid="addToCart"
          ></entree-options-component>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import entreeOptions from "../config/entree-options";
import EntreeOptionsComponent from "../components/EntreeOptions";
import { ADD_ITEM } from "../store/mutations.type";

export default {
  components: {
    EntreeOptionsComponent
  },
  name: "EntreeBuilder",
  computed: {
    price() {
      let price = 0;
      if (this.entree.category) {
        price += this.entree.category.price;
      }
      this.entreeOptions.options.forEach(option => {
        option.choices.forEach(choice => {
          if (choice.selected) {
            price += choice.price;
          }
        });
      });
      return price;
    }
  },
  data() {
    return {
      entree: {
        category: null,
        combo: null,
        type: "entree"
      },
      entreeOptions: entreeOptions
    };
  },
  methods: {
    addToCart() {
      let options = this.entreeOptions.options
        .map(option => {
          let choices = option.choices.filter(choice => choice.selected);
          if (choices.length) {
            return {
              type: option.type,
              cartLabel: option.cartLabel,
              choices: choices
            };
          }
          return null;
        })
        .filter(option => option !== null);

      const optionsToAdd = JSON.parse(JSON.stringify(options));

      const entreeToAdd = {
        name: this.entree.category.name,
        combo: this.entree.combo.name,
        price: this.price,
        qty: 1,
        type: this.entree.type,
        options: optionsToAdd
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
        cancelText: "No"
      });
    },
    clearEntree() {
      this.entree.category = null;
      this.entreeOptions.options.forEach(option => {
        option.choices.forEach(choice => {
          choice.selected = false;
        });
      });
    },
    setCategory(category) {
      this.entree.category = category;
    },
    setCombo(combo) {
      this.entree.combo = combo;
    }
  }
};
</script>

<style type="text/scss" scoped>
  .box {
    width: 25%;
    margin-top: 1em;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .entree-button {
    margin-right: 0rem !important; /* overring buefy */
    border-radius: 10px;
    width: 400px;
    background: rgb(249,212,0);
    border: 3px solid black !important; /* overring buefy */
  }

  .entree-button:hover {
    background: rgb(249,225,0);

  }
</style>
