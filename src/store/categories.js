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
    async fetchCategories({ commit }, { id }) {
      const response = await fetch(
        `https://vue-crm-e390f.firebaseio.com/users/${id}/categories.json`
      )

      const data = await response.json()
      if (!data) return

      Object.values(data).forEach(cat => {
        commit('addCategorie', cat)
      })
    },
    async postNewCategorie(ctx, { categorie, userId }) {
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
