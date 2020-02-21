export default {
  state: {
    userName: null,
    userId: null,
    userBill: null,
  },
  mutations: {
    setUser(state, { name, id, bill }) {
      if (name !== undefined) state.userName = name
      if (id !== undefined) state.userId = id
      if (bill !== undefined) state.userBill = bill
    },
  },
  actions: {
    async login(ctx, formData) {
      try {
        const key = process.env.VUE_APP_SIGNIN

        return await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
          {
            method: 'POST',
            body: JSON.stringify(formData),
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
    async register(ctx, { email, password }) {
      const authData = {
        email,
        password,
        returnSecureToken: true,
      }

      try {
        const key = process.env.VUE_APP_SIGNIN

        return await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`, {
          method: 'POST',
          body: JSON.stringify(authData),
        })
      } catch (error) {
        console.error(error)
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      localStorage.removeItem('userBill')
      localStorage.removeItem('userId')

      commit('setUser', {
        name: null,
        id: null,
        bill: null,
      })
    },
  },
  getters: {
    userInfo({ userName, userId, userBill }) {
      return {
        name: userName,
        id: userId,
        bill: userBill,
      }
    },
  },
}
