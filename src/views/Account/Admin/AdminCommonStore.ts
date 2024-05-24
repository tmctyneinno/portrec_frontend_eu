import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAdminCommonStore = defineStore('adminCommonStore', () => {
    const applicants = reactive<{
        showing: 'list' | 'details',
        currentIdShowing: string
    }>({
        showing: 'list',
        currentIdShowing: ''
    })


    return { applicants }
})
