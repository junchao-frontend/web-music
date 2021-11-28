// 点击单曲之后的页面
<template>
  <div class='music-container'>
      <div class="music-title">{{musicName}}</div>
      <div class="audio">
      <audio :src="musicUrl" controls="controls">
        Your browser does not support the audio element.
      </audio>
      </div>
  </div>
</template>

<script>
import { getMusicUrl } from '@/api/music.js'
export default {
  props: {
    musicdata: {
      type: Object,
      require: true
    }
  },
  components: {},
  data () {
    return {
      musicUrl: '',
      openMusic: true,
      musicName: ''
    }
  },
  computed: {},
  created () {},
  mounted () {
    // console.log(this.musicdata, '111')
    this.getSongUrl()
  },
  methods: {
    async getSongUrl () {
      this.musicName = this.musicdata.name
      var songid = this.musicdata.id
      var params = {
        id: songid
      }
      const { data } = await getMusicUrl(params)
      // console.log(data)
      this.musicUrl = data.data[0].url
    },
    downBox () {
      this.openMusic = false
    }
  },
  watch: {
    musicdata: {
      handler (newvalue, oldvalue) {
        // console.log(newvalue, 'newvalue')
        this.musicdata = newvalue
        this.musicName = newvalue.name
        this.getSongUrl()
      },
      deep: true,
      immediate: false
    }
  }
}
</script>

<style lang="scss" scoped>
.music-container{
  .music-title{
    margin-top: 15px;
    text-align: center;
    font-size: 15px;
  }
  .audio{
    position: fixed;
    left: 10%;
    top: 85%;
  }
}
</style>
