import Vue from 'vue'
import Router from 'vue-router'
import point from '@/components/point'
import auth from '@/components/auth'
import cabinet from '@/components/cabinet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'point',
      component: point
    },
    {
      path: '/login',
      name: 'sign_in',
      component: auth
    },
    {
      path: '/registration',
      name: 'sign_up',
      component: auth
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: cabinet
    }
  ]
})
