// 用户相关数据模块
const userModule = {
  namespaced: true,
  state: {
    avatar: '', // 用户头像
    cookie: '', // 登录的cookie
    name: '', // 用户名称
    userId: '' // 用户id
  },
  mutations: {
    SET_AVATAR (state, avatar) {
      state.avatar = avatar
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
    GET_NAME: state => state.name,
    GET_AVATAR: state => state.avatar
  }
}

export default userModule
