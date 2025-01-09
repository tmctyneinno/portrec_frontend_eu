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



    const userPlans = ref<any[]>([])
    const recruiterPlans = ref<any[]>([])

    const recruiterPlanDetails = (plan_name: 'Free' | 'Premium') => {
        return recruiterPlans.value.find((x: { plan_name: string }) => x.plan_name == plan_name)
    }

    const userPlanDetails = (plan_name: 'Free' | 'Premium') => {
        return userPlans.value.find((x: { plan_name: string }) => x.plan_name == plan_name)
    }

    const freePlan = ref([
        { desc: 'Build a complete profile to attract recruiters.', lineThrough: false },
        { desc: 'Start applying for jobs.', lineThrough: false },
        { desc: 'Attract more attention from top recruiters looking for talent.', lineThrough: true },
        { desc: 'Gain an advantage over other others by being among the first profiles recruiters see.', lineThrough: true }
    ]);

    const premiumPlan = ref([
        { desc: 'Your profile appears on the first page of recruiter searches, making you stand out.', lineThrough: false },
        { desc: 'Attract more attention from top recruiters looking for talent.', lineThrough: false },
        { desc: 'Gain an advantage over other others by being among the first profiles recruiters see.', lineThrough: false },
    ]);

    const premiumPrice = ref<number>(4000)

    function launchModal(modalName: 'options' | 'cardPayment' | 'bankTransfer') {
        modal[modalName] = !modal[modalName]
    }



    async function getSubscriptions() {
        const resp = await api.getSubscriptions()
        const data = resp?.data?.data ?? []

        userPlans.value = data.filter((x: { type: string }) => x.type == 'user')
        recruiterPlans.value = data.filter((x: { type: string }) => x.type == 'recruiter')
    }

    return { freePlan, premiumPlan, premiumPrice, modal, launchModal, getSubscriptions, recruiterPlanDetails, userPlanDetails }
})
