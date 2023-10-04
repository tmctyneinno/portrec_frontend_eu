/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router'
import public_routes from './public_routes'
import account_routes from './account_routes'

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
    ...public_routes,
    ...account_routes
  ]
})

router.afterEach((to, from) => {
  document.title = "PORTREC | " + to.name?.toString()
})

export default router
