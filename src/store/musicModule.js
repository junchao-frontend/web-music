// 音乐数据相关模块
const musicModule = {
  namespaced: true,
  state: {
    musicItem: '', // 每条音乐的数据
    songsArr: [], // 每个歌单所有歌曲的ID
    newsongsArr: [], // 新歌速递所有歌曲的ID
    songIndex: '', // 每个歌曲的index
    newsongIndex: '', // 新歌速递的index
    isShowlyrics: true // 是否不展示歌词
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
    // 存入新歌速递所有歌曲id
    setnewSongs (state, songsArr) {
      state.newsongsArr = songsArr
    },
    setSongindex (state, songIndex) {
      state.songIndex = songIndex
    },
    setnewSongindex (state, newsongIndex) {
      state.newsongIndex = newsongIndex
    },
    Showlyrics (state) {
      state.isShowlyrics = false
    },
    notShowlyrics (state) {
      state.isShowlyrics = true
    }
  },
  getters: {
    getSongindex: (state) => state.songIndex,
    getnewSongindex: (state) => state.newsongIndex,
    getisShowlyrics: (state) => state.isShowlyrics
  }
}

export default musicModule
