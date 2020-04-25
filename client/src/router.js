import Vue from 'vue'
import VueRouter from 'vue-router'

import { About, Home, SetQuote, Suggestions } from './components'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/about',
    component: About
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/set-quote',
    component: SetQuote
  }, {
    path: '/suggestions',
    component: Suggestions
  }, {
    path: '*',
    redirect: '/home'
  }]
})
