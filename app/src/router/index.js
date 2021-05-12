import Vue from 'vue'
import Router from 'vue-router'
import firebase from "firebase/app";
import {
  DEPARTMENTS_PATH,
  IMPORT_PATH,
  LISTS_PATH,
  LOGIN_PATH,
  MAIN_PATH,
  PROFILE_PATH,
  RECRUITMENT_PATH
} from "@/utils/path";

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: LOGIN_PATH,
      name: 'login',
      meta: {layout: 'empty'},
      component: () => import('../views/Login.vue')
    },
    // {
    //   path: '/registration',
    //   name: 'register',
    //   meta: {layout: 'empty'},
    //   component: () => import('../views/Registration.vue')
    // },
    {
      path: IMPORT_PATH,
      name: 'home',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Home.vue')
    },
    {
      path: DEPARTMENTS_PATH,
      name: 'Departments',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Departments.vue'),
    },
    {
      path: '/:process/:id',
      name: 'Department',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Department.vue'),
    },
    {
      path: '/:process/:id/:name',
      name: 'Worker',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Worker.vue')
    },
    {
      path: PROFILE_PATH,
      name: 'profile',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Profile.vue')
    },
    {
      path: LISTS_PATH,
      name: 'WorkerLists',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/WorkerLists.vue')
    },
    {
      path: RECRUITMENT_PATH,
      name: 'Recruitment',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Recruitment.vue')
    },
    {
      path: MAIN_PATH,
      name: 'newWorkerList',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/newWorkerList.vue')
    }, {
      path: '*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
});

router.beforeEach((to, from, next)=>{
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if(requireAuth && !currentUser){
    next('/login?message=login')
  }else {
    next()
  }

});

export default router


