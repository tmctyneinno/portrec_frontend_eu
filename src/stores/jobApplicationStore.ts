import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/stores/Helpers/axios'
import { useStorage } from '@vueuse/core'

export const useJobApplicationStore = defineStore('jobApplicationStore', () => {
    const currentModal = ref(0)
    const modalOpen = ref(false)
    const currentJob: any = useStorage('protrec_$current_job', [], sessionStorage)
    const loading = ref<boolean>(false)

    const applyData = reactive({

    })

    function switchModal(num: number) {
        currentModal.value = (0 > num) ? currentModal.value - 1 : currentModal.value + 1;
    }

    async function currentJobQuery(id: any) {
        try {
            // currentJob.value = [];
            const resp = await api.jobDetails(id)
            if (resp.status == 200)
                currentJob.value = resp.data.body
        } catch (error) {
            console.log(error);
        }
        finally {
            loading.value = false
        }
    }

    return {
        loading,
        currentModal,
        modalOpen,
        applyData,
        currentJob,
        switchModal,
        currentJobQuery,
    }
})
