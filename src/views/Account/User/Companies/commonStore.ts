import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('commonStore', () => {
    const pageToShow = ref<'all' | 'details'>('all')
    const searchString = ref<string>('')
    const isSearching = ref<boolean>(false)
    const searchIsClicked = ref<boolean>(false)
    return {
        pageToShow,
        searchString,
        isSearching,
        searchIsClicked
    }
})
