<template>
  <div class="container">
    <van-search
      v-model="searchValue"
      shape="round"
      background="#f5f7f9"
      placeholder="请输入搜索关键词"
    />
      <van-swipe :autoplay="3000" :height="140">
      <van-swipe-item v-for="(image, index) in banner" :key="index">
        <img class="img" v-lazy="image.pic" />
      </van-swipe-item>
    </van-swipe>
      <!-- <van-swipe :autoplay="3000" :height="150">
        <van-swipe-item v-for="(image, index) in banner" :key="index">
          <img class="img" v-lazy="image.pic" />
        </van-swipe-item>
      </van-swipe> -->
    <div class="homepage-dragon">
      <div
      class="homepage-dragon-item"
      v-for="(item, index) in ballData"
      :key="index"
      >
      <img class="homepage-dragon-icon" :src="item.iconurl">
      <span>{{item.name}}</span>
      </div>
    </div>
    <!-- <img src="./1.png" alt=""> -->
    <div class="recommend-list">
      <div class="recommend-list-header">
        <span class="header-left">推荐歌单</span>
      </div>
      <div class="recommend-list-body">
        <div
        class="recommend-list-body-warp"
        v-for="(item, index) in searchList"
        :key="index"
        @click="openPlaylist(item)"
        >
        <img class="recommend-list-body-img" :src="item.picUrl">
        <div class="recommend-list-body-div">{{item.name}}</div>
        </div>
      </div>
    </div>
    <van-popup
      @click-close-icon="closeSheet()"
      closeable
      close-icon-position="top-left"
      class="close-sheet"
      get-container="body"
      v-model="palylistshow"
      position="right"
      :style="{width: '100%',height:' 100%'}">
        <playList :playList="listItem" />
      </van-popup>
  </div>
</template>

<script>
import { getSearch, getHomeball } from '../../api/search'
import { getRecommendList } from '../../api/playList'
import playList from '@/components/song-sheet/'
export default {
  components: {
    playList
  },
  data () {
    return {
      banner: [], // 横幅
      searchValue: '', // 搜索内容
      ballData: [], // 首页圆形入口图标
      recommendList: [], // 所有推荐歌单
      searchList: [],
      listItem: '',
      palylistshow: false,
      icon: [require('./icon/1.png'), require('./icon/2.png'), require('./icon/3.png'), require('./icon/4.png'), require('./icon/5.png'),
        require('./icon/6.png'), require('./icon/7.png'), require('./icon/8.png'), require('./icon/9.png')
      ]
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
      const res = await getSearch() // 获取横幅
      const ball = await getHomeball()
      const personalized = await getRecommendList()
      this.ballData = ball.data.data
      this.ballData.forEach((i, index) => {
        i.iconurl = this.icon[index]
      })
      this.recommendList = personalized.data.result
      this.searchList = this.recommendList.filter((item, index) => { return index < 12 && index > 1 })
      // console.log(this.searchList)
      this.banner = res.data.data.blocks[0].extInfo.banners
      this.$store.commit('statusModule/hideLoading')
    },
    // 打开每一歌单
    openPlaylist (a) {
      // console.log(a)
      this.$store.commit('statusModule/hideLayout')
      this.listItem = a
      this.palylistshow = true
    },
    // 关闭歌单弹窗
    closeSheet () {
      this.$store.state.islayoutShow = true
      this.$store.commit('statusModule/showLayout')
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding: 8px;
  .homepage-dragon{
    padding: 10px;
    display: flex;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
    width: 95%;
    height: 67px;
    // border: 1px solid red;
    background-color: white;
    border-bottom: 1px solid rgb(228, 225, 225);
    &-icon{
      background-color: #fdf5f5;
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
    &-item{
      margin-right: 20px;
      margin-left: 2px;
      width: 50px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      span {
        text-align: center;
        font-size: 10px;
      }
    }
    &::-webkit-scrollbar{
      display: none;
    }
  }
  .recommend-list{
    width: 95%;
    height: 160px;
    padding: 10px;
    background-color: white;
    &-header{
      display: flex;
      justify-content: space-between;
      .header-left{
        font-weight: bold;
        font-size: 15px;
      }
      .header-right{
        height: 15px;
        border: 1px solid rgb(196, 191, 191);
        border-radius: 10px;
        padding: 0 6px;
        background-color: white;
        font-size: 10px;
      }
    }
    &-body{
      display: flex;
      // white-space: nowrap;
      overflow-y: hidden;
      overflow-x: scroll;
      width: 98%;
      &-warp{
        padding: 10px;
        display: flex;
        flex-direction: column;
        // word-break: break-all;
      }
      &-img{
        border-radius: 12px;
        width: 95px;
        height: 95px;
      }
      &-div{
        margin-top: 5px;
        width: 95px;
        // height: 50px;
        font-size: 10px;
      }
    }
    &-body::-webkit-scrollbar{
      display: none;
    }
  }
}
.container::-webkit-scrollbar{
  display: none;
}
.van-swipe{
  width: 95%;
  background-color: white;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  padding: 10px;
}
.van-search__content{
  background-color: white;
}
.img{
  // text-align: center;
  border-radius: 10px;
  width: 95%;
  height: 130px;
}
</style>
