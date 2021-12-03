import request from '@/utils/request'
// 获取首页发现
export const getSearch = params => {
  return request({
    method: 'GET',
    url: '/homepage/block/page',
    params
  })
}
// 获取 APP 首页圆形图标入口列表
export const getHomeball = params => {
  return request({
    method: 'GET',
    url: '/homepage/dragon/ball',
    params
  })
}
