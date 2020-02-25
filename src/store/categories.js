export default {
  state: {
    categories: [],
  },
  mutations: {
    addCategorie(state, categorie) {
      state.categories.push(categorie)
    },
  },
  actions: {
    async fetchCategories({ commit, getters }) {
      const userId = getters.userInfo.id
      const response = await fetch(
        `https://vue-crm-e390f.firebaseio.com/users/${userId}/categories.json`
      )

      const data = await response.json()
      if (!data) return

      Object.values(data).forEach(cat => {
        commit('addCategorie', cat)
      })
    },
    async postNewCategorie({ getters }, categorie) {
      const userId = getters.userInfo.id
      
      return await fetch(`https://vue-crm-e390f.firebaseio.com/users/${userId}/categories.json`, {
        method: 'POST',
        body: JSON.stringify(categorie),
      })
    },
  },
  getters: {
    categories: state => state.categories,
  },
}
