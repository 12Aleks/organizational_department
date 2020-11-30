import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import 'materialize-css/dist/js/materialize.min'
import message from './message/message.info'
import Loader from '@/components/Loader'
import Information from "./components/ather/Information";
import Tooltipe from './directives/tooltip.directive'

import dateFilter from "./filters/dateFilter";
import departments from "./filters/departments";
import sections from "./filters/sections";
import department from "./filters/department";

export const styleTable = new Vue();

Vue.config.productionTip = false
Vue.component('Loader', Loader);
Vue.directive('tooltipe', Tooltipe)
Vue.component('Information', Information)

Vue.use(Vuelidate)
Vue.use(message)
Vue.use(VueMeta)

Vue.filter( 'dateFilter', dateFilter)
Vue.filter( 'departmentsFilter', departments)
Vue.filter( 'sectionsFilter', sections)
Vue.filter( 'departmentFilter', department)


/*firebase*/
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


firebase.initializeApp({
  apiKey: "AIzaSyB1ssHVP4ZHvxAI7oABIjuI7mYz7jphxgg",
  authDomain: "departments-1c007.firebaseapp.com",
  databaseURL: "https://departments-1c007.firebaseio.com",
  projectId: "departments-1c007",
  storageBucket: "departments-1c007.appspot.com",
  messagingSenderId: "523183450453",
  appId: "1:523183450453:web:1ba0a3608b04dbb1d167dc",
  measurementId: "G-MWGML83R2H"
});

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
