// import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useContentStore = defineStore('contents', () => {
  const navBarMenus: any[] = [
    {
      title: 'Find Jobs',
      route: '/find-jobs'
    },
    {
      title: 'About Us',
      route: '/about-us'
    },
    {
      title: 'Contact',
      route: '/contact'
    }
  ]


  return { navBarMenus }
})
