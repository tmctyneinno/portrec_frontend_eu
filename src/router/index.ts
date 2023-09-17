import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/General/LandingPage/_indexVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: LandingPage
    },
    {
      path: '/about_us',
      name: 'About Us',
      component: () => import('../views/General/AboutUs/_indexVue.vue')
    }
  ]
})

export default router
