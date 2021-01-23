import { createHelpers } from "vuex-map-fields";

const { getOrderField, updateOrderField } = createHelpers({
  getterType: "getOrderField",
  mutationType: "updateOrderField",
});

const state = {
  name: null,
  email: null,
  phone: null,
  location: null,
  time: null,
  curbside: false,
  tip: null,
  notes: null,
  orderTotal: null,
  orderTip: null,
  orderTax: null,
  orderDiscount: null,
};

const getters = {
  getOrderField,
};

const mutations = {
  updateOrderField,
};

export default {
  state,
  getters,
  mutations,
};
