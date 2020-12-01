import Vue from 'vue'
import Vuex from 'vuex'
import registration from "./registration"
import error from "./error"
import profile from './profile'
import dataUsers from './dataUsers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    departmentName: ''
  },
  getters:{
    processName(state){
      return state.departmentName
  }

  },
  mutations: {
    processName(state, payload){
      state.departmentName = payload
  }
  },
  actions: {
    processName({commit}, payload){
      commit('processName', payload)
  }
  },
  modules: {
    registration, error, profile, dataUsers
  }
})
