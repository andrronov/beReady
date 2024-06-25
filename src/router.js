import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
   {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login.vue')
   },
   {
      path: '/home',
      name: 'home',
      component: () => import('./pages/main.vue')
   },
   {
      path: '/test',
      name: 'test',
      component: () => import('./pages/test.vue')
   },
]

const router = createRouter({
   history: createWebHashHistory(),
   routes
})

// router.beforeEach(async (to, from) => {
//    if(!localStorage.getItem('token') && to.name !== 'login'){
//       return {path: '/login'}
//    }
// })

export default router;