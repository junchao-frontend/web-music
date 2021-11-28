<template>
  <div class="layout-container">
    <router-view />
    <van-tabbar v-model="active" route>
  <van-tabbar-item icon="search" to='/'>发现</van-tabbar-item>
  <van-tabbar-item icon="guide-o" to='/podcast'>播客</van-tabbar-item>
  <van-tabbar-item icon="music-o" to='/my'>我的</van-tabbar-item>
  <van-tabbar-item icon="friends-o" to='/follow'>关注</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.layout-container{
  overflow: scroll;
.van-tabbar{
  //  z-index: 3000 !important;
}
}

</style>
