<template>
  <div class="music-container">
      <audio :src="musicUrl" controls="controls">
        Your browser does not support the audio element.
        </audio>
        <div>
        <van-button type="danger">王军潮最帅</van-button>
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
      musicUrl: ''
    }
  },
  computed: {},
  created () {},
  mounted () {
    console.log(this.musicdata)
    this.getSongUrl()
  },
  methods: {
    async getSongUrl () {
      var songid = this.musicdata.id
      var params = {
        id: songid
      }
      const { data } = await getMusicUrl(params)
      console.log(data)
      this.musicUrl = data.data[0].url
    }
  }
}
</script>

<style scoped>
.music-container{
    padding-top: 50px;
}
</style>
