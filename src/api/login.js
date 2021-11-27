import request from '@/utils/request'
// 用户手机号登录
export const mlogin = params => {
  return request({
    method: 'GET',
    url: '/login/cellphone',
    // data用来设置POST请求体
    params
  })
}
