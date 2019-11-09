import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/nonprofits',
    name: 'nonprofits',
    component: () => import(/* webpackChunkName: "nonprofits" */ '../views/Nonprofits.vue'),
  },
  {
    path: '/nonprofits/:id',
    name: 'nonprofit',
    component: () => import(/* webpackChunkName: "nonprofit" */ '../views/Nonprofit.vue'),
  },
  {
    path: '/nonprofits/:id/donate',
    name: 'donate',
    component: () => import(/* webpackChunkName: "donate" */ '../views/Donate.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
