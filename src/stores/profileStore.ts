import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import api from '@/stores/Helpers/axios'

export const useProfileStore = defineStore('profileStore', () => {
    const token: any = useStorage('protrec_$authTkn', '', localStorage)
    const userType: any = useStorage('protrec_$accType', '', localStorage)
    const userData: any = useStorage('protrec_$user_profile', null, sessionStorage)
    const avatar = ref<string>('')

    function logout() {
        token.value = '';
        userType.value = '';
        userData.value = null;
        console.log(token);
        console.log(userType.value);
        console.log(userData.value);

    }

    async function getProfile(type = 'user') {
        try {
            const resp = type == 'user' ? await api.userProfile() : await api.recruiterProfile();
            console.log(resp);
            if (resp.status === 201) {
                userData.value = JSON.stringify(resp.data.body)
                avatar.value = resp.data.body.profile_pic ? resp.data.body.profile_pic.image : 'https://via.placeholder.com/150'
                // console.log('profile', JSON.parse(profile.value));
            }
        } catch (error) {
            console.log(error);

        }
    }

    const data = computed(() => JSON.parse(userData.value))
    const profile = computed(() => data.value?.profile)

    return {
        token,
        userType,
        data,
        avatar,
        logout,
        getProfile,
        profile
    }
})
