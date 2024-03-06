import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import api from '@/stores/Helpers/axios'

export const useProfileStore = defineStore('profileStore', () => {
    const token: any = useStorage('protrec_$authTkn', '', localStorage)
    const userType: any = useStorage('protrec_$accType', '', localStorage)
    const userProfile: any = useStorage('protrec_$user_profile', null, sessionStorage)
    // const data = ref<any>(null)
    const avatar = ref<string>('')

    function logout() {
        token.value = '';
        userType.value = '';
        userProfile.value = null;
    }

    async function getUserProfile() {
        const resp = await api.userProfile()
        console.log(resp);
        if (resp.status === 201) {
            userProfile.value = JSON.stringify(resp.data.body)
            avatar.value = resp.data.body.profile_pic ? resp.data.body.profile_pic.image : 'https://via.placeholder.com/150'
            console.log('profile', JSON.parse(userProfile.value));
        }
    }

    const data = computed(() => JSON.parse(userProfile.value))

    return {
        token,
        userType,
        data,
        avatar,
        logout,
        getUserProfile
    }
})
