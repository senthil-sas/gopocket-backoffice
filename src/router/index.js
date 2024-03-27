import { createRouter, createWebHistory } from 'vue-router'
import store from "../store";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login/login.vue'),
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'home',
      component: () => import('../components/main.vue'),
      children: [
        { path: '/dashboard', name: 'dashboard', component: () => import('../views/dashboard.vue') },
        { path: '/reports', name: 'reports', component: () => import('../views/reports/reports.vue') },
        { path: '/holdings', name: 'holdings', component: () => import('../views/portfolio.vue') },
        { path: '/action', name: 'action', component: () => import('../views/action.vue') },
        { path: '/profile', name: 'profile', component: () => import('../views/profile.vue') },
      ],
    },
  ]
})

export default router



router.beforeEach((to, from, next) => {
  const clientId = localStorage.getItem("clientId");
  const sessionId = localStorage.getItem("sessionId");

  if (clientId !== null) {
    store.commit("auth/setUserId", clientId);
  }

  if (sessionId !== null) {
    store.commit("auth/setSessionId", sessionId);
  }

  const isValidSession = sessionId !== null && sessionId !== "undefined";
  const isValidClientId = clientId !== null && clientId !== "undefined";

  if (isValidSession && isValidClientId && from.path === "/" && to.path === "/") {
    next({ path: "dashboard" });
  } else if ((!isValidSession || !isValidClientId) && to.path !== "/") {
    next({ path: "" });
  } else {
    next();
  }
});
