import Vue from 'vue'
import Vuex from 'vuex'
import aside from './aside'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async getCurrency() {
      // const key = process.env.VUE_APP_FIXER_KEY

      const response = await fetch(
        'https://api.exchangeratesapi.io/latest'
        // `http://data.fixer.io/api/latest?access_key=${key}&symbols=UAH,USD,EUR`
      )
      return await response.json()
    },
  },
  modules: {
    aside,
    auth,
  },
})
