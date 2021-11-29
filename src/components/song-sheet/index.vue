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
          :src="playList.coverImgUrl"
        />
      </div>
      <div slot="title" class="sheetName">{{playList.name}}</div>
      <div slot="title" class="creatName">
        <van-image
        style="margin-right:13px;margin-left:13px"
          round
          width="25"
          height="25"
          :src="sheetCreator.avatarUrl"
        />
        {{sheetCreator.nickname}}</div>
    </van-cell>
    </div>
    <van-cell-group>
        <van-cell
        @click="openListMusic(item)"
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
import { getListitem } from '@/api/playList/'
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
      sheetInfo: {}, // 歌单信息
      sheetCreator: {} // 歌单作者信息
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.sheetCreator = this.playList.creator
    this.showList()
  },
  methods: {
    async showList () {
      this.$store.commit('showLoading')
      var listid = this.playList.id
      var params = {
        id: listid,
        cookie: sessionStorage.getItem('cookie')
      }
      const { data } = await getListitem(params)
      this.listItem = data.playlist.tracks
      console.log(this.listItem, 'wdad')
      this.$store.commit('hideLoading')
    },
    // 进入听歌界面
    openListMusic (a) {
      this.$store.commit('handlemusicItem', a)
      this.$store.commit('handlemusicBoxShow')
      this.$store.commit('handlemusicshow')
      // this.musicItem = a
    },
    // 关闭听歌界面
    closeMusic () {
      this.musicshow = false
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
    // padding-top: 30px;
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
