import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useApplicationStore = defineStore('applicationStore', () => {
    const currentModal = ref(0)
    const modalOpen = ref(false)
    const job = reactive({
        title: 'Social Media Assistant',
        company: 'Nomad',
        location: 'Paris, France',
        typee: 'Full-Time',
        icon: ''
    })

    const applyData = reactive({

    })

    function switchModal(num: number) {
        currentModal.value = (0 > num) ? currentModal.value - 1 : currentModal.value + 1;
    }

    return { currentModal, job, modalOpen, applyData, switchModal }
})
