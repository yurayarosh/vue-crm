import Vue from 'vue'
import Vuex from 'vuex'
import aside from './aside'
import auth from './auth'
import categories from './categories'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async getUserInfo({ getters }) {
      const userId = getters.userInfo.id

      const response = await fetch(`https://vue-crm-e390f.firebaseio.com/users/${userId}/info.json`)

      const data = await response.json()

      return Object.values(data)[0]
    },
    async getCurrency() {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/UAH')
      return await response.json()
    },
    async updateUserInfo({ getters }, updData) {
      const userId = getters.userInfo.id

      const response = await fetch(`https://vue-crm-e390f.firebaseio.com/users/${userId}/info.json`)
      const data = await response.json()

      const newUserData = { ...Object.values(data)[0], ...updData }

      await fetch(`https://vue-crm-e390f.firebaseio.com/users/${userId}/info.json`, {
        method: 'DELETE',
      })

      await fetch(`https://vue-crm-e390f.firebaseio.com/users/${userId}/info.json`, {
        method: 'POST',
        body: JSON.stringify(newUserData),
      })
    },
  },
  modules: {
    aside,
    auth,
    categories,
    record,
  },
})
