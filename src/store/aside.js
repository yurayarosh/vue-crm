export default {
  state: {
    isOpen: true,
  },
  mutations: {
    toggleAside(state) {
      state.isOpen = !state.isOpen
    },
  },
}
