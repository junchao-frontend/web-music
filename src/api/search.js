import request from '@/utils/request'
// 获取首页发现
export const getSearch = params => {
  return request({
    method: 'GET',
    url: '/homepage/block/page',
    // data用来设置POST请求体
    params
  })
}
