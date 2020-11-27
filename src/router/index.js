import Vue from 'vue'
import Store from '../store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/HomePage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/forgetPassword',
        name: 'ForgetPassword',
        component: () => import('../views/ForgetPassword.vue')
    },
    {
        path: '/competition',
        name: 'Competition',
        component: () => import('../views/Competition.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/competitionInfo',
        name: 'CompetitionInfo',
        component: () => import('../views/CompetitionInfo.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/certificate',
        name: 'Certificate',
        component: () => import('../views/Certificate.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/certificateInfo',
        name: 'CertificateInfo',
        component: () => import('../views/CertificateInfo.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/chat',
        name: 'Chat',
        component: () => import('../views/Chat.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/chatPage',
        name: 'ChatPage',
        component: () => import('../views/ChatPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/mine',
        name: 'Mine',
        component: () => import('../views/Mine.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/personInfo',
        name: 'PersonInfo',
        component: () => import('../views/PersonInfo.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/myEnroll',
        name: 'MyEnroll',
        component: () => import('../views/MyEnroll.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/myCollection',
        name: 'MyCollection',
        component: () => import('../views/MyCollection.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/myInfo',
        name: 'MyInfo',
        component: () => import('../views/MyInfo.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/myTeam',
        name: 'MyTeam',
        component: () => import('../views/MyTeam.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/modifyPassword',
        name: 'ModifyPassword',
        component: () => import('../views/ModifyPassword.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/moreRoute',
        name: 'MoreRoute',
        component: () => import('../views/MoreRoute.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/searchPage',
        name: 'SearchPage',
        component: () => import('../views/SearchPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/personalIntroduce',
        name: 'PersonalIntroduce',
        component: () => import('../views/PersonalIntroduce.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/createTeam',
        name: 'CreateTeam',
        component: () => import('../views/CreateTeam.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/groupInfo',
        name: 'GroupInfo',
        component: () => import('../views/GroupInfo.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/teamInfo',
        name: 'TeamInfo',
        component: () => import('../views/TeamInfo.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/application',
        name: 'Application',
        component: () => import('../views/Application.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/applicationInfo',
        name: 'ApplicationInfo',
        component: () => import('../views/ApplicationInfo.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/privateChat',
        name: 'PrivateChat',
        component: () => import('../views/PrivateChat.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/privateChatInfo',
        name: 'PrivateChatInfo',
        component: () => import('../views/PrivateChatInfo.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: "/feedback",
        name: 'FeedBack',
        component: () => import('@/views/FeedBack.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: "/jointeam",
        name: 'JoinTeam',
        component: () => import('@/views/JoinTeam.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: "/addImg",
        name: 'AddImg',
        component: () => import('@/views/AddImg.vue'),
        meta: { requiresAuth: true }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!Store.state.userinfo.id) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
        next()
    } else {
        next()
    }
})

export default router
