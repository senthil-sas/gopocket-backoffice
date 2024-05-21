import { createRouter, createWebHistory } from 'vue-router'
import store from "../store";
import common from "../mixins/common.js"


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
        { path: '/mis_report', name: 'misreport', component: () => import('../views/misReport/misReport.vue') },
        { path: '/action', name: 'action', component: () => import('../views/action.vue') },
        { path: '/profile', name: 'profile', component: () => import('../views/profile.vue') },
      ],
    },
  ]
})

export default router



router.beforeEach((to, from, next) => {
  let isOldLogin = false
  const clientId = localStorage.getItem("clientId") && localStorage.getItem("clientId") != "undefined" ? checkJSON('clientId') : null;
  const sessionId = localStorage.getItem("sessionId") && localStorage.getItem("sessionId") != "undefined" ? checkJSON('sessionId') : null;

  common.methods.getDocumentTitle(to);

  if (to.query && Object.keys(to.query).length == 0) {
    if (clientId) {
      store.commit("auth/setUserId", clientId);
    }

    if (sessionId) {
      store.commit("auth/setSessionId", sessionId);
    }

    isOldLogin = clientId && sessionId ? true : false;
  }
  if (isOldLogin && from.path === "/" && to.path === "/") {
    next({ path: "dashboard" });
  } else if (!isOldLogin && to.path !== "/") {
    next({ path: "" });
  } else {
    next();
  }
});

function checkJSON(data) {
  try {
    return JSON.parse(localStorage.getItem(data))
  } catch (err) {
    return localStorage.getItem(data)
  }
}