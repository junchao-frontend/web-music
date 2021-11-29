import Vue from 'vue'
import Vuex from 'vuex'
// import dialog from './module/dialog'

Vue.use(Vuex)

export default new Vuex.Store({
  // modules: {
  //   dialog: dialog
  // },
  state: {
    avatar: '',
    token: '',
    cookie: '',
    name: '',
    userId: '',
    LOADING: false,
    islayoutShow: true, // 是否展示导航栏
    musicshow: false,
    musicBoxShow: false,
    musicItem: {},
    test: false
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
    },
    showLoading (state) {
      state.LOADING = true
    },
    hideLoading (state) {
      state.LOADING = false
    },
    showtest (state) {
      state.test = true
    },
    hidetest (state) {
      state.test = false
    },
    hidemusicshow (state) {
      state.musicshow = false
    },
    handlemusicshow (state) {
      state.musicshow = true
    },
    handlemusicBoxShow (state) {
      // console.log(val, 'val')
      state.musicBoxShow = true
    },
    handlemusicItem (state, val) {
      state.musicItem = val
    }
  },
  getters: {
    GET_TOKEN: state => state.token,
    GET_NAME: state => state.name,
    GET_AVATAR: state => state.avatar,
    GET_LAYOUTSHOW: state => state.islayoutShow,
    getmusicshow: (state) => state.musicshow,
    getmusicBoxShow: (state) => state.musicBoxShow,
    getmusicItem: (state) => state.musicItem
  },
  actions: {
  }
})
