import Vue from 'vue'
import Router from 'vue-router'
import webMain from '@/components/webMain'
import flogin from '@/components/Auth/firmAuth/firmlogin'
import fregiste from '@/components/Auth/firmAuth/firmregiste'
import ulogin from '@/components/Auth/userAuth/userlogin'
import uregiste from '@/components/Auth/userAuth/userregiste'
import auth from '@/components/Auth/auth'
import Vuex from 'vuex'
import 'es6-promise/auto'
Vue.use(Router)
Vue.use(Vuex)
export default new Router({
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: auth
    },
    {
      path: '/flogin',
      name: 'flogin',
      component: flogin
    }, {
      path: '/fregiste',
      name: 'fregiste',
      component: fregiste
    }, {
      path: '/ulogin',
      name: 'ulogin',
      component: ulogin
    }, {
      path: '/uregiste',
      name: 'uregiste',
      component: uregiste
    }, {
      path: '/',
      name: 'webMain',
      component: webMain
    },

  ]
})
