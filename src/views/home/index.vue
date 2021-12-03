<template>
  <div class="container">
    <van-search
      @focus="toSearch()"
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
    <div class="new-music">
    <van-tabs @click="changeNew" v-model="active">
      <van-tab title="华语">
        <van-cell
        @click="openListMusic(index)"
        v-for="(item,index) in ChinaMusic"
        :key="index"
        :icon="item.album.picUrl"
        :title="item.name"
        :value="item.alias[0]"
        :label="item.album.artists[0].name"
        />
      </van-tab>
      <van-tab title="欧美">
        <van-cell
        @click="openListMusic(index)"
        v-for="(item,index) in AmericaMusic"
        :key="index"
        :icon="item.album.picUrl"
        :title="item.name"
        :value="item.alias[0]"
        :label="item.album.artists[0].name"
        />
      </van-tab>
      <van-tab title="日本">
        <van-cell
        @click="openListMusic(index)"
        v-for="(item,index) in JapanMusic"
        :key="index"
        :icon="item.album.picUrl"
        :title="item.name"
        :value="item.alias[0]"
        :label="item.album.artists[0].name"
        />
      </van-tab>
      <van-tab title="韩国">
        <van-cell
        @click="openListMusic(index)"
        v-for="(item,index) in KoreaMusic"
        :key="index"
        :icon="item.album.picUrl"
        :title="item.name"
        :value="item.alias[0]"
        :label="item.album.artists[0].name"
        />
      </van-tab>
    </van-tabs>
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
import { getSearch, getHomeball } from '../../api/home'
import { getRecommendList } from '../../api/playList'
import { getNewmusic } from '../../api/music'
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
      active: 0,
      palylistshow: false,
      type: 7, // 获取新歌速递的type 默认华语
      icon: [require('./icon/1.png'), require('./icon/2.png'), require('./icon/3.png'), require('./icon/4.png'), require('./icon/5.png'),
        require('./icon/6.png'), require('./icon/7.png'), require('./icon/8.png'), require('./icon/9.png')
      ],
      ChinaMusic: [], // 华语新歌
      AmericaMusic: [],
      JapanMusic: [],
      KoreaMusic: []
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
      var params = {
        type: this.type
      }
      const newmusic = await getNewmusic(params)
      this.ChinaMusic = newmusic.data.data.filter((item, index) => { return index < 6 })
      // console.log(this.ChinaMusic)
      var songsArr = []
      this.ChinaMusic.forEach(item => {
        songsArr.push(item)
      })
      this.$store.commit('musicModule/setnewSongs', songsArr)
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
    },
    // 切换新歌速递
    async changeNew (e) {
      // console.log(e)
      var type = 0
      if (e === 1) {
        type = 96
        const params = {
          type: type
        }
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0, // 持续展示 toast
          loadingType: 'spinner'
        })
        const musicdata = await getNewmusic(params)
        this.AmericaMusic = musicdata.data.data.filter((item, index) => { return index < 6 })
        const songsArr = []
        this.AmericaMusic.forEach(item => {
          songsArr.push(item)
        })
        this.$store.commit('musicModule/setnewSongs', songsArr)
        this.$toast.clear()
      } else if (e === 2) {
        type = 8
        const params = {
          type: type
        }
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0, // 持续展示 toast
          loadingType: 'spinner'
        })
        const musicdata = await getNewmusic(params)
        this.JapanMusic = musicdata.data.data.filter((item, index) => { return index < 6 })
        const songsArr = []
        this.JapanMusic.forEach(item => {
          songsArr.push(item)
        })
        this.$store.commit('musicModule/setnewSongs', songsArr)
        this.$toast.clear()
      } else if (e === 3) {
        type = 16
        const params = {
          type: type
        }
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0, // 持续展示 toast
          loadingType: 'spinner'
        })
        const musicdata = await getNewmusic(params)
        this.KoreaMusic = musicdata.data.data.filter((item, index) => { return index < 6 })
        const songsArr = []
        this.KoreaMusic.forEach(item => {
          songsArr.push(item)
        })
        this.$store.commit('musicModule/setnewSongs', songsArr)
        this.$toast.clear()
      } else if (e === 0) {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0, // 持续展示 toast
          loadingType: 'spinner'
        })
        const songsArr = []
        this.ChinaMusic.forEach(item => {
          songsArr.push(item)
        })
        this.$store.commit('musicModule/setnewSongs', songsArr)
        this.$toast.clear()
      }
    },
    // 进入听歌界面
    openListMusic (index) {
      // console.log(11)
      // this.$store.commit('musicModule/setmusicItem', item)
      this.$store.commit('musicModule/setnewSongindex', index)
      this.$store.commit('statusModule/handlenewmusic')
      this.$store.commit('statusModule/hidemusic')
      // this.musicItem = a
    },
    // 进入搜索界面
    toSearch () {
      // console.log(1)
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding: 8px;
  padding-bottom: 80px;
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
  .new-music{
    margin-top: 12px;
    background-color: white;
    .van-icon__image{
      border-radius: 5px;
      width: 40px;
      height: 40px;
    }
    .van-cell{
      // display: flex;
      // align-items: center;
    }
    .van-cell__title{
      font-size: 14px;
      font-family: Arial,Verdana,Sans-serif;
      // font-weight: bold;
    }
    .van-cell__value{
      font-size: 12px;
    }
    // /deep/ .van-tabs__wrap{
    //   background-color: white;
    //   width: 106%;
    // }
    // /deep/ .van-tabs__content{
    //   width: 200px;
    // }
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
