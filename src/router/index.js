import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/')
  },
  {
    path: '/',
    component: () => import('../views/layout/'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home/')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('../views/search/')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('../views/my/')
      },
      {
        path: '/follow',
        name: 'follow',
        component: () => import('../views/follow/')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // to 是 访问界面
  // from 是来自哪
  // next是放行方法
  const logintoken = sessionStorage.getItem('cookie') // 从sessionstorage拿到token
  if (logintoken && to.path === '/login') {
    next('/')
  }
  // console.log(logintoken)
  // 如果去登录界面 直接放行
  // 先判断有没有token 如果已经获取到了token还想去登录界面则回到主界面
  if (to.path === '/login') { // 如果是去登录界面直接放行
    next()
  } else {
    if (!logintoken) { // 如果没有token 则要去登录界面
      next('/login') // 如果这里路径写 /login  则不需要上面根路径的重定向
    } else {
      next()
    }
  }
})
export default router
