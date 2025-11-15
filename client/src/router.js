import { createRouter, createWebHashHistory } from "vue-router";
import { useDataStore } from "./store/store";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("./pages/main.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: () => {
      const dataStore = useDataStore();
      return dataStore.isAuth ? "/home" : "/login";
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const dataStore = useDataStore();

  if (!dataStore.logged && dataStore.token) {
    await dataStore.checkAuth();
  }

  const requiresAuth = to.meta.requiresAuth;
  const isAuthenticated = dataStore.logged;

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && isAuthenticated) {
    next("/home");
  } else {
    next();
  }
});

export default router;
