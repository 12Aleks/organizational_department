import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'empty'},
      component: () => import('../views/Login.vue')
    },
    {
      path: '/registration',
      name: 'register',
      meta: {layout: 'empty'},
      component: () => import('../views/Registration.vue')
    },
    {
      path: '/',
      name: 'home',
      meta: {layout: 'main'},
      component: () => import('../views/Home.vue')
    },
    {
      path: '/departments',
      name: 'Departments',
      meta: {layout: 'main'},
      component: () => import('../views/Departments.vue')
    },
    {
      path: '/department/:id',
      name: 'Department',
      meta: {layout: 'main'},
      component: () => import('../views/Department.vue')
    },
    {
      path: '/worker',
      name: 'Worker',
      meta: {layout: 'main'},
      component: () => import('../views/Worker.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main'},
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/lists',
      name: 'WorkerLists',
      meta: {layout: 'main'},
      component: () => import('../views/WorkerLists.vue')
    },
    {
      path: '/recruitment',
      name: 'Recruitment',
      meta: {layout: 'main'},
      component: () => import('../views/Recruitment.vue')
    }
  ]
})


