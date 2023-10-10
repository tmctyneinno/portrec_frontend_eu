import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/stores/Helpers/axios'
import { useStorage } from '@vueuse/core'

export const useJobApplicationStore = defineStore('jobApplicationStore', () => {
    const currentModal = ref(0)
    const modalOpen = ref(false)
    const currentJobId: any = useStorage('protrec_$current_job_id', '', sessionStorage)
    const currentJob: any = useStorage('protrec_$current_job', [], sessionStorage)
    const loading = ref<boolean>(false)

    const applyData = reactive({

    })

    function switchModal(num: number) {
        currentModal.value = (0 > num) ? currentModal.value - 1 : currentModal.value + 1;
    }

    async function currentJobQuery() {
        try {
            // currentJob.value = [];
            const resp = await api.jobDetails(currentJobId.value)
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
        currentJobId,
        switchModal,
        currentJobQuery,
    }
})
