import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SuccessfulDecision from '../components/PositiveDecision.vue'
import NegativeDecision from '../components/NegativeDecision.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/successful',
      name: 'SuccessfulDecision',
      component: SuccessfulDecision,
    },
    {
      path: '/negative',
      name: 'NegativeDecision',
      component: NegativeDecision,
    },
  ],
})

export default router
