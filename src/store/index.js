import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    aside: {
      isOpen: true
    }
  },
  mutations: {
    toggleAside(state) {
      state.aside.isOpen = !state.aside.isOpen      
    }
  },
  actions: {},
  modules: {}
});
