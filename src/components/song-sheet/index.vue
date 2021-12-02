// 歌单组件
<template>
  <div class="sheet-container">
    <div class="sheet-header">
    <div class="sheet">歌单</div>
    <van-cell>
      <div slot="icon" class="sheetImg">
        <van-image
          width="85"
          height="85"
          :src="sheetImgurl"
        />
      </div>
      <div slot="title" class="sheetName">{{sheetName}}</div>
      <div slot="title" class="creatName">
        <van-image
        style="margin-right:13px;margin-left:13px"
          round
          width="25"
          height="25"
          :src="creatorImg"
        />
        {{creatorName}}</div>
    </van-cell>
    </div>
    <div class="playlist-dynamic">
      <div @click="collection" class="playlist-dynamic-bookedCount">
        <i :class="subscribed ? 'iconfont icon-shoucang' : 'iconfont icon-tianjiashoucang_huaban1'"></i>
        <span>{{bookedCount}}</span>
      </div>
      <div class="playlist-dynamic-commentCount">
        <i class="iconfont icon-pinglun"></i>
        <span>{{commentCount}}</span>
      </div>
      <div class="playlist-dynamic-shareCount">
        <i class="iconfont icon-fenxiang"></i>
        <span>{{shareCount}}</span>
      </div>
      </div>
    <van-cell-group>
        <van-cell
        @click="openListMusic(index)"
        v-for="(item, index) in listItem"
        :key="index"
        :label="item.ar[0].name + '-'+ item.al.name"
        :title="(index+1) + ' '+'_' + item.name"
         >
         <van-icon name="music-o" />
         </van-cell>
      </van-cell-group>
      <!-- <van-popup
      :overlay="false"
      :close-on-click-overlay='false'
      duration= 0.5
      get-container="body"
      v-model="musicBoxShow"
      position="bottom"
      class="test1"
      :class="musicshow? 'test2':'' "
      >
      <van-icon v-if="musicshow" @click="closeMusic()" name="arrow-down"  />
      <musicBox :musicdata="musicItem" :musicshow="musicshow" />
      </van-popup> -->
  </div>
</template>

