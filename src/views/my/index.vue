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
      <van-grid :column-num="3">
        <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
      </van-grid>
      <van-cell-group>
        <van-cell
        @click="openPlaylist(item)"
        v-for="(item, index) in playlist"
        :key="index"
        :icon="item.coverImgUrl"
        :title="item.name"
        :value="item.trackCount" />
      </van-cell-group>
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
import playList from './components/playList/'
import { mapGetters } from 'vuex'
export default {
  components: {
    playList
  },
  data () {
    return {
      playlist: [], // 歌单
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
      var params = {
        uid: sessionStorage.getItem('id')
      }
      getUser(params).then(res => {
        const userInfo = res.data.profile
        this.$store.commit('SET_NAME', userInfo.nickname)
        this.$store.commit('SET_AVATAR', userInfo.avatarUrl)
      })
      getSongSheet(params).then(res => {
        console.log(res)
        this.playlist = res.data.playlist
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
// .my-container{
//   .header{
//     /deep/ .van-cell__title{
//       display: flex;
//       align-items: center;
//     }
//   }
// }
</style>
