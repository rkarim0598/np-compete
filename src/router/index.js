import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'NP Compete',
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About - NP Compete',
    },
  },
  {
    path: '/nonprofits',
    name: 'nonprofits',
    component: () => import(/* webpackChunkName: "nonprofits" */ '../views/Nonprofits.vue'),
    meta: {
      title: 'Nonprofits - NP Compete',
    },
  },
  {
    path: '/nonprofits/:id',
    name: 'nonprofit',
    component: () => import(/* webpackChunkName: "nonprofit" */ '../views/Nonprofit.vue'),
    meta: {
      title: false,
    },
  },
  {
    path: '/nonprofits/:id/donate',
    name: 'donate',
    component: () => import(/* webpackChunkName: "donate" */ '../views/Donate.vue'),
    meta: {
      title: false,
    },
  },
]

const router = new VueRouter({
  routes
})

export default router
