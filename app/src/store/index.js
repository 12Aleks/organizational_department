import Vue from 'vue'
import Vuex from 'vuex'
import registration from "./registration"
import error from "./error"
import profile from './profile'
import dataUsers from './dataUsers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    registration, error, profile, dataUsers
  }
})
