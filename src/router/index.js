import { createRouter, createWebHistory } from 'vue-router'
import coa from '../views/coa.vue'
import inventory from '../views/inventory.vue'

const routes = [
  {
    path: '/',
    name: 'coa',
    component: coa
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
