const drinkOptions = {
  type: "drinks",
  choices: [
    {
      name: "Kale Apple",
      description: "fresh pressed apples and kale.",
      price: 1.99,
      qty: 0,
      imageUrl: require("../assets/images/drinks/kale-apple.jpg"),
    },
    {
      name: "Sac-Sac Grape",
      description: "nostalgic Korean juice beverage with real fruit.",
      price: 1.99,
      qty: 0,
      imageUrl: require("../assets/images/drinks/sac-sac.jpg"),
    },

    {
      name: "Bubly",
      description:
        "crisp, sparkling water with natural fruit flavors. zero calories, zero sweeteners, all smiles.",
      price: 0.99,
      qty: 0,
      imageUrl: require("../assets/images/drinks/bubly.jpg"),
    },
    {
      name: "Yuzu Lime",
      description: "yuzu + lime juice, sweetened with a touch of honey.",
      price: 0.99,
      qty: 0,
      imageUrl: require("../assets/images/drinks/yuzu-lime.jpg"),
    },
  ],
};

export default drinkOptions;
