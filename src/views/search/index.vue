<template>
  <div class="container">
    <div class="banner-warp">
  <van-swipe :autoplay="3000" :height="200">
  <van-swipe-item v-for="(image, index) in banner" :key="index">
    <img class="img" v-lazy="image.pic" />
  </van-swipe-item>
</van-swipe>
</div>
  </div>
</template>

<script>
import { getSearch } from '../../api/search'
export default {
  components: {},
  data () {
    return {
      banner: [] // 横幅
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.showData()
  },
  methods: {
    // 展示发现页轮播图
    async showData () {
      this.$store.commit('statusModule/showLoading')
      const res = await getSearch()
      this.banner = res.data.data.blocks[0].extInfo.banners
      this.$store.commit('statusModule/hideLoading')
      // console.log(this.banner)
    }
  }
}
</script>

<style scoped>
.banner-warp{
  padding: 10px;
}
.img{
  border-radius: 10px;
  width: 100%;
  height: 180px;
}
</style>
