<template>
  <div class="mobile-container">
      <p>登录体验更多精彩</p>
    <van-form>
      <van-field
      v-model="user.phone"
      name="手机号"
      label="手机号"
      placeholder="手机号"
      :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
      v-model="user.password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
      />
    <div class="login-btn">
    <van-button
    @click="toLogin(user)"
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
        phone: '15533570808',
        password: 'wangjunchao0919'
      }
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    async toLogin (a) {
      const res = await mlogin(a)
      console.log(res)
      if (res.data.code === 200) {
        this.$toast.success('登录成功')
        this.$router.push('/layout')
      } else {
        this.$toast.fail('账号或密码错误')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-container{
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
</style>
