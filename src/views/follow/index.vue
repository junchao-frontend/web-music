<template>
  <div class="container">
    <!-- <button @click="wjc">+++++</button> -->
    <audio class="audio" @timeupdate="audioTime" ref="audio" src="http://m8.music.126.net/20211201175805/d42213c2ebc136bc8b48713eec7e38e0/ymusic/565e/515b/535f/a4ee54d6e9f14c81cd60d5bcb6368fd8.mp3" controls="controls"></audio>
      <div  class="music-lyric">
        <ul ref="lyricUL">
          <li
          v-for="(item, i) in lyricsObjArr"
          :style="{
          color: lyricIndex === i ? '#3c3645' : '#375830',
          fontSize: lyricIndex === i ? '18px' : '15px',
          fontWeight: lyricIndex === i ? 'bold' : ''
          }"
          :key="item.uid"
          :data-index='i'
          ref="lyric"
          >{{item.text}}</li>
        </ul>
      </div>
  </div>
</template>

<script>
import { getMusiclyric } from '../../api/music.js'
export default {
  components: {},
  data () {
    return {
      lyric: '',
      currentTime: '',
      currentRow: '',
      lyricsObjArr: [],
      lyricIndex: ''
    }
  },
  computed: {
  },
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var params = {
        id: 1378945187
      }
      getMusiclyric(params).then(res => {
        var musicdata = []
        // eslint-disable-next-line no-unused-vars
        var lyricdata = res.data.lrc.lyric.split('\n')
        var sss = lyricdata.filter((item) => {
          return item !== ''
        })
        // console.log(sss)
        sss.forEach(i => {
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
          musicdata.push(obj)
        })
        this.lyricsObjArr = musicdata
        // console.log(this.lyric)
      })
    },
    test1 (e) {
      // console.log(Math.round(e.target.currentTime))
      this.currentTime = Math.round(e.target.currentTime)
      this.zj()
      // console.log(this.ys, 'ys')
    },
    zj () {
      for (let i = 0; i < this.lyricsObjArr.length; i++) {
        if (this.currentTime > (parseInt(this.lyricsObjArr[i].time))) {
          const index = this.$refs.lyric[i].dataset.index
          if (i === parseInt(index)) {
            this.lyricIndex = i
            this.$refs.lyricUL.style.transform = `translateY(${170 - (15 * (i + 1))}px)`
            this.$refs.lyricUL.style.transition = 'transform 1s ease-out'
          }
        }
      }
    }
  },
  watch: {
    ys () {
      this.lyric.forEach((item, index) => {
        if (this.ys === item.time) {
          this.currentRow = index
        }
      })
    }
  }
}
</script>

<style scoped>
/* .container{
  overflow: hidden;
  width: 100%;
  height: 80%;
} */
.music-lyric{
  z-index: 2;
  position: absolute;
  top: 50px;
  overflow: hidden;
  width: 100%;
  height: 80%;
  text-align: center;
  /* font-size: 15px; */
}
.audio{
  position: absolute;
  top: 20px;
  z-index: 8000 !important;
}
</style>
