import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useSignupStore = defineStore('signupStore', () => {

    const form = reactive<any>({
        // step1
        name: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
        passwordDisplay: 'password',
        password2Display: 'password',

        // step 2
        about_me: '',
        industry: '',
        skills: [],
        desired_pay: '',
        desired_pay_currency: 'Naira',

        isLoading: false,
        step: '1',
    })

    return { form }
})
