import Vue from 'vue'
import Vuex from 'vuex'
import aside from './aside'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    aside,
    auth,
  },
})
