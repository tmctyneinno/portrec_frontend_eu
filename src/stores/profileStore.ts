import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useProfileStore = defineStore('profileStore', () => {
    const token: any = useStorage('protrec_$authTkn', '', localStorage)
    const userType: any = useStorage('protrec_$accType', '', localStorage)
    const data = ref<any>(null)

    return {
        token,
        userType,
        data
    }
})
