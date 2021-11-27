import request from '@/utils/request'
// 用户手机号登录
export const getUser = params => {
  return request({
    method: 'GET',
    url: '/user/detail',
    // data用来设置POST请求体
    params
  })
}
// 获取用户歌单
export const getSongSheet = params => {
  return request({
    method: 'GET',
    url: '/user/playlist',
    // data用来设置POST请求体
    params
  })
}
