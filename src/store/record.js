export default {
  state: {},
  mutations: {},
  actions: {
    async postRecord({ getters }, record) {
      const userId = getters.userInfo.id

      await fetch(
        `https://vue-crm-e390f.firebaseio.com/users/${userId}/records.json`,
        {
          method: 'POST',
          body: JSON.stringify(record),
        }
      )
    },
    async fetchRecords({ getters }) {
      const userId = getters.userInfo.id

      const response = await fetch(
        `https://vue-crm-e390f.firebaseio.com/users/${userId}/records.json`
      )

      return await response.json()
    },
  },
}
