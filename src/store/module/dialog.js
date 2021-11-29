var module = {
  state: {
    musicshow: false,
    musicBoxShow: false,
    musicItem: {}
  },
  mutations: {
    handlemusicshow (state, val) {
      state.musicshow = val
    },
    handlemusicBoxShow (state, val) {
      console.log(val, 'val')
      state.musicBoxShow = val
    },
    handlemusicItem (state, val) {
      state.musicItem = val
    }
  },
  getters: {
    getmusicshow: (state) => state.musicshow,
    getmusicBoxShow: (state) => state.musicBoxShow,
    getmusicItem: (state) => state.musicItem
  }
}

export default module
