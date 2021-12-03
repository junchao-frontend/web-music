import request from '@/utils/request'
// 搜索
// 必选参数 : keywords : 关键词
export const getSearch = params => {
  return request({
    method: 'GET',
    url: '/cloudsearch',
    params
  })
}
// 热搜列表
export const getHotsearch = params => {
  return request({
    method: 'GET',
    url: '/search/hot/detail',
    params
  })
}
// 搜索建议
// 必选参数 : keywords : 关键词
// 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
export const getSuggest = params => {
  return request({
    method: 'GET',
    url: '/search/suggest',
    params
  })
}
