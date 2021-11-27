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
        name: 'search',
        component: () => import('../views/search/')
      },
      {
        path: '/podcast',
        name: 'podcast',
        component: () => import('../views/podcast/')
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

export default router
