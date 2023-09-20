// import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useContentStore = defineStore('contents', () => {
  const navBarMenus: any[] = [
    {
      title: 'Find Jobs',
      route: '/find_jobs'
    },
    {
      title: 'About Us',
      route: '/about_us'
    }
  ]


  return { navBarMenus }
})
