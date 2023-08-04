import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/contas_view',
    name: 'ContasView',
    component: () => import( '../views/ContasView.vue')
  },
  {
    path: '/users_view',
    name: 'UsersView',
    component: () => import( '../views/UsersView.vue')
  },
  {
    path: '/relatorios_view',
    name: 'RelatoriosView',
    component: () => import('../views/RelatoriosView.vue')
  }
]



const router = new VueRouter({
  routes
})

export default router
