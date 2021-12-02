import request from '@/utils/request'
// 获取歌单详情
export const getListitem = params => {
  return request({
    method: 'GET',
    url: '/playlist/detail',
    // data用来设置POST请求体
    params
  })
}
// 歌单详情动态
export const getPlaylistdetail = params => {
  return request({
    method: 'GET',
    url: '/playlist/detail/dynamic',
    // data用来设置POST请求体
    params
  })
}
// 获取推荐歌单
// 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
export const getRecommendList = params => {
  return request({
    method: 'GET',
    url: '/personalized',
    params
  })
}
// 收藏/取消收藏 歌单
// t : 类型,1:收藏,2:取消收藏 id : 歌单 id
export const CollectSheet = params => {
  return request({
    method: 'GET',
    url: '/playlist/subscribe',
    // data用来设置POST请求体
    params
  })
}
