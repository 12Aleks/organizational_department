import Vue from 'vue'
import Router from 'vue-router'
import firebase from "firebase/app";

Vue.use(Router)

const router =  new Router({
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
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Home.vue')
    },
    {
      path: '/departments',
      name: 'Departments',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Departments.vue'),
      children: [
        {
          path: '/:process',
          name: 'Process',
          meta: {layout: 'main', auth: true},
          component: () => import('../views/Process.vue'),
          children:  [
            {
              path: '/:id',
              name: 'Department',
              meta: {layout: 'main', auth: true},
              component: () => import('../views/Department.vue'),
            }
          ]
        }
      ]
    },
    {
      path: '/worker',
      name: 'Worker',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Worker.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/lists',
      name: 'WorkerLists',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/WorkerLists.vue')
    },
    {
      path: '/recruitment',
      name: 'Recruitment',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Recruitment.vue')
    },
    {
      path: '/new_workers',
      name: 'newWorkerList',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/newWorkerList.vue')
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


