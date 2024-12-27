import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

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

    const freePlan = ref([
        { desc: 'Build a complete profile to attract recruiters.', lineThrough: false },
        { desc: 'Start applying for jobs.', lineThrough: false },
        { desc: 'Attract more attention from top recruiters looking for talent.', lineThrough: true },
        { desc: 'Attract more attention from top recruiters looking for talent.', lineThrough: true },
        { desc: 'Gain an advantage over other others by being among the first profiles recruiters see.', lineThrough: true }
    ]);

    const premiumPlan = ref([
        { desc: 'Your profile appears on the first page of recruiter searches, making you stand out.', lineThrough: false },
        { desc: 'Attract more attention from top recruiters looking for talent.', lineThrough: false },
        { desc: 'Attract more attention from top recruiters looking for talent.', lineThrough: false },
        { desc: 'Gain an advantage over other others by being among the first profiles recruiters see.', lineThrough: false },
    ]);

    const premiumPrice = ref<number>(4000)

    function launchModal(modalName: 'options' | 'cardPayment' | 'bankTransfer') {
        modal[modalName] = !modal[modalName]
    }

    return { freePlan, premiumPlan, premiumPrice, modal, launchModal, }
})
