const state = {
  entreeRoute: "entree-categories",
};

const getters = {};

const mutations = {
  updateEntreeRoute(state, route) {
    state.entreeRoute = route;
  },
  backToEntrees() {
    state.entreeRoute = "entree-categories";
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
