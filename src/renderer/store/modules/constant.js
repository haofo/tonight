const state = {
  loading: false,
};

const mutations = {
  SET_LOADING(state, value) {
    state.loading = value
  }
};

const actions = {
  activeLoading({ commit }) {
    commit('SET_LOADING', true)
  },
  cancelLoading({ commit }) {
    commit('SET_LOADING', false)
  }
};

export default {
  state,
  mutations,
  actions,
};
