<template>
  <div class="email-container">
<van-form class="login-form">
      <van-field
      label-align="right"
      label-width="47px"
      v-model="user.phone"
      name="手机号"
      label="手机号"
      placeholder="手机号"
      :rules="[{ required: true, message: '请填写手机号' }]"
      ></van-field>
      <van-field
      label-width="47px"
      v-model="user.password"
      type="password"
      name="密码"
      label="密码"
      placeholder="请输入密码"
      :rules="[{ required: true, message: '请填写密码' }]"
      >
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
import { mlogin } from '@/api/login'
export default {
  components: {},
  data () {
    return {
      user: {
        phone: '',
        password: ''
      }
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    async toLogin () {
      var params = {
        phone: this.user.phone,
        password: this.user.password
      }
      const res = await mlogin(params)
      const userInfo = res.data.profile
      if (res.data.code === 200) {
        this.$toast.success('登录成功')
        this.$store.commit('userModule/SET_COOKIE', res.data.cookie)
        sessionStorage.setItem('id', userInfo.userId)
        sessionStorage.setItem('cookie', res.data.cookie)
        this.$router.push('/')
      } else {
        this.$toast.fail('账号或密码有误')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.email-container{
    padding-top: 45px;
  /deep/ .van-field__label{
    color: black;
    display: flex;
    align-items: center;
  }
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
</style>
