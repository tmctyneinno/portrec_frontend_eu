import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import api from '@/stores/Helpers/axios'

export const useJobsStore = defineStore('jobs', () => {
  // const functions = ref<any[]>([]);
  // const categories = ref<any[]>([]);
  // const latest = ref<any[]>([]);
  // const types = ref<any[]>([]);

  const allJobs = ref<any[]>([]);
  const categories: any = useStorage('protrec_$cate', [], sessionStorage)
  const latest: any = useStorage('protrec_$latest_jobs', [], sessionStorage)
  const types: any = useStorage('protrec_$jobTypes', [], sessionStorage)
  const functions: any = useStorage('protrec_$jobfunctions', [], sessionStorage)
  const loading = ref<boolean>(false)


  async function getAllJobs() {
    try {
      const resp = await api.allJobs()
      console.log(resp);

    } catch (error) {
      console.log(error);
    }
    finally {
      loading.value = false
    }
  }

  async function getJobTypes() {
    try {
      const resp: any = await api.jobTypes()
      if (resp.status == 200)
        types.value = resp.data.body
      console.log('jobtypes', resp.data.body);
    } catch (error) {
      console.log(error);
    }
    finally {
      loading.value = false
    }

  }

  async function getJobFunctions() {
    try {
      const resp: any = await api.jobFunctions()
      if (resp.status == 200)
        functions.value = resp.data.body
      console.log('jobfunctions', resp.data.body);
    } catch (error) {
      console.log(error);
    }
    finally {
      loading.value = false
    }

  }

  async function getJobCategories() {
    try {
      const resp: any = await api.jobCategories()
      if (resp.status == 200)
        categories.value = resp.data.body
      console.log('jobcategories', resp.data.body);
    } catch (error) {
      console.log(error);
    }
    finally {
      loading.value = false
    }

  }

  async function getLatestJobs() {
    try {
      const resp: any = await api.latestJobs()
      if (resp.status == 200)
        latest.value = resp.data.body
      console.log('latest jobs', resp);
    } catch (error) {
      console.log(error);
    }
    finally {
      loading.value = false
    }

  }


  return {
    loading,
    allJobs,
    categories,
    functions,
    types,
    latest,
    getAllJobs,
    getJobTypes,
    getJobFunctions,
    getJobCategories,
    getLatestJobs
  }
})
