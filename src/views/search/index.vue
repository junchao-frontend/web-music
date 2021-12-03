<template>
  <div class="test-container">
      <van-search
      class="search"
      @search="onSearch"
      @input="musicSuggest()"
      v-model="searchValue"
      shape="round"
      background="#f5f7f9"
      placeholder="请输入搜索关键词"
    />
    <div v-show="isShowsuggest" class="search-suggest">
      <div class="search-suggest-item" v-for="(item,index) in suggestData" :key="index" @click="suggestItem(item.name)">
        <i class="iconfont icon-sousuo"></i>
        {{item.name || ''}}
        </div>
    </div>
    <div class="proposal">
      <p>推荐搜索</p>
      <span>风吹过八千里</span>
      <span>Counting Stars</span>
      <span>删了吧</span>
      <span>天亮以前说再见</span>
      </div>
    <div class="resou">热搜榜</div>
    <div class="hot-search">
      <div
      class="hot-search-item"
      v-for="(item,index) in hotSearch"
      :key="index"
      @click="searchItem(item.searchWord)"
      > <span>{{index + 1 + ' ' + item.searchWord}}</span>
        <img class="hot-search-icon" v-if="item.iconUrl" :src="item.iconUrl">
      </div>
    </div>
    <van-popup
    duration='0.2'
    get-container="body"
    closeable
    close-icon="arrow-left"
    close-icon-position="top-left"
    v-model="isSearchshow"
    position="right"
    :style="{ width: '100%',height: '100%' }">
    <searchPage :searchData="searchData"/>
    </van-popup>
  </div>
</template>

<script>
import { getHotsearch, getSuggest, getSearch } from '../../api/search'
import searchPage from '../../components/search-page/'
export default {
  components: {
    searchPage
  },
  data () {
    return {
      searchValue: '',
      hotSearch: [], // 热搜
      isShowsuggest: false,
      suggestData: [], // 搜索建议
      isSearchshow: false,
      searchData: [] // 搜索出来的数据
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.searchHot() // 展示热搜
  },
  methods: {
    async searchHot () {
      const res = await getHotsearch()
      // console.log(res)
      this.hotSearch = res.data.data
    },
    // 点击热搜
    searchItem (e) {
      this.searchValue = e
      var parms = {
        keywords: this.searchValue
      }
      getSearch(parms).then(res => {
        this.isSearchshow = true
        this.searchData = res.data.result.songs.filter((item, index) => { return index < 20 })
      })
    },
    // 搜索建议
    musicSuggest () {
      // console.log(this.searchValue)
      this.isShowsuggest = true
      var parms = {
        keywords: this.searchValue
      }
      getSuggest(parms).then(res => {
        // console.log(res)
        this.suggestData = res.data.result.songs || ''
      })
      if (this.searchValue === '') {
        this.isShowsuggest = false
      }
    },
    // 推荐搜索点击
    suggestItem (a) {
      this.searchValue = a
      var parms = {
        keywords: this.searchValue
      }
      getSearch(parms).then(res => {
        this.searchData = res.data.result.songs.filter((item, index) => { return index < 20 })
        this.isShowsuggest = false
        this.isSearchshow = true
      })
    },
    // 搜索
    onSearch () {
      var parms = {
        keywords: this.searchValue
      }
      getSearch(parms).then(res => {
        this.searchData = res.data.result.songs.filter((item, index) => { return index < 20 })
        this.isShowsuggest = false
        this.isSearchshow = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test-container{
  position: relative;
.van-search__content{
  background-color: white;
}
/deep/ .van-field__control{
  font-size: 13px;
}
.test-container{
  div{
    font-size: 18px;
  }
}
.resou{
  margin-left: 12px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}
.proposal{
  color: gray;
  margin-left: 12px;
  font-size: 12px;
  margin-bottom: 15px;
  margin-top: 10px;
  p {
    margin-right: 8px;
    display: inline-block;
  }
  span {
    // display: inline-block;
    margin-right: 12px;
    font-size: 10px;
    color: rgb(103, 174, 202);
  }
}
.hot-search{
  margin: 0 auto;
  padding-left: 8px;
  // text-align: center;
  width: 88%;
  // padding: 8px;
  background-color: white;
  border-radius: 10px;
  &-item{
    // margin-left: 5px;
    display: flex;
    display: inline-block;
    align-items: center;
    // background-color: white;
    width: 150px;
    height: 35px;
    // float: left;
    span {
      font-size: 13px;
    }
  }
  &-icon{
    margin-left: 4px;
    width: 15px;
    height: 15px;
  }
}
.search{
  // z-index: 3;
  // top: 20px;
  // position: absolute;
}
.search-suggest{
  padding: 14px;
  z-index: 2;
  top: 50px;
  bottom: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #f5f7f9;
  &-item{
    color: gray;
    font-size: 15px;
    margin-bottom: 20px;
  }
}
}
</style>
