import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'

import Loader from '@/components/Loader'

Vue.config.productionTip = false
Vue.component('Loader', Loader)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
