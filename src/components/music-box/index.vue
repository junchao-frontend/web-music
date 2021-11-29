// 点击单曲之后的页面
<template>
  <div class='music-container' :style="musicshow? {backgroundColor:'white'} : {backgroundColor:'rgba(255, 255, 255,.8)'}">
    <div><slot></slot></div>
    <div class="wrap" :class="musicshow? '': 'wrap-coll'">
      <div class="header" :class="musicshow? '': 'header-coll'">
        <div class="music-title">{{musicItem.name}}</div>
        <div class="music-creat">{{musicItem.ar[0].name}}</div>
      </div>
      <div class="music-logo" :class="musicshow? '': 'music-logo-coll'">
        <div @click="enlargeBox()" class="image-wrap" :class="musicshow? '': 'image-wrap-coll'" >
          <van-image
          class="vanImge"
          :class="musicshow? '': 'vanImge-coll'"
          round
          :src="musicItem.al.picUrl"
          />
        </div>
      </div>
      <div v-show="musicshow" class="audio" :class="musicshow? 'audio-coll': ''" >
        <!-- <van-progress inactive :percentage="50" /> -->
        <div class="audio-item">
          <div class="love-music">
          <!-- <van-icon name="like-o" /> -->
          </div>
          <div class="front-music">
            <i class="iconfont icon-shangyiqu"></i>
          </div>
          <div  @click="playMusic()" class="play-suspend">
            <i :class="playStatus ? 'iconfont icon-zanting' : 'iconfont icon-bofang' "></i>
          </div>
          <div class="next-music">
            <i class="iconfont icon-xiayiqu"></i>
          </div>
       </div>
       <audio :src="musicUrl" ref="audio">
        Your browser does not support the audio element.
      </audio>
      </div>
      <div class="music-operation" :class="musicshow ?'music-operation-coll': '' ">
        <div class="music-operation-name">{{musicItem.name}}-</div>
        <div class="music-operation-creat">{{musicItem.ar[0].name}}</div>
        <div @click="playMusic()" class="music-operation-icon">
          <i :class="playStatus ? 'iconfont icon-zanting' : 'iconfont icon-bofang' "></i>
          </div>
      </div>
    </div>
      <div class="overlay" :class="musicshow ? '' : 'closemusic'" :style="test"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getMusicUrl } from '@/api/music.js'
export default {
  props: {
    musicdata: {
      type: Object,
      require: true
    },
    musicshow: {
      type: Boolean,
      require: true
    }
  },
  components: {},
  data () {
    return {
      musicUrl: '',
      openMusic: true,
      musicName: '',
      musicCreator: '', // 歌曲作者
      musicImg: '', // 歌曲背景图
      playStatus: false // 播放状态
    }
  },
  computed: {
    ...mapState(['musicItem']),
    test () {
      return ' backgroundImage: url(' + this.musicItem.al.picUrl + ') '
    }
  },
  created () {},
  mounted () {
    this.getSongUrl()
    // console.log(this.musicItem, '-6456')
  },
  methods: {
    enlargeBox () {
      this.$store.commit('handlemusicshow')
      // console.log('wjc')
    },
    async getSongUrl () {
      // console.log(this.musicdata)
      if (!this.musicdata) return
      this.musicImg = ''
      this.musicCreator = ''
      this.musicName = ''
      var songid = this.musicItem.id || ''
      var params = {
        id: songid
      }
      const { data } = await getMusicUrl(params)
      // console.log(data, '------')
      this.musicUrl = data.data[0].url
    },
    downBox () {
      this.openMusic = false
    },
    // 播放歌曲
    playMusic () {
      if (this.playStatus) {
        this.playStatus = false
        this.$refs.audio.pause()
      } else {
        this.playStatus = true
        this.$refs.audio.play()
      }
    }
  },
  watch: {
    musicdata: {
      handler (newvalue, oldvalue) {
        this.musicdata = newvalue
        this.musicName = newvalue.name
        this.getSongUrl()
      },
      deep: true,
      immediate: false
    },
    musicshow: {
      handler (newvalue, oldvalue) {
        this.musicshow = newvalue
      },
      deep: true,
      immediate: false
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin transitions {

  transition:  all 0.5s ease;
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
      // float: left;
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 14px;
    }
    &-creat{
      margin-left: 3px;
      display: flex;
      align-items: center;
      font-size: 8px;
    }
    &-icon{
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
    margin-top: 100px;
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
      width: 300px;
      height: 300px;
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
  .audio{
    margin: 0 auto;
    margin-top: 70px;
    float: left;
    width: 100%;
    z-index: 9999 !important;
    .audio-item{
      box-sizing: border-box;
      margin: 0 auto;
      width: 100px;
      margin-top: 15px;
      display: flex;
      justify-content:center;
      .front-music{
        .iconfont{
          font-size: 23px;
        }
        color: whitesmoke;
        cursor: pointer;
        // color: white;
        // font-size: 26px;
      }
      .play-suspend{
        margin: 0 25px;
        cursor: pointer;
        color: whitesmoke;
        .iconfont{
          font-size: 40px;
        }
      }
      .next-music{
        cursor: pointer;
        // margin-left: 20px;
        color:whitesmoke;
        .iconfont{
          font-size: 23px;
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
    filter:blur(7px);
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
}
</style>
