// index.js
import { createRouter, createWebHistory } from 'vue-router'
import clientRoutes from './client.route'
import adminRoutes from './admin.router'

const routes = [
  ...clientRoutes,
  ...adminRoutes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
