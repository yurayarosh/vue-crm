export default {
  state: {
    userName: null,
    userId: null,
    userBill: null,
  },
  mutations: {
    setUser(state, { name, id, bill }) {
      if (name) state.userName = name
      if (id) state.userId = id
      if (bill) state.userBill = bill
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
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      localStorage.removeItem('userBill')
      localStorage.removeItem('userId')
    },
  },
}
