const state = {
  menu: null,
};

const getters = {};

const mutations = {
  updateMenuData(state, data) {
    state.menu = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
