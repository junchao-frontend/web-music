import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    avatar: '',
    token: '',
    cookie: '',
    name: '',
    userId: ''
  },
  mutations: {
    SET_AVATAR (state, avatar) {
      state.avatar = avatar
    },
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_COOKIE (state, cookie) {
      state.cookie = cookie
    },
    SET_NAME (state, name) {
      state.name = name
    },
    SET_ID (state, userId) {
      state.name = userId
    }
  },
  getters: {
    GET_TOKEN: state => state.token,
    GET_NAME: state => state.name,
    GET_AVATAR: state => state.avatar
  },
  actions: {
  },
  modules: {
  }
})
