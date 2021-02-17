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
  receiptUrl: null,
  paid: false,
};

const getters = {
  getOrderField,
  orderIsPaid() {
    return state.paid;
  },
};

const mutations = {
  updateOrderField,
  updateReceiptUrl(state, url) {
    state.receiptUrl = url;
  },
  updateOrderPaid(state, status) {
    state.paid = status;
  },
};

export default {
  state,
  getters,
  mutations,
};
