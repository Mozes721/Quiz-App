import { createStore } from 'vuex'

export default createStore({
  state: {
    data: ''

  },
  getters: {
  },
  mutations: {
    getData(state, newData) {
      state.data += newData;
    },
  },
  actions: {
  },
  modules: {
  }
})
