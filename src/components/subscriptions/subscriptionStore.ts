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

    // loading subscription details ################################
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
    // #######################################################################


    // initiating payments ################################
    function launchModal(modalName: 'options' | 'cardPayment' | 'bankTransfer', premiumAmount = 0, userType = 'user') {
        userPaymentOptions.premiumPrice = premiumAmount
        modal[modalName] = !modal[modalName]
    }

    const userPaymentOptions = reactive({
        durations: [
            { label: 'One month', value: 1 },
            { label: 'Two months', value: 2 },
            { label: 'Three months', value: 3 },
            { label: 'Six months', value: 6 },
            { label: 'One year', value: 12 },
            { label: 'Two years', value: 24 },
        ],
        duration: 1,
        premiumPrice: 0,
        subscription_id: '2',
        amount: 0,
        payment_method: 'flutterwave',
        userType: 'user',
        isInitiating: false,

    })

    async function initiatePayment() {
        userPaymentOptions.isInitiating = true
        try {
            const formData = new FormData();
            formData.append('payment_method', userPaymentOptions.payment_method)
            formData.append('amount', (userPaymentOptions.duration * userPaymentOptions.premiumPrice).toString())
            formData.append('duration', (30 * userPaymentOptions.duration).toString())
            formData.append('subscription_id', userPaymentOptions.subscription_id)
            const initiate = userPaymentOptions.userType === 'user'
                ? api.userInitiatePayment
                : api.recruiterInitiatePayment;

            const resp = await initiate(formData);
            if (resp.data?.link)
                // window.open(resp.data.link, '_blank')
                window.location = resp.data.link

            userPaymentOptions.isInitiating = false
            modal.options = !modal.options


        } catch (error) {
            userPaymentOptions.isInitiating = false
        }

    }

    // #######################################################################

    return {
        modal,
        userPaymentOptions,
        launchModal,
        getSubscriptions,
        recruiterPlanDetails,
        userPlanDetails,
        initiatePayment
    }
})
