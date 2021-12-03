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
// 新歌速递
// type: 地区类型 id,对应以下:
// 全部:0
// 华语:7
// 欧美:96
// 日本:8
// 韩国:16
export const getNewmusic = params => {
  return request({
    method: 'GET',
    url: '/top/song',
    // data用来设置POST请求体
    params
  })
}
