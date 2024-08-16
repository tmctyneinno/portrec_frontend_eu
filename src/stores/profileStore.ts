import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import api from '@/stores/Helpers/axios'
// @ts-ignore
import Cookies from 'js-cookie';

export const useProfileStore = defineStore('profileStore', () => {
    const token: any = ref('')
    const userType: any = ref('')
    const userData: any = useStorage('protrec_$user_profile', null, sessionStorage)
    const avatar = ref<string>('')

    const isLoggedIn = computed(() => token.value || Cookies.get('PortrecTkn'));
    const getUserType = computed(() => userType.value || Cookies.get('PortrecUserType'))


    const login = (tokenStr: string, loginType = 'user') => {
        Cookies.set('PortrecTkn', tokenStr, { expires: 7 });
        token.value = tokenStr;

        Cookies.set('PortrecUserType', loginType, { expires: 7 });
        userType.value = loginType;
    }


    function logout() {
        Cookies.remove('PortrecTkn');
        Cookies.remove('PortrecUserType');
        token.value = '';
        userType.value = '';
        userData.value = null;
        window.location.reload()
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
        login,
        logout,
        getProfile,
        profile,
        isLoggedIn,
        getUserType
    }
})
