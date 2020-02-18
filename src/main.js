import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import showMessage from '@/plugins/showMessage'
import VPreloader from '@/components/VPreloader'

import './registerServiceWorker'
import 'materialize-css/dist/css/materialize.css'
import './index.css'

Vue.config.productionTip = false
Vue.use(showMessage)
Vue.component('v-preloader', VPreloader)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
