/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/General/LandingPage/_landingPageVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: LandingPage
    },
    {
      path: '/about_us',
      name: 'About Us',
      component: () => import('../views/General/aboutVue.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/General/logInVue.vue')
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: () => import('../views/General/signUpVue.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/PageNotFoundVue.vue')
    },
  ]
})

router.afterEach((to, from) => {
  document.title = "PORTREC | " + to.name?.toString()
})

export default router