<script>
import { getListitem, getPlaylistdetail, CollectSheet } from '@/api/playList/'
// import musicBox from '@/components/music-box/'
export default {
  props: {
    playList: {
      type: Object,
      require: true
    }
  },
  components: {
    // musicBox
  },
  data () {
    return {
      listItem: [],
      musicshow: false,
      musicBoxShow: false, // 点击音乐的弹窗
      musicItem: {},
      sheetName: '', // 歌单名字
      creatorImg: '', // 歌单作者头像
      creatorName: '',
      sheetImgurl: '', // 歌单背景图
      commentCount: '', // 歌单评论数
      shareCount: '', // 歌单分享数
      bookedCount: '', // 歌单收藏数
      subscribed: '' // 是否订阅
    }
  },
  computed: {},
  created () {},
  mounted () {
    // console.log(this.playList)
    this.showList()
  },
  methods: {
    async showList () {
      this.$store.commit('statusModule/showLoading')
      var listid = this.playList.id // 得到歌单id
      var params = {
        id: listid,
        cookie: sessionStorage.getItem('cookie')
      }
      const { data } = await getListitem(params) // 获取歌单里面的歌曲和信息
      // console.log(data)
      var sheetCreator = data.playlist.creator // 拿到歌单作者信息
      this.creatorImg = sheetCreator.avatarUrl
      this.creatorName = sheetCreator.nickname
      this.sheetName = data.playlist.name
      this.sheetImgurl = data.playlist.coverImgUrl
      const dynamic = await getPlaylistdetail(params) // 获取歌单动态
      // console.log(dynamic)
      this.commentCount = dynamic.data.commentCount
      var bookedCount = dynamic.data.bookedCount
      this.subscribed = dynamic.data.subscribed
      console.log(this.subscribed)
      this.shareCount = dynamic.data.shareCount
      this.listItem = data.playlist.tracks
      this.bookedCount = this.tranNumber(bookedCount)
      const songsId = []
      this.listItem.forEach(item => {
        // console.log(item)
        songsId.push(item)
      })
      // console.log(songsId)
      this.$store.commit('musicModule/setSongs', songsId)
      // console.log(this.listItem, '11111')
      this.$store.commit('statusModule/hideLoading')
    },
    /**
         * 数字转整数 如 100000 转为10万
         * @param {需要转化的数} num
         * @param {需要保留的小数位数} point
         */
    tranNumber (num, point) {
      const numStr = num.toString()
      // 十万以内直接返回
      if (numStr.length < 6) {
        return numStr
      } else if (numStr.length > 5) { // 大于6位数是十万 (以10W分割 10W以下全部显示)
        const decimal = numStr.substring(numStr.length - 4, numStr.length - 4)
        return parseFloat(parseInt(num / 10000) + decimal) + '万'
      }
    },
    // 进入听歌界面
    openListMusic (index) {
      // console.log(11)
      // this.$store.commit('musicModule/setmusicItem', item)
      this.$store.commit('musicModule/setSongindex', index)
      this.$store.commit('statusModule/handlemusic')
      // this.musicItem = a
    },
    // 收藏歌单
    collection () {
      var state = ''
      if (this.subscribed) {
        state = 2
      } else {
        state = 1
      }
      var listid = this.playList.id // 得到歌单id
      var params = {
        t: state,
        id: listid,
        cookie: sessionStorage.getItem('cookie')
      }
      console.log(params)
      CollectSheet(params).then(res => {
        console.log(res)
        this.subscribed = !this.subscribed
        if (this.subscribed === true) {
          this.$toast('收藏成功')
        } else {
          this.$toast('取消收藏')
        }
      })
    }
  },
  watch: {
    playList: {
      handler (newvalue, oldvalue) {
        this.playList = newvalue
        this.sheetCreator = newvalue.creator
        this.showList()
      },
      deep: true,
      immediate: false
    }
  }
}
</script>
<style  lang="scss" >
.van-popup {
  /deep/ .van-icon{
    z-index: 1999;
  }
}
</style>
<style lang="scss" scoped>
.sheet-container{
     position: relative;
    padding-bottom: 90px;
    .sheetImg{
      /deep/ .van-image__img{
      border-radius: 7px;}
    }
    .sheet{
      color: whitesmoke;
      font-size: 16px;
      text-align: center;
    }
    .creatName{
      color: whitesmoke;
      display: flex;
      // justify-content: center;
      align-items: center;
    }
    .sheetName{
      color: whitesmoke;
      font-weight: bold;
      margin-bottom: 15px;
      margin-left: 13px;
    }
    .sheet-header{
      .van-cell{
        background-color: unset;
      }
      // background-color: rosybrown;
      background-image: url('http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg');
      // backdrop-filter: blur(6px); // 毛玻璃
      padding: 15px 10px 40px 8px;
      // border: 1px solid red;
    }
    .playlist-dynamic{
      z-index: 2000;
      left: 18%;
      top: 24%;
      position: fixed;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      width: 220px;
      padding: 0 10px;
      height: 35px;
      border-radius: 20px;
      box-shadow: 0 0 3px black;
      background-color: white;
      display: flex;
      span {
        // width: 50px;
        font-size: 12px;
      }
      &-shareCount{
        flex:1;
        // height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          margin-right: 3px;
          font-size: 20px;
        }
      }
      &-bookedCount{
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 22px;
          margin-right: 3px;
        }
        // span {
        //   width: 40px;
        // }
      }
      &-commentCount{
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 22px;
          margin-right: 3px;
        }
      }
    }
}
.test1{
  transition: height .3s ease-in;
  overflow: hidden;
  .van-icon{
    margin-left: 8px;
    cursor: pointer;
    font-size: 20px;
    color: seashell;
  }
  height: 1.5rem;
}
.test2{
  overflow: hidden;
  height: 1.5rem !important;
}
.musci-box{
  transition: height 0.5s ease-in;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
