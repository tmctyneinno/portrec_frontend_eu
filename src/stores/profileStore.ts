import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import api from '@/stores/Helpers/axios'

export const useProfileStore = defineStore('profileStore', () => {
    const token: any = useStorage('protrec_$authTkn', '', localStorage)
    const userType: any = useStorage('protrec_$accType', '', localStorage)
    const data: any = useStorage('protrec_$user_profile', null, localStorage)
    // const data = ref<any>(null)
    const avatar = ref<string>('')

    function logout() {
        token.value = '';
        userType.value = '';
        data.value = null;
    }

    async function getUserProfile() {
        const resp = await api.userProfile()

        if (resp.status === 201) {
            data.value = resp.data.body
            avatar.value = resp.data.body.profile_pic ? resp.data.body.profile_pic.image : 'https://via.placeholder.com/150'
            console.log('profile', data.value);
        }
    }

    return {
        token,
        userType,
        data,
        avatar,
        logout,
        getUserProfile
    }
})
