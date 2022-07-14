import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'uploadImg'
    }
  },
  {
    name: 'useSeal',
    path: '/useSeal',
    component: () => import('@/views/useSeal/index.vue')
  },
  {
    name: 'useSealTest',
    path: '/useSealTest',
    component: () => import('@/views/useSeal/test.vue')
  },
  {
    name: 'payRequest',
    path: '/payRequest',
    component: () => import('@/views/payRequest/index.vue')
  },

  {
    name: 'testEnv',
    path: '/testEnv',
    component: () => import('@/views/testEnv/index.vue')
  },
  {
    name: 'testRem',
    path: '/testRem',
    component: () => import('@/views/testRem/index.vue')
  },
  {
    name: 'uploadImg',
    path: '/uploadImg',
    component: () => import('@/views/uploadImg/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
