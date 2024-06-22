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
]

const router = createRouter({
   history: createWebHashHistory(),
   routes
})

export default router;