<template>
  <div class="container">
      <van-button type="danger" @click="test">快快快登录</van-button>
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
  methods: {
    test () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
</style>
