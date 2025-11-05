import { createRouter, createWebHashHistory  } from 'vue-router'
import store from "../store";
import common from "../mixins/common.js"


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
  store.commit('setLoader', false)
  const isQuery = to.query.hasOwnProperty('authCode')
  const queryUserId = to.query.userId
  const clientId = localStorage.getItem("clientId");
  let userId = ''
  
  if(isQuery && queryUserId) {
    userId = queryUserId
  } else if(clientId !== null) {
    userId = clientId
  }
  if(userId) {
    store.commit("auth/setUserId", userId);
  }
  const sessionId = localStorage.getItem("sessionId");
  common.methods.getDocumentTitle(to);
  
  if (sessionId !== null) {
    store.commit("auth/setSessionId", sessionId);
  }

  const isValidSession = sessionId !== null && sessionId !== "undefined";
  const isValidClientId = userId !== null && userId !== "undefined";
  if (isValidSession && isValidClientId && from.path === "/" && to.path === "/" && !isQuery && (!to.query.hasOwnProperty('logout') || !from.query.hasOwnProperty('logout'))) {
    next({ path: "dashboard" });
  } else if ((!isValidSession || !isValidClientId) && to.path !== "/" && !to.query.hasOwnProperty('logout')) {
    next({ path: "/" });
  } else {
    next();
  }
});
