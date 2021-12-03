<template>
  <div class="test-container">
      <div>目前实现的功能：</div>
      <br>
      <div>1. 登录完成，可以用手机号验证码登录也可以手机号和密码</div>
      <div>2. 首页展示轮播图</div>
      <div>3. 首页展示推荐歌单,可以点击并播放里面的歌曲</div>
      <div>4. 首页新歌推荐,可以切换欧美日本等,可以播放</div>
      <div>5. 首页新歌推荐,可以切换欧美日本等,可以播放</div>
      <div>6. 首页搜索已经实现</div>
      <div>7. 首页圆形图标不可以点击</div>
      <br>
      <div>8. 搜索界面除了推荐搜索都可以点击进行搜索</div>
      <div>9. 搜索有推荐搜索,点击之后直接进行搜索</div>
      <div>10. 搜索出来的歌曲都可以点击进行播放</div>
      <br>
      <div>11. 我的界面中间图标为假图标还没有点击事件</div>
      <div>12. 展示每个歌单的所有歌曲</div>
      <div>13. 添加了歌曲播放功能的动画 唱片旋转</div>
      <div>14. 实现了上一曲和下一曲</div>
      <div>15. 实现了点击唱片后出现滚动歌词</div>
      <div>16. 实现了进度条拖拽</div>
      <div>17. 实现了收藏/取消收藏歌单(PC端存在延迟,收藏歌单手机app立刻出现)</div>
      <br>
      <div>存在bug：</div>
      <div>不能用手机自带的划屏切换窗口 这样就会导致下面的导航栏消失</div>
      <br>
      <div>待完成功能：</div>
      <div>所有图标的点击事件</div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  created () {},
  mounted () {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.test-container{
  padding-bottom: 90px;
  div{
    font-size: 15px;
  }
}
</style>
