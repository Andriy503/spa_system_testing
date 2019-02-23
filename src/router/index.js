import Vue from 'vue'
import Router from 'vue-router'
import Point from '@/components/Point'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Point',
      component: Point
    }
  ]
})
