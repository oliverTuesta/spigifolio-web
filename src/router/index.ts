import { createRouter, createWebHistory } from 'vue-router'

import AddMovementView from '@/views/AddMovementView.vue'
import AssetsView from '@/views/AssetsView.vue'
import DashboardView from '@/views/DashboardView.vue'
import MovementsView from '@/views/MovementsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/assets', name: 'assets', component: AssetsView },
    { path: '/movements', name: 'movements', component: MovementsView },
    { path: '/add-movement', name: 'add-movement', component: AddMovementView },
  ],
})

export default router
