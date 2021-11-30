<template>
  <div class="my-container">
      <van-cell class="header">
        <div slot="icon">
          <van-image
            round
            fit="cover"
            width="70"
            height="70"
            :src="userAvatar"
          />
        </div>
        <div slot="title">
          {{userName}}
        </div>
      </van-cell>
      <div class="my-icon">
        <div class="icon-item">
          <van-icon name="music" />
          <span>本地下载</span>
        </div>
        <div class="icon-item">
          <van-icon name="play-circle" />
          <span>最近播放</span>
        </div>
        <div class="icon-item">
          <van-icon name="shopping-cart" />
          <span>绿胶会员</span>
        </div>
        <div class="icon-item">
          <van-icon name="friends" />
          <span>我的好友</span>
        </div>
        <div class="icon-item">
          <van-icon name="good-job" />
          <span>收藏和赞</span>
        </div>
        <div class="icon-item">
          <van-icon name="point-gift" />
          <span>获得礼物</span>
        </div>
      </div>
        <van-cell
        class="love-list"
        @click="openLovelist()"
        :icon="loveList.coverImgUrl"
        :title="loveList.name"
        :value="loveList.trackCount +'首'" />
        <div class="list-group">
      <van-cell-group>
        <van-cell
        class="other-list"
        @click="openPlaylist(item)"
        v-for="(item, index) in otherlist"
        :key="index"
        :icon="item.coverImgUrl"
        :title="item.name"
        :value="item.trackCount +'首' " />
      </van-cell-group>
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
import { getUser, getSongSheet } from '../../api/user'
import playList from '@/components/song-sheet/'
import { mapGetters } from 'vuex'
export default {
  components: {
    playList
  },
  data () {
    return {
      loveList: {},
      otherlist: [], // 歌单
      palylistshow: false,
      listItem: ''
    }
  },
  computed: {
    ...mapGetters({
      userName: 'userModule/GET_NAME',
      userAvatar: 'userModule/GET_AVATAR'
    })
  },
  created () {
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      var list = []
      var params = {
        uid: sessionStorage.getItem('id')
      }
      // 获取用户信息
      getUser(params).then(res => {
        const userInfo = res.data.profile
        this.$store.commit('userModule/SET_NAME', userInfo.nickname)
        this.$store.commit('userModule/SET_AVATAR', userInfo.avatarUrl)
      })
      // 获取所有歌单
      getSongSheet(params).then(res => {
        list = res.data.playlist
        this.loveList = list[0]
        this.otherlist = list.filter((item, index) => {
          return index > 0
        })
      })
    },
    // 打开每一歌单
    openPlaylist (a) {
      // console.log(a)
      this.$store.commit('statusModule/hideLayout')
      this.listItem = a
      this.palylistshow = true
    },
    // 打开我的喜欢
    openLovelist () {
      this.$store.commit('statusModule/hideLayout')
      this.palylistshow = true
      this.$store.state.islayoutShow = false
      this.listItem = this.loveList
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

.my-container{
  position: relative;
  .header{
    .van-cell__title{
      font-size: 15px;
      font-weight: bold;
      margin-left: 15px;
      margin-top: 10px;
    }
    // display: flex;
    // justify-content: center;
    // align-items: center;
    margin-top: 15px;
    border-radius: 10px;
  }
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 90px;
  overflow-y: auto;
.list-group{
  /deep/ .van-cell-group{
      border-radius: 100px;
  }
  // border: 1px solid red;
  border-radius: 10px;
  .other-list{
    display: flex;
    align-items: center;
    &:first-child{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
    &:last-child{
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .van-cell__left-icon{
    margin-right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-icon__image{
    border-radius: 5px;
    width: 40px;
    height: 40px;
  }
  }
  }
  margin-top: 20px;
}
.my-icon{
  .icon-item{
    .van-icon{
      color: red;
      font-size: 30px;
    }
    span{
      font-size: 12px;
    }
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 33.333333%;
    // width: 112px;
    height: 80px;
  }
  flex-wrap: wrap;
  padding: 5px;
  display: flex;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 10px;
  margin-top: 20px;
}
.love-list{
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  .van-cell__title{
    font-size: 14px;
  }
  .van-cell__left-icon{
    margin-right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-icon__image{
    border-radius: 5px;
    width: 40px;
    height: 40px;
  }
  }
}
}
</style>
