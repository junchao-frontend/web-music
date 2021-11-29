<template>
  <div id="app">
    <Loading v-show="LOADING"></Loading>
      <musicBox
      v-show="musicBoxShow"
      :class="musicshow? '' : 'test2'"
      class="musci-box"
      :musicdata="musicItem"
      :musicshow="musicshow" >
      <van-icon class="btn" name="arrow-down" v-if="musicshow" @click="closeMusic()" />
      </musicBox>
    <router-view/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Loading from './components/loading'
import musicBox from './components/music-box/'
export default {
  data () {
    return {
      test: false
    }
  },
  computed: {
    ...mapState(['LOADING', 'musicBoxShow', 'musicshow', 'musicItem'])
  },
  methods: {
    closeMusic () {
      this.$store.commit('hidemusicshow')
      // console.log(this.$store.state.musicshow)
    },
    enlargeBox () {
      if (this.musicshow) {
        // console.log('歌词')
      } else {
        this.$store.commit('wjc')
      }
    }
  },
  // mounted () {
  //   console.log(this.$store, 'adsadsa')
  // },
  name: 'App',
  components: {
    Loading,
    musicBox
  }
}
</script>
<style lang="scss">
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.musci-box{
  transition: height 0.5s ease-in;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100% !important;
}
// .test1{
//   position: absolute;
//   bottom: 5px;
//   left: 0;
//   right: 0;
//   overflow: hidden;
//   height: 1.5rem !important;
// }
.van-icon-arrow-down{
  color: white;
}
.test2{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  height: 90px !important;
}
</style>
