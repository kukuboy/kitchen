import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'view',
      component: () => import('@/pages/home.vue'),
      children: [
        {
          path: '/more',
          name: 'more',
          component: () => import('@/pages/views/more.vue')
        },
        {
          path: '/kitchen',
          name: 'kitchen',
          component: () => import('@/pages/views/kitchen.vue')
        },
        {
          path: '/mine',
          name: 'mine',
          component: () => import('@/pages/views/mine.vue')
        }
      ]
    }
  ]
})
