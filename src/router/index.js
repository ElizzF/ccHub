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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
