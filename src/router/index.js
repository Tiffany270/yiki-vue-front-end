import Vue from 'vue'
import Router from 'vue-router'
import webMain from '@/components/webMain'
import flogin from '@/components/Auth/firmAuth/firmlogin'
import fregiste from '@/components/Auth/firmAuth/firmregiste'
import ulogin from '@/components/Auth/userAuth/userlogin'
import uregiste from '@/components/Auth/userAuth/userregiste'
import userResume from '@/components/postinfo/userResume'
import firmInfo from '@/components/postinfo/firmInfo'

import aboutFirm from '@/components/selfInfo/aboutFirm'
import detail from '@/components/selfInfo/detail'

import auth from '@/components/Auth/auth'

import mainFirm from '@/components/main/mainFirm'
import mainJD from '@/components/main/mainJD'


import Vuex from 'vuex'
import 'es6-promise/auto'
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
///----------是post资料的跳转表单
{
  path: '/firmInfo',
  name: 'firmInfo',
  component: firmInfo
},

{
  path: '/myResume',
  name: 'userResume',
  component: userResume
},
//-------------展示页
{
  path: '/detail',
  name: 'detail',
  component: detail
},
{
  path: '/about',
  name: 'aboutFirm',
  component: aboutFirm
},
//------点击后附带ID跳进对应的页面
{
  path: "/mainFirm/:id",
  component: mainFirm,
  name: 'mainFirm'
},
{
  path: "/mainJD/:id",
  component: mainJD,
  name: 'mainJD'
}
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



