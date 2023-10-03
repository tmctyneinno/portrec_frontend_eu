// import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useContentStore = defineStore('contents', () => {
  const navBarMenus: any[] = [
    {
      title: 'Find Jobs',
      routePath: '/find-jobs'
    },
    {
      title: 'About Us',
      routePath: '/about-us'
    },
    {
      title: 'Contact',
      routePath: '/contact'
    }
  ]


  return { navBarMenus }
})
