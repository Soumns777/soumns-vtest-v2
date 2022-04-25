import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'useSeal'
    }
  },
  {
    name: 'useSeal',
    path: '/useSeal',
    component: () => import('@/views/useSeal/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router