<template>
  <div class="mobile-container">
      <p>登录体验更多精彩</p>
    <van-form class="login-form">
      <van-field
      label-align="right"
      label-width="47px"
      v-model="user.phone"
      name="手机号"
      label="+86"
      placeholder="手机号"
      :rules="[{ required: true, message: '请填写手机号' }]"
      ></van-field>
      <van-field
      label-width="47px"
      v-model="user.captcha"
      type="captcha"
      name="验证码"
      label="验证码"
      placeholder="请输入验证码"
      :rules="[{ required: true, message: '请填写验证码' }]"
      >
      <template #button>
      <van-count-down @finish='isCountdown = false' v-if="isCountdown" :time="1000 * 60" format=" ss s" />
      <van-button size="small" class="send-btn" v-else round @click.prevent="onSendcode(user.phone)" :loading="isBtnloading">获取验证码</van-button>
      </template>
      </van-field>
    <div class="login-btn">
    <van-button
    @click="toLogin()"
    type="danger"
    round>登录</van-button>
    </div>
</van-form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mlogin, sentCode, verifyCode } from '@/api/login'
export default {
  components: {},
  data () {
    return {
      isCountdown: false, // 用来显示获取验证码按钮和时间
      isBtnloading: false, // 按钮加载状态
      user: {
        phone: '',
        password: ''
      }
    }
  },
  computed: {
  },
  created () {},
  mounted () {},
  methods: {
    async toLogin () {
      var params = {
        phone: this.user.phone,
        captcha: this.user.captcha
      }
      const res = await mlogin(params)
      const userInfo = res.data.profile
      console.log(userInfo)
      if (res.data.code === 200) {
        this.$toast.success('登录成功')
        this.$store.commit('userModule/SET_COOKIE', res.data.cookie)
        // this.$store.commit('SET_TOKEN', res.data.token)
        sessionStorage.setItem('id', userInfo.userId)
        sessionStorage.setItem('cookie', res.data.cookie)
        this.$router.push('/')
      } else {
        this.$toast.fail('账号或验证码有误')
      }
    },
    async onSendcode (phone) {
      this.isBtnloading = true
      this.isCountdown = true
      var params = {
        phone: phone
      }
      const res = await sentCode(params)
      this.isBtnloading = false
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-container{
  /deep/ .van-field__label{
    color: black;
    display: flex;
    align-items: center;
    text-align: right !important;
  }
    padding-top: 35px;
    .login-btn{
      display: flex;
      justify-content: center;
      width: 300px;
      margin: 30px auto;
    }
    .van-button{
      font-size: 15px;
      width: 200px;
      height: 30px;
    }
    p {
      color: black;
      font-family: Monospace;
      padding-left: 20px;
      font-size: 18px;
      font-weight: bold;
    }
}
.send-btn{
width: 78px !important;
height: 25px;
background-color: #ededed;
.van-button__text{
  font-size: 11px;
  color: #666666;
}
}
</style>
