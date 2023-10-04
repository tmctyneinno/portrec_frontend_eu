import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import api from '@/stores/Helpers/axios'

export const useJobsStore = defineStore('jobs', () => {
  const allJobs = ref<any[]>([]);
  const categories: any = useStorage('protrec_$cate', [], sessionStorage)
  const types = ref<any[]>([]);
  const functions = ref<any[]>([]);

  async function getAllJobs() {
    try {
      const resp = await api.allJobs()
      console.log(resp);

    } catch (error) {
      console.log(error);
    }

  }

  async function getJobTypes() {
    try {
      const resp: any = await api.jobTypes()
      if (resp.status == 200)
        types.value = resp.data.body
      console.log(resp);
    } catch (error) {
      console.log(error);
    }

  }

  async function getJobFunctions() {
    try {
      const resp: any = await api.jobFunctions()
      if (resp.status == 200)
        functions.value = resp.data.body
      console.log(resp);
    } catch (error) {
      console.log(error);
    }

  }

  async function getJobCategories() {
    try {
      const resp: any = await api.jobCategories()
      if (resp.status == 200)
        categories.value = resp.data.body
      // console.log(resp);
    } catch (error) {
      console.log(error);
    }

  }


  return {
    allJobs,
    categories,
    functions,
    types,
    getAllJobs,
    getJobTypes,
    getJobFunctions,
    getJobCategories
  }
})
