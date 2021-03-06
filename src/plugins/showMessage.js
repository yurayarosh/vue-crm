import M from 'materialize-css'

export default {
  install(Vue) {
    Vue.prototype.$toastMessage = html => {
      M.toast({ html })
    }

    Vue.prototype.$toastError = html => {
      M.toast({ html: `[Ошибка]: ${html}` })
    }
  },
}
