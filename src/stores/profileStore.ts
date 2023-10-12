// import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
// import api from '@/stores/Helpers/axios'
import { useStorage } from '@vueuse/core'

export const useProfileStore = defineStore('profileStore', () => {
    const token: any = useStorage('protrec_$authTkn', '', localStorage)
    const userType: any = useStorage('protrec_$accType', '', localStorage)



    return {
        token,
        userType
    }
})
