import request from '@/utils/request'
// 用户手机号登录
/**
 *  必选参数 :
    phone: 手机号码
    password: 密码
 *  可选参数 :
    countrycode: 国家码，用于国外手机号登录，例如美国传入：1

    md5_password: md5 加密后的密码,传入后 password 参数将失效

    captcha: 验证码,使用 /captcha/sent接口传入手机号获取验证码,调用此接口传入验证码,可使用验证码登录,传入后 password 参数将失效
 */
export const mlogin = params => {
  return request({
    method: 'GET',
    url: '/login/cellphone',
    // data用来设置POST请求体
    params
  })
}
// 发送验证码
export const sentCode = params => {
  return request({
    method: 'GET',
    url: '/captcha/sent',
    // data用来设置POST请求体
    params
  })
}
// 验证验证码
export const verifyCode = params => {
  return request({
    method: 'GET',
    url: '/captcha/verify',
    // data用来设置POST请求体
    params
  })
}
