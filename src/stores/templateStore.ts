import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useTemplateStore = defineStore('template', () => {
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

  const themeColors = reactive({
    color1: '#873A70',
    color2: '#1AB2B5',
    color1_soft: '#873A7007',
    color2_soft: '#1AB2B507',
  })


  return { navBarMenus, themeColors }
})
