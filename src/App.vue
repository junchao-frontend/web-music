<template>
  <div id="app">
    <Loading v-show="LOADING"></Loading>
      <!-- <musicBox
      v-if="musicBoxShow"
      :class="musicshow? '' : 'test2'"
      class="musci-box"
      :musicdata="musicItem"
      :musicshow="musicshow" >
      <van-icon class="btn" name="arrow-down" v-if="musicshow" @click="closeMusic()" />
      </musicBox> -->
    <router-view/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Loading from './components/loading'
// import musicBox from './components/music-box/'
export default {
  data () {
    return {
      test: false
    }
  },
  computed: {
    ...mapState(
      {
        LOADING: state => state.statusModule.LOADING
        // musicBoxShow: state => state.statusModule.musicBoxShow,
        // musicshow: state => state.statusModule.musicshow,
        // musicItem: 'musicItem'
      }
    )
  },
  mounted () {
  },
  name: 'App',
  components: {
    Loading
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
</style>
