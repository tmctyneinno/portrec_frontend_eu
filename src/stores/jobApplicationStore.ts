import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/stores/Helpers/axios'
import { useStorage } from '@vueuse/core'
import type { ApplyJobInterface } from '@/stores/interfaces'
import { useProfileStore } from './profileStore'

export const useJobApplicationStore = defineStore('jobApplicationStore', () => {
    const currentModal = ref<number>(0)
    const modalOpen = ref<boolean>(false)
    const currentJob: any = useStorage('protrec_$current_job', [], sessionStorage)
    const loading = ref<boolean>(false)
    const myProfile = useProfileStore()

    const applyData = reactive<ApplyJobInterface>({
        isAuthUser: false,
        fullname: '',
        email: '',
        phone: '',
        resume: '',
        resume_name: '',
        portfolio_url: '',
        cover_letter: '',
        answers: []
    })

    function resetForm(): void {
        (Object.keys(applyData) as Array<keyof typeof applyData>).forEach((x) => {
            if (x !== 'isAuthUser' && x !== 'answers') {
                applyData[x] = '';
            }
        });
        applyData.answers = [];
        applyData.isAuthUser = false;
    }

    function switchModal(num: number): void {
        currentModal.value += num
        // currentModal.value = (0 > num) ? currentModal.value - 1 : currentModal.value + 1;
    }

    async function currentJobQuery(id: any) {
        try {
            // currentJob.value = [];
            const resp = await api.jobDetails(id)
            if (resp.status == 200)
                currentJob.value = resp?.data?.body ?? []
        } catch (error) {
            console.log(error);
        }
        finally {
            loading.value = false
        }
    }

    return {
        myProfile,
        loading,
        currentModal,
        modalOpen,
        applyData,
        currentJob,
        switchModal,
        currentJobQuery,
        resetForm
    }
})
