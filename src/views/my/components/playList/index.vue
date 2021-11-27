<template>
  <div class="play-container">
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
      :style="{height:' 100%'}">
        <listMusic :musicdata="musicItem" />
      </van-popup>
  </div>
</template>

<script>
import { getListitem } from '@/api/playList/'
import listMusic from '../listMusic/index.vue'
export default {
  props: {
    playList: {
      type: Object,
      require: true
    }
  },
  components: {
    listMusic
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
        id: listid
      }
      const { data } = await getListitem(params)
      this.listItem = data.playlist.tracks
    //   console.log(data)
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

<style scoped>
.play-container{
    padding-top: 40px;
}
</style>
