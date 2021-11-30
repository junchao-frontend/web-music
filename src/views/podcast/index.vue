<template>
  <div class="test-container">
      <div>目前实现的功能：</div>
      <br>
      <div>1. 登录完成，可以用手机号验证码登录也可以手机号和密码</div>
      <div>2. 首页展示轮播图</div>
      <div>3. 我的界面展示个人资料，我的喜欢和全部歌单</div>
      <div>4. 我的界面中间图标为假图标还没有点击事件</div>
      <div>5. 展示每个歌单的所有歌曲</div>
      <div>6. 实现歌单歌曲播放功能</div>
      <div>7. 添加了歌曲播放功能的动画 唱片旋转</div>
      <div>8. 实现了歌曲界面的缩放</div>
      <div>9. 实现了上一曲和下一曲</div>
            <br>
      <div>存在bug：</div>
      <div>不能用手机自带的划屏切换窗口 这样就会导致下面的导航栏消失</div>
      <br>
      <div>待完成功能：</div>
      <div>实现点击唱片后出现滚动歌词</div>
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
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.test-container{
  div{
    font-size: 18px;
  }
}
</style>
