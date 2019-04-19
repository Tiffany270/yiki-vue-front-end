import Vue from 'vue'
import Router from 'vue-router'
import webMain from '@/components/webMain'
import flogin from '@/components/Auth/firmAuth/firmlogin'
import fregiste from '@/components/Auth/firmAuth/firmregiste'
import ulogin from '@/components/Auth/userAuth/userlogin'
import uregiste from '@/components/Auth/userAuth/userregiste'
import userInfo from '@/components/info/userInfo'
import firmInfo from '@/components/info/firmInfo'
import auth from '@/components/Auth/auth'
import Vuex from 'vuex'
import 'es6-promise/auto'
import VueRouter from 'vue-router';
Vue.use(Router)
Vue.use(Vuex)


const routes = [{
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
{
  path: '/userInfo',
  name: 'userInfo',
  component: userInfo
},
{
  path: '/firmInfo',
  name: 'firmInfo',
  component: firmInfo
},
]

const router = new Router({
  routes
})

export default router

// router.beforeEach((to, from, next) => {

//   // if (to.meta.auth) {

//   // } else {
//   //   next();
//   // }
// })



