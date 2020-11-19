import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/competition',
    name: 'Competition',
    component: () => import('../views/Competition.vue')
  },
  {
    path: '/competitionInfo',
    name: 'CompetitionInfo',
    component: () => import('../views/CompetitionInfo.vue')
  },
  {
    path: '/certificate',
    name: 'Certificate',
    component: () => import('../views/Certificate.vue')
  },
  {
    path: '/certificateInfo',
    name: 'CertificateInfo',
    component: () => import('../views/CertificateInfo.vue')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/Chat.vue')
  },
  {
    path: '/chatPage',
    name: 'ChatPage',
    component: () => import('../views/ChatPage.vue')
  },
  {
    path:'/mine',
    name:'Mine',
    component: () => import('../views/Mine.vue')
  },
  {
    path:'/personInfo',
    name:'PersonInfo',
    component: () => import('../views/PersonInfo.vue')
  },
  {
    path:'/myEnroll',
    name:'MyEnroll',
    component: () => import('../views/MyEnroll.vue')
  },
  {
    path:'/myCollection',
    name:'MyCollection',
    component: () => import('../views/MyCollection.vue')
  },
  {
    path:'/myInfo',
    name:'MyInfo',
    component: () => import('../views/MyInfo.vue')
  },
  {
    path:'/myTeam',
    name:'MyTeam',
    component: () => import('../views/MyTeam.vue')
  },
  {
    path:'/modifyPassword',
    name:'ModifyPassword',
    component: () => import('../views/ModifyPassword.vue')
  },
  {
    path:'/forgetPassword',
    name:'ForgetPassword',
    component: () => import('../views/ForgetPassword.vue')
  },
  {
    path:'/moreRoute',
    name:'MoreRoute',
    component: () => import('../views/MoreRoute.vue')
  },
  {
    path:'/searchPage',
    name:'SearchPage',
    component: () => import('../views/SearchPage.vue')
  },
  {
    path:'/personalIntroduce',
    name:'PersonalIntroduce',
    component: () => import('../views/PersonalIntroduce.vue')
  },
  {
    path:'/createTeam',
    name:'CreateTeam',
    component: () => import('../views/CreateTeam.vue')
  },
  {
    path:'/groupInfo',
    name:'GroupInfo',
    component: () => import('../views/GroupInfo.vue')
  },
  {
    path:'/teamInfo',
    name:'TeamInfo',
    component: () => import('../views/TeamInfo.vue')
  },
  {
    path:'/application',
    name:'Application',
    component: () => import('../views/Application.vue')
  },
  {
    path:'/applicationInfo',
    name:'ApplicationInfo',
    component: () => import('../views/ApplicationInfo.vue')
  },
  {
    path:'/privateChat',
    name:'PrivateChat',
    component: () => import('../views/PrivateChat.vue')
  },
  {
    path:'/privateChatInfo',
    name:'PrivateChatInfo',
    component: () => import('../views/PrivateChatInfo.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
