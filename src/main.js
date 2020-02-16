import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import showMessage from '@/plugins/showMessage'

import './registerServiceWorker'
import 'materialize-css/dist/css/materialize.css'
import './index.css'

Vue.config.productionTip = false
Vue.use(showMessage)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
