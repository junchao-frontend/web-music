<template>
  <div class="layout-container">
    <router-view />
    <van-tabbar :style="handleHeight" v-model="active" route>
    <van-tabbar-item icon="search" to='/'>发现</van-tabbar-item>
    <van-tabbar-item icon="guide-o" to='/podcast'>播客</van-tabbar-item>
    <van-tabbar-item icon="music-o" to='/my'>我的</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to='/follow'>关注</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  data () {
    return {
      active: 0,
      layoutShow: true
    }
  },
  computed: {
    ...mapGetters(['GET_LAYOUTSHOW']),
    handleHeight () {
      const handle = this.GET_LAYOUTSHOW === true
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
  methods: {}
}
</script>

<style lang="scss" scoped>
.layout-container{
  overflow: scroll;
.van-tabbar{
   z-index: 3000 !important;
   transition: transform .3s ease-in;
   overflow: hidden;
}
}

</style>
