import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/stores/Helpers/axios'

export const useSubscriptionStore = defineStore('subscriptionStore', () => {
    interface ModalState {
        options: boolean;
        cardPayment: boolean;
        bankTransfer: boolean;
    }
    const modal = reactive<ModalState>({
        options: false,
        cardPayment: false,
        bankTransfer: false,
    })

    function launchModal(modalName: 'options' | 'cardPayment' | 'bankTransfer') {
        modal[modalName] = !modal[modalName]
    }


    const userPlans = ref<any[]>([])
    const recruiterPlans = ref<any[]>([])

    const recruiterPlanDetails = (plan_name: 'Free' | 'Premium') => {
        return recruiterPlans.value.find((x: { plan_name: string }) => x.plan_name == plan_name)
    }

    const userPlanDetails = (plan_name: 'Free' | 'Premium') => {
        return userPlans.value.find((x: { plan_name: string }) => x.plan_name == plan_name)
    }


    async function getSubscriptions() {
        const resp = await api.getSubscriptions()
        const data = resp?.data?.data ?? []

        userPlans.value = data.filter((x: { type: string }) => x.type == 'user')
        recruiterPlans.value = data.filter((x: { type: string }) => x.type == 'recruiter')
    }

    return { modal, launchModal, getSubscriptions, recruiterPlanDetails, userPlanDetails }
})
