import { reactive } from 'vue'
import { defineStore } from 'pinia'
import api from '@/stores/Helpers/axios'

export const useRecruiterCommonStore = defineStore('recruiterCommonStore', () => {
    const applicants = reactive<{
        showing: 'list' | 'details',
        currentIdShowing: string
    }>({
        showing: 'list',
        currentIdShowing: ''
    })

    const jobPosting = reactive({
        modal: false,
        stage: 1
    })

    const jobPostingDropdowns = reactive<any>({
        jobFunctions: [],
        jobIndustries: [],
        jobTypes: [],
        jobLevels: [],
        skills: [],
    })


    async function loadJobPostingDropdowns() {
        try {
            const functions = await api.jobFunctions()
            jobPostingDropdowns.jobFunctions = functions.data.body
            const levels = await api.jobLevels()
            jobPostingDropdowns.jobLevels = levels.data.body
            const types = await api.jobTypes()
            jobPostingDropdowns.jobTypes = types.data.body
            const industries = await api.jobIndustries()
            jobPostingDropdowns.jobIndustries = industries.data.body
            const skills = await api.skills()
            jobPostingDropdowns.skills = skills.data.body
        } catch (error) {
            console.log(error);

        }
    }




    const jobPostingFields = reactive<any>({
        job_level_id: '',
        job_function_id: '',
        industry_id: '',
        job_type_id: '',
        title: '',
        required_skills: [],
        min_salary: '',
        max_salary: '',
        deadline: new Date(),
        location: '',

        description: '',
        qualifications: null,
        experience: '',
        other_qualifications: '',
        responsibilities: '',

        capacity: '',
        // status: '',

        benefits: [],

        temp_responsibilities: [{ descriptions: '' }],
        temp_WhoYouAre: [{ descriptions: '' }],
        temp_niceToHave: [{ descriptions: '' }],
        isSaving: false
    })


    return {
        applicants,
        jobPosting,
        loadJobPostingDropdowns,
        jobPostingDropdowns,
        jobPostingFields
    }
})
