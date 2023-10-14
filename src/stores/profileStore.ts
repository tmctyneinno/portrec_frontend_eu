import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useProfileStore = defineStore('profileStore', () => {
    const token: any = useStorage('protrec_$authTkn', '', localStorage)
    const userType: any = useStorage('protrec_$accType', '', localStorage)
    const data = ref<any>(null)
    const avatar = ref<string>('')

    function logout() {
        token.value = '';
        userType.value = '';
        data.value = '';
    }

    return {
        token,
        userType,
        data,
        avatar,
        logout
    }
})
