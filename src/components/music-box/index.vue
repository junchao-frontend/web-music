// 点击单曲之后的页面
<template>
  <div class='music-container' :style="musicshow? {backgroundColor:'white'} : {backgroundColor:'rgba(255, 255, 255,.8)'}">
    <div><slot></slot></div>
    <div class="wrap" :class="musicshow? '': 'wrap-coll'">
      <div v-show="getisShowlyrics" class="header" :class="musicshow? '': 'header-coll'">
        <div class="music-title">{{musicName}}</div>
        <div class="music-creat">{{musicCreator}}</div>
      </div>
      <div v-show="getisShowlyrics" class="music-logo" :class="musicshow? '': 'music-logo-coll'">
        <div @click="enlargeBox()" class="image-wrap" :class="musicshow? '': 'image-wrap-coll'" >
          <van-image
          :style="playStatus? '' : {animation: 'unset'}"
          class="vanImge"
          :class="musicshow? '': 'vanImge-coll'"
          round
          :src="musicBgi "
          />
        </div>
      </div>
      <div v-show="getisShowlyrics" class="changji" :class="musicshow? '': 'changji-coll'">
        <img
        class="changji-img"
        :class="playStatus ? 'changji-run' : ''"
        src="./changzhen.png">
      </div>
      <div v-show="musicshow" class="audio" :class="musicshow? 'audio-coll': ''" >
        <!-- <van-progress inactive :percentage="50" /> -->
        <div v-show="getisShowlyrics" class="audio-slider">
          <van-slider @change="testtest" :min="0" :max="maxMusic" v-model="value" active-color="#ee0a24">
            <template #button>
              <div class="custom-button">{{ value }}</div>
            </template>
          </van-slider>
        </div>
        <div v-show="getisShowlyrics" class="audio-item">
          <div class="love-music">
          <!-- <van-icon name="like-o" /> -->
          </div>
          <div @click="FrontMusic()" class="front-music">
            <i class="iconfont icon-shangyiqu"></i>
          </div>
          <div  @click="playMusic()" class="play-suspend">
            <i :class="playStatus ? 'iconfont icon-zanting' : 'iconfont icon-bofang' "></i>
          </div>
          <div @click="nextMusic()" class="next-music">
            <i class="iconfont icon-xiayiqu"></i>
          </div>
       </div>
       <audio @timeupdate="audioTime" :src="musicUrl" :autoplay="true" :loop="true" ref="audio">
        Your browser does not support the audio element.
      </audio>
      </div>
      <div @click="showlyrics" v-show="!getisShowlyrics" class="music-lyric">
        <ul class="music-lyric-ul" ref="lyricUL">
          <li
          v-for="(item, i) in lyricsObjArr"
          :style="{
          color: lyricIndex === i ? '#fffef9' : '#74787c',
          fontSize: lyricIndex === i ? '16px' : '15px'
          }"
          :key="item.uid"
          :data-index='i'
          ref="lyric"
          >{{item.text}}</li>
        </ul>
      </div>
      <div class="music-operation" :class="musicshow ?'music-operation-coll': '' ">
        <div class="music-operation-name">{{musicName }}-</div>
        <div class="music-operation-creat">{{musicCreator}}</div>
        <div @click="playMusic()" class="music-operation-icon">
          <i :class="playStatus ? 'iconfont icon-zanting' : 'iconfont icon-bofang' "></i>
          </div>
      </div>
    </div>
      <div class="overlay" :class="musicshow ? '' : 'closemusic'" :style="test "></div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { getMusicUrl, getMusiclyric } from '@/api/music.js'
