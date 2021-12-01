import request from '@/utils/request'
// 获取音乐url
export const getMusicUrl = params => {
  return request({
    method: 'GET',
    url: '/song/url',
    // data用来设置POST请求体
    params
  })
}
// 获取音乐歌词
export const getMusiclyric = params => {
  return request({
    method: 'GET',
    url: '/lyric',
    // data用来设置POST请求体
    params
  })
}
