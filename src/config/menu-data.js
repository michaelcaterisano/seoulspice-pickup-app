const menuData = {
  categories: [
    {
      name: "Korean BBQ",
      description:
        "Bring home the Korean BBQ experience for a fun, communal experience you can enjoy in the comfort of your home.",
      imageUrl: require("../assets/images/entrees/kbbq.jpg"),
      price: null,
    },
    {
      name: "Korean Feast For 2",
      description:
        "Let us do the heavy lifting and prepare a complete meal for you and your family! All orders come with an assortment of our four sauces. Serves 2.",
      imageUrl: require("../assets/images/entrees/korean-feast.jpg"),
      price: 2500,
    },
    {
      name: "Korean Feast For 4",
      description:
        "Let us do the heavy lifting and prepare a complete meal for you and your family! All orders come with an assortment of our four sauces. Serves 4.",
      imageUrl: require("../assets/images/entrees/korean-feast.jpg"),
      price: 4000,
    },
    {
      name: "Bowl",
      description:
        "Build a bowl with your choice of base, proteins, veggies, sauces, and toppings.",
      imageUrl: require("../assets/images/entrees/bowl.jpg"),
      price: 850,
    },
    {
      name: "Korrito",
      description:
        "The ORIGINAL Korean-style sushi burrito! Your choice of ingredients wrapped in white or purple rice and nori (seaweed).",
      imageUrl: require("../assets/images/entrees/korrito.jpg"),
      price: 775,
    },
    {
      name: "Kid's Bowl",
      description: "A perfectly sized meal for our smaller #SEOULMATES.",
      imageUrl: require("../assets/images/entrees/kids-bowl.jpg"),
      price: 550,
    },
  ],
  signatures: [
    {
      name: "Build Your Own",
      description: "Follow your heart...and your cravings.",
      imageUrl: require("../assets/images/signatures/build-your-own.jpg"),
      price: 0,
    },
    {
      name: "Klassic",
      subtitle: "TRADITIONAL KOREAN FLAVORS",
      description:
        "Beef, sprouts-carrots-cucumbers-kale, korean hot sauce, scallions-sesame seeds-sesame oil.",
      imageUrl: require("../assets/images/signatures/klassic.jpg"),
      price: 299,
    },
    {
      name: "Seoul Train",
      subtitle: "EAST MEETS WEST",
      description:
        "Beef, corn-cucumbers-kale-kimchi, creamy sriracha sauce, crispy garlic-cilantro-scallions-sesame seeds.",
      imageUrl: require("../assets/images/signatures/seoul-train.jpg"),
      price: 299,
    },
    {
      name: "Kimchi Krunch",
      subtitle: "CRUNCHY, PICKLEY, FUNKY",
      description:
        "Chicken, sprouts-carrots-radish-kale-kimchi, ginger-carrot sauce, crispy garlic-cilantro-sesame seeds.",
      imageUrl: require("../assets/images/signatures/kimchi-krunch.jpg"),
      price: 249,
    },
    {
      name: "Southwest",
      subtitle: "SOUTHWESTERN FLAVORS",
      description:
        "Chicken, corn-carrots-kale, cilantr-lime ranch sauce, crispy garlic-cilantro-scallions.",
      imageUrl: require("../assets/images/signatures/southwest.jpg"),
      price: 249,
    },
    {
      name: "Fireball",
      subtitle: "UNAPOLOGETICALLY SPICY",
      description:
        "Spicy pork, corn-radish-kale-kimchi, korean hot sauce, creamy sriracha sauce, crispy garlic-scallions-sesame seeds-fire powder.",
      imageUrl: require("../assets/images/signatures/fireball.jpg"),
      price: 279,
    },
    {
      name: "Herbivore",
      subtitle: "A VEGAN DELIGHT",
      description:
        "Tofu, sprouts-corn-carrots-cucumbers-radish-kale-kimchi, ginger-carrot sauce, crispy garlic-scallions-sesame seeds.",
      imageUrl: require("../assets/images/signatures/herbivore.jpg"),
      price: 229,
    },
  ],
  kbbqTypes: [
    {
      name: "Korean BBQ Kit",
      subtitle: "",
      description: "Includes a tabletop grill and grill plate (yours to keep).",
      detail: "With Grill",
      imageUrl: "",
      price: 9900,
    },
    {
      name: "Korean BBQ Kit",
      subtitle: "",
      description: "Without the grill and grill plate.",
      detail: "No Grill",
      imageUrl: "",
      price: 6000,
    },
    {
      name: "Korean BBQ Refills",
      subtitle: "",
      description: "Order additional items ala carte.",
      detail: null,
      imageUrl: "",
      price: null,
    },
  ],
  options: [
    {
      type: "bases",
      label: "Choose your base",
      max: 2,
      KFmax: 1,
      cartLabel: "Bases",
      choices: [
        {
          name: "White Rice",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/bases/white-rice.jpg"),
        },
        {
          name: "Purple Rice",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/bases/purple-rice.jpg"),
        },
        {
          name: "Noodles",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/bases/noodles.jpg"),
        },
        {
          name: "Salad",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/bases/salad.jpg"),
        },
      ],
    },
    {
      type: "rices",
      label: "Choose your rice",
      max: 1,
      cartLabel: "Bases",
      choices: [
        {
          name: "White Rice",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/bases/white-rice.jpg"),
        },
        {
          name: "Purple Rice",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/bases/purple-rice.jpg"),
        },
      ],
    },
    {
      type: "proteins",
      label: "Pick your protein",
      max: 1,
      cartLabel: "Proteins",
      choices: [
        {
          name: "Beef",
          price: 299,
          selected: false,
          imageUrl: require("../assets/images/proteins/beef.jpg"),
        },
        {
          name: "Chicken",
          price: 249,
          selected: false,
          imageUrl: require("../assets/images/proteins/chicken.jpg"),
        },
        {
          name: "Spicy Pork",
          price: 279,
          selected: false,
          imageUrl: require("../assets/images/proteins/spicy-pork.jpg"),
        },
        {
          name: "Tofu",
          price: 229,
          selected: false,
          imageUrl: require("../assets/images/proteins/tofu.jpg"),
        },
      ],
    },
    {
      type: "kbbq-proteins",
      label: "Pick your protein",
      max: 1,
      cartLabel: "Proteins",
      choices: [
        {
          name: "Beef",
          description: "(uncooked)",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/proteins/beef.jpg"),
        },
        {
          name: "Chicken",
          description: "(uncooked)",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/proteins/chicken.jpg"),
        },
        {
          name: "Spicy Pork",
          description: "(uncooked)",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/proteins/spicy-pork.jpg"),
        },
      ],
    },
    {
      type: "extra proteins",
      label: "Choose your extra protein",
      cartLabel: "Extra Proteins",
      max: 4,
      choices: [
        {
          name: "Beef",
          price: 299,
          selected: false,
          imageUrl: require("../assets/images/proteins/beef.jpg"),
        },
        {
          name: "Chicken",
          price: 249,
          selected: false,
          imageUrl: require("../assets/images/proteins/chicken.jpg"),
        },
        {
          name: "Spicy Pork",
          price: 279,
          selected: false,
          imageUrl: require("../assets/images/proteins/spicy-pork.jpg"),
        },
        {
          name: "Tofu",
          price: 229,
          selected: false,
          imageUrl: require("../assets/images/proteins/tofu.jpg"),
        },
      ],
    },
    {
      type: "veggies",
      label: "Pick your veggies",
      cartLabel: "Veggies",
      max: 7,
      KFmax: 4,
      choices: [
        {
          name: "Cucumbers",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/veggies/cucumbers.jpg"),
        },
        {
          name: "Corn",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/veggies/corn.jpg"),
        },
        {
          name: "Korean Radish",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/veggies/radish.jpg"),
        },
        {
          name: "Carrots",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/veggies/carrots.jpg"),
        },
        {
          name: "Bean Sprouts",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/veggies/sprouts.jpg"),
        },
        {
          name: "Kimchi",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/veggies/kimchi.jpg"),
        },
        {
          name: "Kale",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/veggies/kale.jpg"),
        },
      ],
    },
    {
      type: "sauces",
      label: "Pick your sauces",
      cartLabel: "Sauces",
      max: 2,
      choices: [
        {
          name: "Korean Hot Sauce",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/sauces/korean-hot-sauce.jpg"),
        },
        {
          name: "Creamy Sriracha",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/sauces/creamy-sriracha.jpg"),
        },
        {
          name: "Ginger-Carrot",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/sauces/ginger-carrot.jpg"),
        },
        {
          name: "Cilantro-Lime Ranch",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/sauces/cilantro-lime-ranch.jpg"),
        },
      ],
    },
    {
      type: "toppings",
      label: "Pick your toppings",
      cartLabel: "Toppings",
      max: 6,
      choices: [
        {
          name: "Scallions",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/toppings/scallions.jpg"),
        },
        {
          name: "Cilantro",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/toppings/cilantro.jpg"),
        },
        {
          name: "Crispy Garlic",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/toppings/crispy-garlic.jpg"),
        },
        {
          name: "Sesame Seeds",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/toppings/sesame-seeds.jpg"),
        },
        {
          name: "Fire Powder",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/toppings/fire-powder.jpg"),
        },
        {
          name: "Sesame Oil",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/toppings/sesame-oil.jpg"),
        },
      ],
    },
    {
      type: "korean feast toppings",
      label: "Pick your toppings",
      cartLabel: "Toppings",
      max: 4,
      choices: [
        {
          name: "Crispy Garlic",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/toppings/crispy-garlic.jpg"),
        },
        {
          name: "Cilantro",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/toppings/cilantro.jpg"),
        },
        {
          name: "Scallions",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/toppings/scallions.jpg"),
        },
        {
          name: "Sesame Seeds",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/toppings/sesame-seeds.jpg"),
        },
      ],
    },
    {
      type: "kbbq-sides",
      label: "Additional Items",
      cartLabel: "Additional Items",
      max: Infinity,
      choices: [
        {
          name: "Uncooked Beef",
          subtitle: "per pound",
          description: "Ready for your grilling pleasure!",
          price: 1500,
          selected: false,
          imageUrl: require("../assets/images/proteins/beef.jpg"),
          qty: 0,
        },
        {
          name: "Uncooked Chicken",
          subtitle: "per pound",
          description: "Ready for your grilling pleasure!",
          price: 1200,
          selected: false,
          imageUrl: require("../assets/images/proteins/chicken.jpg"),
          qty: 0,
        },
        {
          name: "Uncooked Spicy Pork",
          subtitle: "per pound",
          description: "Ready for your grilling pleasure!",
          price: 1300,
          selected: false,
          imageUrl: require("../assets/images/proteins/spicy-pork.jpg"),
          qty: 0,
        },
        {
          name: "Purple Rice",
          subtitle: "feeds 3-4",
          description:
            "Multi-grain blend of forbidden black rice and sushi-grade white rice.",
          price: 500,
          selected: false,
          imageUrl: require("../assets/images/bases/purple-rice.jpg"),
          qty: 0,
        },
        {
          name: "White Rice",
          subtitle: "feeds 3-4",
          description: "Perfectly cooked sushi-grade white rice.",
          price: 500,
          selected: false,
          imageUrl: require("../assets/images/bases/white-rice.jpg"),
          qty: 0,
        },
        {
          name: "Japchae Noodles",
          subtitle: "feeds 3-4",
          description:
            "Delicious chewy gluten-free noodles tossed with kale, carrots, roasted sesame seeds, and a garlic-ginger-soy-sesame marinade.",
          price: 800,
          selected: false,
          imageUrl: require("../assets/images/bases/noodles.jpg"),
          qty: 0,
        },
        {
          name: "Kimchi",
          subtitle: "12oz",
          description:
            "A Shin family recipe, passed down four generations! Korean cabbage pickled in chilis, ginger, and garlic. Vegan-friendly!",
          price: 600,
          selected: false,
          imageUrl: require("../assets/images/veggies/kimchi.jpg"),
          qty: 0,
        },
        {
          name: "Korean Hot Sauce",
          subtitle: "12oz bottle",
          description: null,
          price: 799,
          selected: false,
          imageUrl: require("../assets/images/sauces/korean-hot-sauce.jpg"),
          qty: 0,
        },
        {
          name: "Cream Sriracha Sauce",
          subtitle: "12oz bottle",
          description: null,
          price: 799,
          selected: false,
          imageUrl: require("../assets/images/sauces/creamy-sriracha.jpg"),
          qty: 0,
        },
        {
          name: "Ginger-Carrot Sauce",
          subtitle: "12oz bottle",
          description: null,
          price: 799,
          selected: false,
          imageUrl: require("../assets/images/sauces/ginger-carrot.jpg"),
          qty: 0,
        },
        {
          name: "Cilantro-Lime Ranch",
          subtitle: "12oz bottle",
          description: null,
          price: 799,
          selected: false,
          imageUrl: require("../assets/images/sauces/cilantro-lime-ranch.jpg"),
          qty: 0,
        },
        {
          name: "Extra Butane Gas",
          subtitle: "Canister",
          description: "Add more fuel to the fire!",
          price: 300,
          selected: false,
          imageUrl: "https://via.placeholder.com/100x100",
          qty: 0,
        },
      ],
    },
    {
      type: "extras",
      label: "Extras?",
      cartLabel: "Extras",
      max: Infinity,
      choices: [
        {
          name: "The Egg",
          description:
            "Perfectly set white, liquid-gold yolk marinated in a sweet-soy base.",
          price: 199,
          selected: false,
          imageUrl: require("../assets/images/extras/the-egg.jpg"),
          qty: 0,
        },
        {
          name: "Avocado",
          description:
            "This nutrient-packed superfood adds a rich, buttery flavor to anything.",
          price: 189,
          selected: false,
          imageUrl: require("../assets/images/extras/avocado.jpg"),
          qty: 0,
        },
      ],
    },
  ],

  drinks: [
    {
      name: "Kale Apple",
      description: "Fresh pressed apples and kale.",
      price: 199,
      qty: 0,
      imageUrl: require("../assets/images/drinks/kale-apple.jpg"),
    },
    {
      name: "Yuzu Lime",
      description: "Yuzu + lime juice, sweetened with a touch of honey.",
      price: 99,
      qty: 0,
      imageUrl: require("../assets/images/drinks/yuzu-lime.jpg"),
    },
    {
      name: "Sac-Sac Grape",
      description: "Nostalgic Korean juice beverage with real fruit.",
      price: 199,
      qty: 0,
      imageUrl: require("../assets/images/drinks/sac-sac.jpg"),
    },
    {
      name: "Sac-Sac Orange",
      description: "Nostalgic Korean juice beverage with real fruit.",
      price: 199,
      qty: 0,
      imageUrl: require("../assets/images/drinks/sac-sac.jpg"),
    },
    {
      name: "Cherry Bubly",
      description:
        "Crisp, sparkling water with natural fruit flavors. zero calories, zero sweeteners, all smiles.",
      price: 99,
      qty: 0,
      imageUrl: require("../assets/images/drinks/bubly.jpg"),
    },
    {
      name: "Blackberry Bubly",
      description:
        "Crisp, sparkling water with natural fruit flavors. zero calories, zero sweeteners, all smiles.",
      price: 99,
      qty: 0,
      imageUrl: require("../assets/images/drinks/bubly.jpg"),
    },
    {
      name: "Grapefruit Bubly",
      description:
        "Crisp, sparkling water with natural fruit flavors. zero calories, zero sweeteners, all smiles.",
      price: 99,
      qty: 0,
      imageUrl: require("../assets/images/drinks/bubly.jpg"),
    },
    {
      name: "Mango Bubly",
      description:
        "Crisp, sparkling water with natural fruit flavors. zero calories, zero sweeteners, all smiles.",
      price: 99,
      qty: 0,
      imageUrl: require("../assets/images/drinks/bubly.jpg"),
    },
    {
      name: "Givn Water",
      description:
        "Every bottle purchased provides clean water to people in need.",
      price: 200,
      qty: 0,
      imageUrl: "https://via.placeholder.com/1500x1000",
    },
  ],
  desserts: [
    {
      name: "Chewy Chocolate Chip Cookie",
      description:
        "Soft, chewy, and buttery gluten-free chocolate chip cookies from our friends at Rise Bakery in Adams Morgan.",
      price: 259,
      qty: 0,
      imageUrl: require("../assets/images/desserts/cookie.jpg"),
    },
    {
      name: "Rice Krispie Treat",
      description:
        "Delightfully sweet and chewy gluten-free rice krispie treats from our friends at Rise Bakery in Adams Morgan.",
      price: 299,
      qty: 0,
      imageUrl: require("../assets/images/desserts/rice-krispie-treat.jpg"),
    },
  ],

  getOption(type) {
    return this.options.find((option) => option.type === type);
  },
};

module.exports = menuData;
