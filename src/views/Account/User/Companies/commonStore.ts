import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('commonStore', () => {
    const pageToShow = ref<'all' | 'details'>('all')
    return {
        pageToShow
    }
})
