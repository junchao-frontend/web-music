// 音乐数据相关模块
const musicModule = {
  namespaced: true,
  state: {
    musicItem: '', // 每条音乐的数据
    songsArr: [], // 每个歌单所有歌曲的ID
    songIndex: '' // 每个歌曲的index
  },
  mutations: {
    // 存入一条音乐的数据
    setmusicItem (state, musicItem) {
      state.musicItem = musicItem
    },
    // 存入一个歌单所有歌曲id
    setSongs (state, songsArr) {
      state.songsArr = songsArr
    },
    setSongindex (state, songIndex) {
      state.songIndex = songIndex
    }
  },
  getters: {
    getSongindex: (state) => state.songIndex
  }
}

export default musicModule
