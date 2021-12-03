<template>
  <div class="search-container">
      <div class="search-list">
        <van-cell
        @click="openListMusic(index)"
        v-for="(item,index) in searchData"
        :key="index"
        :title="item.name"
        :label="item.ar[0].name + '-' + item.al.name"
         />
      </div>
  </div>
</template>

<script>
export default {
  props: ['searchData'],
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.Storedata() // 把搜索出来的数据存放到vuex中
    // console.log(this.searchData, '1')
  },
  methods: {
    Storedata () {
      var songs = []
      this.searchData.forEach(item => {
        songs.push(item)
      })
      this.$store.commit('musicModule/setSongs', songs)
    },
    // 进入听歌界面
    openListMusic (index) {
      // console.log(11)
      // this.$store.commit('musicModule/setmusicItem', item)
      this.$store.commit('musicModule/setSongindex', index)
      this.$store.commit('statusModule/handlemusic')
      this.$store.commit('statusModule/hidenewmusic')
      // this.musicItem = a
    }
  },
  watch: {
    searchData: {
      handler (newvalue, oldvalue) {
        var songs = []
        newvalue.forEach(item => {
          songs.push(item)
        })
        this.$store.commit('musicModule/setSongs', songs)
      },
      deep: true,
      immediate: false
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container{
    padding-top: 55px;
    padding-bottom: 90px;
    // .search-list{
    // }
}
</style>
