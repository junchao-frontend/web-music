<template>
  <div class="my-container">
      <van-cell class="header">
        <div slot="icon">
          <van-image
            round
            fit="cover"
            width="70"
            height="70"
            :src="GET_AVATAR"
          />
        </div>
        <div slot="title">
          {{GET_NAME}}
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
        @click="openPlaylist(item)"
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
      get-container="body"
      v-model="palylistshow"
      closeable
      close-icon-position="top-left"
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
    ...mapGetters(['GET_NAME', 'GET_AVATAR'])
  },
  created () {
    this.test()
  },
  mounted () {
  },
  methods: {
    test () {
      var list = []
      var params = {
        uid: sessionStorage.getItem('id')
      }
      getUser(params).then(res => {
        const userInfo = res.data.profile
        this.$store.commit('SET_NAME', userInfo.nickname)
        this.$store.commit('SET_AVATAR', userInfo.avatarUrl)
      })
      getSongSheet(params).then(res => {
        list = res.data.playlist
        this.loveList = list[0]
        this.otherlist = list.filter((item, index) => {
          return index > 0
        })
        console.log(this.otherlist, '111')
      })
    },
    openPlaylist (a) {
      // console.log(a)
      this.listItem = a
      this.palylistshow = true
    }
  }
}
</script>

<style lang="scss" scoped>

.my-container{
  .header{
    margin-top: 15px;
    border-radius: 10px;
  }
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 55px;
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