export default {
  props: {
    musicshow: {
      type: Boolean,
      require: true
    }
  },
  components: {},
  data () {
    return {
      musicUrl: '',
      value: 0,
      openMusic: true,
      musicData: '', // 音乐数据
      playStatus: true, // 播放状态
      musicName: '', // 歌曲名字
      musicCreator: '', // 作者
      musicBgi: '', // 音乐背景url
      lyricsObjArr: [], // 存放歌词文本和时间的数组
      currentTime: '', // 歌曲当前时间
      lyricIndex: '', // 歌词当前index
      isShowlyrics: true, // 是否不展示歌词
      maxMusic: '' // 音乐总时长
    }
  },
  computed: {
    test () {
      return ' backgroundImage: url(' + this.musicBgi + ') '
    },
    ...mapState(
      {
        musicItem: state => state.musicModule.musicItem,
        songIndex: state => state.musicModule.songIndex,
        songsArr: state => state.musicModule.songsArr
      }
    ),
    ...mapGetters({
      getSongindex: 'musicModule/getSongindex',
      getisShowlyrics: 'musicModule/getisShowlyrics'
    })
  },
  created () {},
  mounted () {
    this.initMusicData(this.getSongindex)
    this.getSongUrl(this.getSongindex)
  },
  methods: {
    testtest (e) {
      // console.log(e)
      this.$refs.audio.currentTime = e
    },
    initMusicData (currentIndex) {
      // console.log(currentIndex, 'ys')
      // this.currentId = this.songIndex // 用currentId 接受 当前歌曲index
      this.playStatus = true
      this.musicData = this.songsArr[currentIndex] // 用musicData接受vuex中相对于缩印的数据
      this.musicName = this.musicData.name
      this.musicCreator = this.musicData.ar[0].name
      this.musicBgi = this.musicData.al.picUrl
    },
    enlargeBox () {
      if (this.musicshow === false) {
        this.$store.commit('statusModule/handlemusicshow')
      } else if (this.musicshow === true) {
        this.showlyrics()
      }
      // this.$store.commit('musicModule/changeIsShowlyrics')
    },
    // 是否展示歌词
    showlyrics () {
      // console.log(11)
      if (this.getisShowlyrics === true) {
        this.$store.commit('musicModule/Showlyrics')
      } else {
        this.$store.commit('musicModule/notShowlyrics')
      }
      // this.isShowlyrics = !this.isShowlyrics
    },
    async getSongUrl (currentIndex) {
      var songid = this.songsArr[currentIndex].id
      // console.log(songid, 'songid')
      var params = {
        id: songid
      }
      const { data } = await getMusicUrl(params)
      // console.log(data, '11')
      this.musicUrl = data.data[0].url
      const musicInfo = await getMusiclyric(params) // 获取歌词
      // console.log(musicInfo, 'musicInfo')
      var lyricdata = musicInfo.data.lrc.lyric.split('\n') // 用split先把歌词按换行符分开
      // 把空的数据过滤出去
      var lyricdata1 = lyricdata.filter((item) => {
        return item !== ''
      })
      var currentMusicData = []
      lyricdata1.forEach(i => {
        // console.log(item, 'item')
        var obj = {}
        // var musictext = i.substr(11, i.length)
        var musictext = i.split(']', i.length)[1]
        var musictime = i.split('[')[1].split(']')[0]
        // var musictime2 = musictime1.split(']')[0]
        // console.log(musictime2)
        var ttime = musictime.split(':')[0] * 60 + Math.round(musictime.split(':')[1])
        // var ttime = musictime2.split(':')[0] || '' * 60 + Math.round(musictime2.split(':')[1] || '')
        obj.text = musictext
        obj.time = ttime
        currentMusicData.push(obj)
      })
      // console.log(currentMusicData, 'currentMusicData')
      this.lyricsObjArr = currentMusicData
    },
    // audio当前时间
    audioTime (e) {
      this.currentTime = Math.round(e.target.currentTime)
      this.value = this.currentTime
      // console.log(e)
      this.maxMusic = Math.round(e.target.duration)
      this.scrollMusic()
    },
    // 歌词滚动
    scrollMusic () {
      for (let i = 0; i < this.lyricsObjArr.length; i++) {
        if (this.currentTime > (parseInt(this.lyricsObjArr[i].time))) {
          const index = this.$refs.lyric[i].dataset.index
          if (i === parseInt(index)) {
            this.lyricIndex = i
            this.$refs.lyricUL.style.transform = `translateY(${170 - (15 * (i + 1))}px)`
            // this.$refs.lyricUL.style.transform = 'translateY(20px)'
            this.$refs.lyricUL.style.transition = 'transform 1s ease-out'
          }
        }
      }
    },
    // 播放歌曲
    playMusic () {
      if (this.playStatus) {
        this.playStatus = false
        this.$refs.audio.pause()
        // console.log(this.$refs.audio)
      } else {
        this.playStatus = true
        this.$refs.audio.play()
      }
    },
    // 上一曲
    FrontMusic () {
      if (this.getSongindex === 0) {
        this.$toast.success('登录成功')
      } else {
        var musicId = this.songsArr[this.getSongindex - 1].id
        var params = {
          id: musicId
        }
        getMusicUrl(params).then(res => {
        // console.log(res, 'res')
          this.musicUrl = res.data.data[0].url
          this.musicBgi = this.songsArr[this.getSongindex - 1].al.picUrl
          this.musicName = this.songsArr[this.getSongindex - 1].name
          this.musicCreator = this.songsArr[this.getSongindex - 1].ar[0].name
          this.$store.state.musicModule.songIndex -= 1
        })
      }
    },
    // 下一曲
    nextMusic () {
      var musicId = this.songsArr[this.getSongindex + 1].id
      var params = {
        id: musicId
      }
      getMusicUrl(params).then(res => {
        // console.log(res, 'res')
        this.musicUrl = res.data.data[0].url
        this.musicBgi = this.songsArr[this.getSongindex + 1].al.picUrl
        this.musicName = this.songsArr[this.getSongindex + 1].name
        this.musicCreator = this.songsArr[this.getSongindex + 1].ar[0].name
        this.$store.state.musicModule.songIndex += 1
      })
    }
  },
  watch: {
    // 监听歌曲的index
    getSongindex: {
      handler () {
        // console.log(this.getSongindex)
        this.initMusicData(this.getSongindex)
        this.getSongUrl(this.getSongindex)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin transitions {

  transition:  all 0.5s ease;
}
@keyframes change {
  0%{
    transform: rotate(0deg); // 初始状态
  }
  100%{
    transform: rotate(360deg);
  }
}
.music-container{
  height: 100vh;
  // background-color: white;
  z-index: 2220;
  .wrap{
    @include transitions;
    overflow: hidden;
  }
  .header{
    float: left;
    width: 100%;
    margin-top:30px;
    &-coll{
      display: none;
    }
  }
  .changji{
    position: fixed;
    top: 15%;
    left: 50%;
    margin-left: -25px;
    // border: 1px solid red;
    // background: url('./changzhen.png');
    // width: 50px;
    // height: 50px;
    // background-color: rgb(255, 255, 255);
    opacity: 1;
    transition: width 0s  ease 0.5s;
    transition: opacity 0s ease 0.5s;

    &-img{
      width: 150px;
      height: 150px;
      transition: transform 0.5s ease;
      -webkit-transform-origin:18px 18px;
    }
    &-run{
      // transform-origin:0px,0px ;
      // transform-origin:18px,18px ;
      // -moz-transform-origin: 18px 18px;
      // -o-transform-origin:18px 18px;
      transform:rotate(20deg);
      -ms-transform:rotate(20deg); /* IE 9 */
      -moz-transform:rotate(20deg); /* Firefox */
      -webkit-transform:rotate(20deg); /* Safari 和 Chrome */
      -o-transform:rotate(20deg); /* Opera */
    }
    &-coll{
      height: 0;
      opacity: 0;
      transition: opacity 0s ease;
    }
  }
  .music-lyric{
    overflow: hidden;
    height: 80%;
    width: 280px;
    z-index: 9999;
    position: absolute;
    top: 32px;
    left: 13%;
    &-ul{
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
    }
  }
  .music-operation{
    overflow: hidden;
    margin-left: 65px;
    height: 40px;
    width: 320px;
    // background-color: violet;
    transition: opacity 0s ease-in 0.4s;
    opacity: 1;
    display: flex;
    // float: left;
    &-coll{
      opacity: 0;
    }
    &-name{
      text-overflow: ellipsis;
      flex: 1;
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 14px;
    }
    &-creat{
      flex: 1;
      margin-left: 3px;
      display: flex;
      align-items: center;
      font-size: 8px;
    }
    &-icon{
      // flex: 1;
      flex-basis: 50px;
      margin-left: 50px;
      display: flex;
      align-items: center;
      .iconfont{
        font-size: 23px;
        color: #131217;
      }
    }
  }
  .music-logo{
    margin-top: 90px;
    transition: all 0.5s ease-in;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    background-image: cover;
    background-position: center;
    .image-wrap{
      transition: all 0.5s ease-in;
      background-image: url('./music.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 290px;
      height: 290px;
      display: flex;
      align-items: center;
      justify-content: center;
      &-coll{
        height: 35px;
        width: 35px;
      }
    }
    &-coll{
      height: 100%;
      width: 50px;
      margin: 0;
      // order: 1;
      // width:auto;
      // height: 100%;
    }
    .vanImge{
      animation: change 8.2s linear infinite;
      transition: all 0.6s ease-out;
      width: 155px;
      height: 155px;
      &-coll{
        width: 30px;
        height: 30px;
      }
    }
  }
  .music-title{
    @include transitions;
    color: white;
    width: 100%;
    text-align: center;
    font-size: 15px;
  }
  .music-creat{
    @include transitions;
    color: white;
    margin-top: 5px;
    text-align: center;
    font-size: 10px;
  }
  /deep/ .van-slider__bar{
    background-color: #74787c !important;
  }
  .audio{
    margin: 0 auto;
    margin-top: 40px;
    float: left;
    width: 100%;
    z-index: 9999 !important;
    .audio-slider{
      margin: 0 auto;
      width: 300px;
      .custom-button {
        width: 20px;
        color: #fff;
        font-size: 1px;
        // line-height: 18px;
        text-align: center;
        background-color: #1b315e;
        border-radius: 10px;
      }
    }
    .audio-item{
      box-sizing: border-box;
      margin: 0 auto;
      width: 100px;
      margin-top: 30px;
      display: flex;
      justify-content:center;
      align-items: center;
      .front-music{
        .iconfont{
          font-size: 30px;
        }
        color: #1b315e;
        cursor: pointer;
        // color: white;
        // font-size: 26px;
      }
      .play-suspend{
        margin: 0 25px;
        cursor: pointer;
        color: #1b315e;
        .iconfont{
          font-size: 40px;
        }
      }
      .next-music{
        cursor: pointer;
        // margin-left: 20px;
        color: #1b315e;
        .iconfont{
          font-size: 30px;
        }
      }
    }
  }
  .overlay{
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: opacity 1s ease;
    // -webkit-filter:blur(10px);
    // -moz-filter:blur(10px);
    // -o-filter:blur(10px);
    // -ms-filter:blur(10px);
    filter:blur(15px);
    opacity: 0.9;
    // background-image: url('http://p4.music.126.net/BMPeBg8b6wRUofmMcfQ--g==/109951165029361219.jpg');
    background-position: center;
    background-size: cover;
    background-blend-mode: darken;
    width: 100vw;
    height: 120vh;
  }
  .closemusic{
    opacity: 0;
  }
  /deep/ .van-toast{
    z-index: 9999 !important;
  }
  /deep/ .van-toast .van-toast--middle .van-toast--success{
    z-index: 9999 !important;
  }
}
</style>
