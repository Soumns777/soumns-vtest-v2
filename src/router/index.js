import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'payRequest'
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
  }
]

const router = new VueRouter({
  routes
})

export default router
