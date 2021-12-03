<template>
  <div class="layout-container">
    <router-view />
    <musicBox
      v-if="musicBoxShow"
      :class="musicshow? '' : 'test2'"
      class="musci-box"
      :musicshow="musicshow" >
      <van-icon class="btn" name="arrow-down" v-if="musicshow" @click="closeMusic()" />
    </musicBox>
    <newMusic
      v-if="newmusicBoxShow"
      :class="newmusicshow? '' : 'test2'"
      class="musci-box"
      :musicshow="newmusicshow" >
      <van-icon class="btn" name="arrow-down" v-if="newmusicshow" @click="closenewMusic()" />
    </newMusic>
    <van-tabbar :style="handleHeight" v-model="active" route>
    <van-tabbar-item icon="wap-home-o" to='/'>发现</van-tabbar-item>
    <van-tabbar-item icon="search" to='/search'>搜索</van-tabbar-item>
    <van-tabbar-item icon="music-o" to='/my'>我的</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to='/follow'>简介</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import musicBox from '../../components/music-box/'
import newMusic from '../../components/new-music/'
import { mapGetters, mapState } from 'vuex'
export default {
  components: {
    musicBox,
    newMusic
  },
  data () {
    return {
      active: 0,
      layoutShow: true
    }
  },
  computed: {
    ...mapGetters(
      { LAYOUTSHOW: 'statusModule/GET_LAYOUTSHOW' },
      { getisShowlyrics: 'musicModule/getisShowlyrics' }),
    ...mapState(
      {
        LOADING: state => state.statusModule.LOADING,
        musicBoxShow: state => state.statusModule.musicBoxShow,
        newmusicBoxShow: state => state.statusModule.newmusicBoxShow,
        musicshow: state => state.statusModule.musicshow,
        newmusicshow: state => state.statusModule.newmusicshow,
        isShowlyrics: state => state.musicModule.isShowlyrics
      }
    ),
    handleHeight () {
      const handle = this.LAYOUTSHOW === true
      if (handle) {
        return ''
      } else {
        return {
          transform: 'translateY(1.4rem)'
        }
      }
    }
  },
  created () {},
  mounted () {
    // this.layoutShow = this.$store.state.islayoutShow
  },
  methods: {
    closeMusic () {
      this.$store.commit('statusModule/hidemusicshow')
      // console.log(this.isShowlyrics)
      if (this.isShowlyrics === false) {
        this.$store.commit('musicModule/notShowlyrics')
      }
    },
    closenewMusic () {
      this.$store.commit('statusModule/hidenewmusicshow')
      // console.log(this.isShowlyrics)
      if (this.isShowlyrics === false) {
        this.$store.commit('musicModule/notShowlyrics')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container{
  height: 100%;
  overflow: scroll;
.van-tabbar{
   height: 45px;
   z-index: 6000 !important;
   transition: transform .3s ease-in;
   overflow: hidden;
}
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
.van-icon-arrow-down{
  font-size: 25px;
  color: white;
}
.test2{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  height: 85px !important;
}
</style>
