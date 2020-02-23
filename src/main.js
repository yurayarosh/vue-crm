import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import showMessage from '@/plugins/showMessage'
import VPreloader from '@/components/VPreloader'
import currencyFilter from '@/filters/currency.filter'
import dateFilter from '@/filters/date.filter'
import tooltipDirective from '@/directives/tooltip.directive'

import './registerServiceWorker'
import 'materialize-css/dist/css/materialize.css'
import './index.css'


Vue.config.productionTip = false
Vue.use(showMessage)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('v-preloader', VPreloader)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
