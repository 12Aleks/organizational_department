import Vue from 'vue'
import Vuex from 'vuex'
import registration from "./registration"
import error from "./error"
import updateProfile from "./updateProfile";
import profile from './profile'
import dataUsers from './dataUsers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    registration, error, updateProfile, profile, dataUsers
  }
})
