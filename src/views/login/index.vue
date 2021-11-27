<template>
  <div class="container">
      <div class="login-icon">
        <div class="music-icon">
          <van-icon name="music-o" />
        </div>
      </div>
      <div class="btn-warp">
        <div class="mobile">
          <van-button
          @click="mLogin"
          type="default"
          round>手机号登录</van-button>
        </div>
        <div class="email">
          <van-button
          @click="eLogin"
          type="default"
          round>邮箱登录</van-button>
        </div>
      </div>
      <van-popup
      get-container="body"
      closeable
      close-icon="arrow-left"
      close-icon-position="top-left"
      v-model="mobileShow"
      position="left"
      :style="{width: '100%',height:' 100%'}">
      <mobile />
      </van-popup>
      <van-popup
      get-container="body"
      closeable
      close-icon="arrow-left"
      close-icon-position="top-left"
      v-model="emailShow"
      position="left"
      :style="{width: '100%',height:' 100%'}">
      <email />
      </van-popup>
  </div>
</template>

<script>
import mobile from './components/mobile.vue'
import email from './components/email.vue'
export default {
  components: {
    mobile,
    email
  },
  data () {
    return {
      mobileShow: false,
      emailShow: false
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    mLogin () {
      this.mobileShow = true
    },
    eLogin () {
      this.emailShow = true
    }
  }
}
</script>

<style lang='scss' scoped>
.container{
  position: relative;
  height: 100%;
  background-color: #c93d2d;
  .login-icon{
    position: absolute;
    top: 30%;
    left: 50%;
    margin-left: -35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    background-color: #de4033;
    .music-icon{
      font-size: 44px;
      color: white;
    }
  }
  .btn-warp{
    position: absolute;
    left: 87px;
    bottom: 150px;
    .mobile{
      margin-bottom: 20px;
      .van-button{
        font-size: 15px;
        height: 35px;
        width: 200px;
        color: #eb3723;
        background-color: #fff;
      }
    }
    .email{
      .van-button{
        font-size: 15px;
        height: 35px;
        width: 200px;
        color: #eb3723;
        background-color: #fff;
      }
    }
  }
}
</style>
