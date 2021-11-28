// 歌单组件
<template>
  <div class="sheet-container">
    <van-cell-group>
        <van-cell
        @click="openListMusic(item)"
        v-for="(item, index) in listItem"
        :key="index"
        :title="item.name"
         />
      </van-cell-group>
      <van-popup
      get-container="body"
      v-model="musicshow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :class="musicshow ? 'test1' : 'test2'"
      >
        <musicBox :musicdata="musicItem" />
      </van-popup>
  </div>
</template>

<script>
import { getListitem } from '@/api/playList/'
import musicBox from '@/components/music-box/'
export default {
  props: {
    playList: {
      type: Object,
      require: true
    }
  },
  components: {
    musicBox
  },
  data () {
    return {
      listItem: [],
      musicshow: false,
      musicItem: {}
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.showList()
  },
  methods: {
    async showList () {
      var listid = this.playList.id
      var params = {
        id: listid,
        cookie: sessionStorage.getItem('cookie')
      }
      const { data } = await getListitem(params)
      this.listItem = data.playlist.tracks
      console.log(data, 'zj')
    },
    openListMusic (a) {
      console.log(a)
      this.musicshow = true
      this.musicItem = a
    }
  },
  watch: {
    playList: {
      handler (newvalue, oldvalue) {
        console.log(newvalue)
        this.playList = newvalue
        this.showList()
      },
      deep: true,
      immediate: false
    }
  }
}
</script>

<style lang="scss" scoped>
.sheet-container{
    padding-top: 40px;
}
.test1{
  height: 100% !important;
}
.test2{
  display: block !important;
  height: 15% !important;
  /deep/ .van-popup__close-icon{
      display: none;
  }
}
</style>
