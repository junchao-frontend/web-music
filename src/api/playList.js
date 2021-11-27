import request from '@/utils/request'
// 用户歌单详情
export const getListitem = params => {
  return request({
    method: 'GET',
    url: '/playlist/detail',
    // data用来设置POST请求体
    params
  })
}
