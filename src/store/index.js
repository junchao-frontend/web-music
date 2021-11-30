import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './userModule'
import statusModule from './statusModule'
import musicModule from './musicModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    statusModule,
    musicModule
  },
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
  }
})
