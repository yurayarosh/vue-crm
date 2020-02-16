export default {
  actions: {
    async login(ctx, formData) {
      try {
        await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBGk37ByywwHGHmhYy7oOvWtnT5lrtRyI', {
          method: 'POST',
          body: JSON.stringify(formData)
        })
      } catch (error) {
        // console.error(error)
      }
    },
  },
}
