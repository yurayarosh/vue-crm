import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'form' },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'form' },
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/',
    name: 'Home',    
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('@/views/Categories.vue'),
  },
  {
    path: '/detail-record/:id',
    name: 'DetailRecord',
    component: () => import('@/views/DetailRecord.vue'),
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/History.vue'),
  },
  {
    path: '/planning',
    name: 'Planning',
    component: () => import('@/views/Planning.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('@/views/Record.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
