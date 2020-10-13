import Vue from 'vue'
import Vuex from 'vuex'
import registration from "./registration"
import error from "./error"
import updateUserData from "./updateUserData";
import  info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    registration, error, updateUserData, info
  }
})
