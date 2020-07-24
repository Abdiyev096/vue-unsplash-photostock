import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase/app'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'MainLayout',
      auth: true
    },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'AuthLayout',
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      layout: 'AuthLayout'
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    meta: {
      layout: 'MainLayout',
      auth: true
    },
    component: () => import('../views/Favorites.vue')
  },
  {
    path: '/history',
    name: 'History',
    meta: {
      layout: 'MainLayout',
      auth: true
    },
    component: () => import('../views/History.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(route => route.meta.auth)
  
  if(requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
