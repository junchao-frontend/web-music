// 动画状态相关数据模块
const statusModule = {
  namespaced: true,
  state: {
    LOADING: false, // 是否展示loading
    islayoutShow: true, // 是否展示导航栏
    musicshow: false, // 音乐播放器组件是否缩小到左下角
    musicBoxShow: false // 是否出现音乐播放器组件
  },
  mutations: {
    // 出现导航栏
    showLayout (state) {
      state.islayoutShow = true
    },
    // 隐藏导航栏
    hideLayout (state) {
      state.islayoutShow = false
    },
    // loading打开
    showLoading (state) {
      state.LOADING = true
    },
    // loading关闭
    hideLoading (state) {
      state.LOADING = false
    },
    // 缩小音乐播放器
    hidemusicshow (state) {
      state.musicshow = false
    },
    // 扩大音乐播放器
    handlemusicshow (state) {
      state.musicshow = true
    },
    // 打开音乐播放器
    handlemusic (state) {
      state.musicshow = true
      state.musicBoxShow = true
    }
  },
  getters: {
    GET_LAYOUTSHOW: state => state.islayoutShow,
    getmusicshow: (state) => state.musicshow,
    getmusicBoxShow: (state) => state.musicBoxShow
  }
}

export default statusModule
