<template>
  <section v-if="menuData">
    <EntreeCategories
      v-if="entreeRoute === 'entree-categories'"
      :categories="menuData.categories"
      @category-selected="setCategory"
      @update="setActive"
      data-cy="entree-categories"
    />

    <EntreeKBBQ
      v-if="entreeRoute === 'entree-kbbq'"
      :types="menuData.kbbqTypes"
      @signature-selected="setSignature"
      @update="setActive"
    />

    <EntreeSignatures
      v-if="entreeRoute === 'entree-signatures'"
      :signatures="signatures"
      :isSundaySignatures="isSundaySignatures"
      @signature-selected="setSignature"
      @update="setActive"
    />

    <EntreeOptions
      v-if="entreeRoute === 'entree-options'"
      :options="menuData"
      :price="price"
      :category="entree.category"
      :signature="entree.signature"
      @note="addNote"
      @valid="addToCart"
      @cancel="clearEntree"
    />
  </section>
</template>

<script>
import EntreeCategories from "../components/EntreeCategories";
import EntreeSignatures from "../components/EntreeSignatures";
import EntreeKBBQ from "../components/EntreeKBBQ";
import EntreeOptions from "../components/EntreeOptions";
import { mapState, mapMutations } from "vuex";
import { ADD_ITEM } from "../store/mutations.type";
import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "getOrderField",
  mutationType: "updateOrderField",
});

export default {
  components: {
    EntreeCategories,
    EntreeSignatures,
    EntreeKBBQ,
    EntreeOptions,
  },
  name: "OrderEntrees",
  computed: {
    ...mapState("routes", ["entreeRoute"]),
    ...mapState("menu", ["menu"]),
    ...mapFields(["location"]),
    signatures() {
      return this.entree.category.name === "$6 Signature Sundays"
        ? this.menuData.sundaySignatures
        : this.menuData.signatures;
    },
    isSundaySignatures() {
      return this.entree.category.name === "$6 Signature Sundays";
    },
    price() {
      let price = 0;
      if (this.entree.category) {
        price += this.entree.category.price;
      }
      if (this.entree.signature) {
        if (this.isKidsBowl()) {
          price += 0;
        } else {
          price += this.entree.signature.price;
        }
      }
      this.menuData.options.forEach(option => {
        option.choices.forEach(choice => {
          if (choice.selected) {
            if (
              (this.isKidsBowl() || this.isKoreanFeast()) &&
              option.type === "proteins"
            ) {
              price += 0;
            } else {
              price += choice.qty ? choice.price * choice.qty : choice.price;
            }
          }
        });
      });

      return price;
    },
  },

  data() {
    return {
      active: "entree-categories",
      entree: {
        category: null,
        signature: null,
        type: "entree",
      },
      notes: [],
      menuData: null,
    };
  },
  async created() {
    this.menuData = JSON.parse(JSON.stringify(this.menu)); // make local copy of menu
    this.menuData.getOption = function(type) {
      return this.options.find(option => option.type === type);
    };
  },

  mounted() {
    // resets tab focus to top of page
    document.body.setAttribute("tabindex", "-1");
    document.body.focus();
    document.body.removeAttribute("tabindex");
    this.clearEntree();
  },
  methods: {
    ...mapMutations("routes", ["updateEntreeRoute"]),
    addToCart() {
      let options = this.menuData.options
        .map(option => {
          let choices = option.choices.filter(choice => choice.selected);
          if (choices.length) {
            return {
              type: option.type,
              cartLabel: option.cartLabel,
              choices: choices,
            };
          }
          return null;
        })
        .filter(option => option !== null);

      const optionsToAdd = JSON.parse(JSON.stringify(options));

      const entreeToAdd = {
        name: this.getCategoryName(),
        signature: this.getEntreeSignatureName(),
        price: this.price,
        qty: 1,
        type: this.entree.type,
        options: optionsToAdd,
        notes: this.notes,
      };

      this.$store.commit(ADD_ITEM, entreeToAdd);
      this.confirmContinue();
    },
    getCategoryName() {
      let categoryName;
      if (this.isKBBQ()) {
        categoryName = this.entree.signature.name;
      } else {
        categoryName = this.entree.category.name;
      }
      return categoryName;
    },
    getEntreeSignatureName() {
      if (!this.entree.signature) {
        return null;
      }
      let signatureName;
      if (this.isKBBQ()) {
        signatureName = this.entree.signature.detail;
      } else {
        signatureName = this.entree.signature.name;
      }
      return signatureName;
    },
    confirmContinue() {
      if (this.edit) {
        this.$emit("update", "confirmation");
      } else {
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
      }
    },
    clearEntree() {
      if (this.menuData) {
        window.scrollTo(0, 0);
        this.entree.category = null;
        this.entree.signature = null;
        this.notes = [];
        this.menuData.options.forEach(option => {
          option.choices.forEach(choice => {
            choice.selected = false;
            choice.qty ? (choice.qty = 0) : null;
          });
        });
      }
    },

    setActive(section) {
      this.updateEntreeRoute(section);
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
    isKidsBowl() {
      return this.entree.category.name === "Kid's Bowl";
    },
    isKoreanFeast() {
      return (
        this.entree.category.name === "Korean Feast For 2" ||
        this.entree.category.name === "Korean Feast For 4"
      );
    },
    isKBBQ() {
      return this.entree.category.name === "Korean BBQ";
    },
  },
  props: ["edit"],
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
  margin-right: 0rem !important;
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
