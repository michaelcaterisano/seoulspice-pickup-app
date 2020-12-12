const menuData = {
  categories: [
    {
      name: "Korean Feast For 2",
      description:
        "Let us do the heavy lifting and prepare a complete meal for you and your family! All orders come with an assortment of our four sauces. Serves 2. ",
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
      description: "It is sure to #FEEDYOURSEOUL!",
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
        "BEEF, sprouts-carrots-cucumbers, kale, KOREAN HOT SAUCE, scallions-sesame seeds-sesame oil.",
      imageUrl: require("../assets/images/signatures/klassic.jpg"),
      price: 299,
    },
    {
      name: "Seoul Train",
      subtitle: "EAST MEETS WEST",
      description:
        "BEEF, corn-cucumbers-kale-kimchi, CREAMY SRIRACHA SAUCE, crispy garlic-cilantro-scallions-sesame seeds.",
      imageUrl: require("../assets/images/signatures/seoul-train.jpg"),
      price: 299,
    },
    {
      name: "Kimchi Krunch",
      subtitle: "CRUNCHY, PICKLEY, FUNKY",
      description:
        "CHICKEN, sprouts-carrots-radish-kale-kimchi, GINGER-CARROT SAUCE, crispy garlic-cilantro-sesame seeds.",
      imageUrl: require("../assets/images/signatures/kimchi-krunch.jpg"),
      price: 249,
    },
    {
      name: "Southwest",
      subtitle: "SOUTHWESTERN FLAVORS",
      description:
        "CHICKEN, corn-carrots-kale, CILANTRO-LIME-RANCH SAUCE, crispy garlic-cilantro-scallions.",
      imageUrl: require("../assets/images/signatures/southwest.jpg"),
      price: 249,
    },
    {
      name: "Fireball",
      subtitle: "UNAPOLOGETICALLY SPICY",
      description:
        "SPICY PORK, corn-radish-kale-kimchi, KOREAN HOT SAUCE, CREAMY SRIRACHA SAUCE, crispy garlic-scallions-sesame seeds-fire powder.",
      imageUrl: require("../assets/images/signatures/fireball.jpg"),
      price: 279,
    },
    {
      name: "Herbivore",
      subtitle: "A VEGAN DELIGHT",
      description:
        "TOFU, sprouts-corn-carrots-cucumbers-radish-kale-kimchi, GINGER-CARROT SAUCE, crispy garlic-scallions-sesame seeds.",
      imageUrl: require("../assets/images/signatures/herbivore.jpg"),
      price: 229,
    },
  ],
  options: [
    {
      type: "bases",
      label: "Choose your base",
      max: 2,
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
      cartLabel: "Rice",
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
          name: "Corn",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/veggies/corn.jpg"),
        },
        {
          name: "Carrots",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/veggies/carrots.jpg"),
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
        {
          name: "Cucumbers",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/veggies/cucumbers.jpg"),
        },
        {
          name: "Korean Radish",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/veggies/radish.jpg"),
        },
        {
          name: "Bean Sprouts",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/veggies/sprouts.jpg"),
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
          name: "Sesame Oil",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/toppings/sesame-oil.jpg"),
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
        {
          name: "Fire Powder",
          price: 0,
          selected: false,
          imageUrl: require("../assets/images/toppings/fire-powder.jpg"),
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
      type: "extras",
      label: "Extras?",
      cartLabel: "Extras",
      max: Infinity,
      choices: [
        {
          name: "The Egg",
          description:
            "perfectly set white, liquid-gold yolk marinated in a sweet-soy base.",
          price: 199,
          selected: false,
          imageUrl: require("../assets/images/extras/the-egg.jpg"),
          qty: 0,
        },
        {
          name: "Avocado",
          description:
            "this nutrient-packed superfood adds a rich, buttery flavor to anything.",
          price: 189,
          selected: false,
          imageUrl: require("../assets/images/extras/avocado.jpg"),
          qty: 0,
        },
      ],
    },
  ],
  getOption(type) {
    return this.options.find((option) => option.type === type);
  },
};

export default menuData;
