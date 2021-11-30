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
    <van-tabbar :style="handleHeight" v-model="active" route>
    <van-tabbar-item icon="search" to='/'>发现</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to='/podcast'>简介</van-tabbar-item>
    <van-tabbar-item icon="music-o" to='/my'>我的</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to='/follow'>关注</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import musicBox from '../../components/music-box/'
import { mapGetters, mapState } from 'vuex'
export default {
  components: {
    musicBox
  },
  data () {
    return {
      active: 0,
      layoutShow: true
    }
  },
  computed: {
    ...mapGetters({ LAYOUTSHOW: 'statusModule/GET_LAYOUTSHOW' }),
    ...mapState(
      {
        LOADING: state => state.statusModule.LOADING,
        musicBoxShow: state => state.statusModule.musicBoxShow,
        musicshow: state => state.statusModule.musicshow
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
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container{
  overflow: scroll;
.van-tabbar{
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
