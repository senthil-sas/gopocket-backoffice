import { createRouter, createWebHistory } from 'vue-router'


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
      redirect:'/dashboard',
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
