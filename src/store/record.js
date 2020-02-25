export default {
  state: {
    records: []
  },
  mutations: {
    addRecord(state, record) {
      state.records.push(record)
    },
  },
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
    async fetchRecords({ getters, commit }) {
      const userId = getters.userInfo.id

      const response = await fetch(
        `https://vue-crm-e390f.firebaseio.com/users/${userId}/records.json`
      )
      
      const data = await response.json()

      const records =  Object.keys(data).map(id => ({
        ...data[id],
        id,
      }))

      records.forEach(record => {
        commit('addRecord', record)
      })

      return records
    },
    async fetchRecordById({ getters }, id) {
      const userId = getters.userInfo.id

      const response = await fetch(
        `https://vue-crm-e390f.firebaseio.com/users/${userId}/records/${id}.json`
      )
      
      return await response.json()

      // return Object.keys(records).map(id => ({
      //   ...records[id],
      //   id,
      // }))
    },
  },
  getters: {
    records: state => state.records,
  }
}
