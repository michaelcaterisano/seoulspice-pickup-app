<template>
  <section>
    <EntreeCategories
      :categories="menuData.categories"
      v-if="active === 'entree-categories'"
      @category-selected="setCategory"
      @update="setActive"
    />

    <EntreeSignatures
      v-if="active === 'entree-signatures'"
      :signatures="menuData.signatures"
      @signature-selected="setSignature"
      @update="setActive"
    />

    <EntreeOptions
      :options="menuData"
      :price="price"
      :category="entree.category"
      :signature="entree.signature"
      v-if="active === 'entree-options'"
      @note="addNote"
      @valid="addToCart"
    />
  </section>
</template>

<script>
import menuData from "../config/menu-data";
import EntreeCategories from "../components/EntreeCategories";
import EntreeSignatures from "../components/EntreeSignatures";
import EntreeOptions from "../components/EntreeOptions";
import { ADD_ITEM } from "../store/mutations.type";

export default {
  components: {
    EntreeCategories,
    EntreeSignatures,
    EntreeOptions,
  },
  data() {
    return {
      active: "entree-categories",
      entree: {
        category: null,
        signature: null,
        type: "entree",
      },
      menuData: menuData,
      notes: [],
    };
  },
  name: "OrderEntrees",
  computed: {
    price() {
      let price = 0;
      if (this.entree.category) {
        price += this.entree.category.price;
      }
      if (this.entree.signature) {
        if (this.entree.category.name === "Kid's Bowl") {
          price += 0;
        } else {
          price += this.entree.signature.price;
        }
      } else {
        this.menuData.options.forEach((option) => {
          option.choices.forEach((choice) => {
            if (choice.selected && !this.isKoreanFeast()) {
              if (
                this.entree.category.name === "Kid's Bowl" &&
                option.type === "proteins"
              ) {
                price += 0;
              } else {
                // is extras
                price += choice.qty ? choice.price * choice.qty : choice.price;
              }
            }
          });
        });
      }
      return price;
    },
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
        signature: this.entree.signature ? this.entree.signature.name : null,
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
        onConfirm: () => {
          this.clearEntree();
          this.setActive("entree-categories");
        },
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
      this.entree.signature = null;
      this.notes = [];
      this.menuData.options.forEach((option) => {
        option.choices.forEach((choice) => {
          choice.selected = false;
          // choice.onTheSide ? (choice.onTheSide = false) : null;
          choice.qty ? (choice.qty = 0) : null;
        });
      });
    },
    setActive(section) {
      this.active = section;
    },
    setCategory(category) {
      window.scrollTo(0, 0);
      this.entree.category = category;
    },
    setSignature(signature) {
      window.scrollTo(0, 0);
      this.entree.signature = signature;
    },
    addNote(value) {
      this.notes.push(value);
    },
    isKoreanFeast() {
      return (
        this.entree.category.name === "Korean Feast For 2" ||
        this.entree.category.name === "Korean Feast For 4"
      );
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
