const menuData = {
  categories: [
    {
      name: "Korean Feast For 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
      price: 9.0,
    },
    {
      name: "Korean Feast For 4", description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.", price: 9.0
    },
    {
      name: "Bowl", description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.", price: 9.0
    },
    {
      name: "Korrito", description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.", price: 9.0
    },
    {
      name: "Kid's Bowl", description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.", price: 9.0
    },
  ],
  combos: [
    {
      name: "Build Your Own", description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.", price: 0
    },
    {
      name: "Klassic", description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.", price: 0
    },
    {
      name: "Seoul Train", description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.", price: 0
    },
    {
      name: "Kimchi Krunch", description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.", price: 0
    },
    {
      name: "Southwest", description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.", price: 0
    },
    {
      name: "Fireball", description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.", price: 0
    },
    {
      name: "Herbivore", description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.", price: 0
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
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Purple Rice",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Noodles",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Salad",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
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
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Purple Rice",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
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
          price: 1.99,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Chicken",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Spicy Pork",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Tofu",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
      ],
    },
    {
      type: "extraProteins",
      label: "Would you like to add extra protein?",
      cartLabel: "Double Proteins",
      max: Infinity,
      choices: [
        {
          name: "Beef",
          price: 2.99,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Chicken",
          price: 2.99,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Spicy Pork",
          price: 2.99,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Tofu",
          price: 2.99,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
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
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Carrots",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Kimchi",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Kale",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Cucumbers",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Korean Radish",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Bean Sprouts",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
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
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Creamy Sriracha",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Ginger-Carrot",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Cilantro-Lime Ranch",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
      ],
    },
    {
      type: "toppings",
      label: "Pick your toppings",
      cartLabel: "Toppings",
      max: Infinity,
      choices: [
        {
          name: "Crispy Garlic",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Cilantro",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Sesame Oil",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Scallions",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Sesame Seeds",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Fire Powder",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
      ],
    },
    {
      type: "korean feast toppings",
      label: "Pick your toppings",
      cartLabel: "Toppings",
      max: Infinity,
      choices: [
        {
          name: "Crispy Garlic",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Cilantro",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Scallions",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Sesame Seeds",
          price: 0,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
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
          price: 1.99,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
        {
          name: "Avocado",
          price: 1.59,
          selected: false,
          imageUrl: "http://placekitten.com/200/200",
        },
      ],
    },
  ],
  getOption(type) {
    return this.options.find((option) => option.type === type);
  },
};

export default menuData;
