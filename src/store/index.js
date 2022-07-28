import { createStore } from 'vuex'

export default createStore({
  state: {
    data: '',
    results: '',
  },

  getters: {
  },
  mutations: {
    getData(state, newData) {
      state.data = '';
      state.data += newData;
    },
    updateResults(state, score) {
      state.results = '';
      state.results += score;
    }
  },
  actions: {
  },
  modules: {
  }
})