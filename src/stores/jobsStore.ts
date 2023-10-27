/* eslint-disable no-prototype-builtins */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import api from '@/stores/Helpers/axios'

export const useJobsStore = defineStore('jobsStore', () => {
  // const functions = ref<any[]>([]);
  // const categories = ref<any[]>([]);
  // const latest = ref<any[]>([]);
  // const types = ref<any[]>([]);

  const categories: any = useStorage('protrec_$cate', [], sessionStorage)
  const types: any = useStorage('protrec_$jobTypes', [], sessionStorage)
  const levels: any = useStorage('protrec_$jobLevels', [], sessionStorage)
  const functions: any = useStorage('protrec_$jobfunctions', [], sessionStorage)
  const latest: any = useStorage('protrec_$latest_jobs', [], sessionStorage)
  const allJobsChunked: any = useStorage('protrec_$jobs_Chucked', [], sessionStorage)
  const allJobsData: any = useStorage('protrec_$jobs_data', [], sessionStorage)
  const loading = ref<boolean>(false)
  const queryObj = ref<any>({});
  const currentQueryStr = ref<string>('');

  const isFromSearch = ref<boolean>(false)


  function convertQueryObjToURL(page: number) {
    currentQueryStr.value = ''
    if (Object.keys(queryObj.value).length) {
      const keyValuePairs = [];
      for (const key in queryObj.value) {
        if (queryObj.value.hasOwnProperty(key)) {
          let value = queryObj.value[key];
          if (Array.isArray(value)) {
            value = value.map(item => encodeURIComponent(item)).join(',');
          } else {
            value = encodeURIComponent(value);
          }
          keyValuePairs.push(encodeURIComponent(key) + '=' + value);
        }
      }
      const str = '?' + keyValuePairs.join('&');
      currentQueryStr.value = `${str}&page=${page}`;

    }
    else {
      currentQueryStr.value = '?page=' + page;
    }
  }


  async function getAllJobs(page = 1) {
    convertQueryObjToURL(page)
    // console.log(currentQueryStr.value);

    try {
      const resp = await api.allJobs(currentQueryStr.value)
      if (resp.status == 200) {
        allJobsChunked.value = resp.data.body
        allJobsData.value = resp.data.body.data
      }
      // console.log('...chunked', resp.data.body);

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
      // console.log('jobtypes', resp.data.body);
    } catch (error) {
      console.log(error);
    }
  }

  async function getJobLevels() {
    try {
      const resp: any = await api.jobLevels()
      if (resp.status == 200)
        levels.value = resp.data.body
      // console.log('levels', resp.data.body);
    } catch (error) {
      console.log(error);
    }
  }

  async function getJobFunctions() {
    try {
      const resp: any = await api.jobFunctions()
      if (resp.status == 200)
        functions.value = resp.data.body
      // console.log('jobfunctions', resp.data.body);
    } catch (error) {
      console.log(error);
    }
  }

  async function getJobCategories() {
    try {
      const resp: any = await api.jobCategories()
      if (resp.status == 200)
        categories.value = resp.data.body
      // console.log('jobcategories', resp.data.body);
    } catch (error) {
      console.log(error);
    }

  }

  async function getLatestJobs() {
    try {
      const resp: any = await api.latestJobs()
      if (resp.status == 200)
        latest.value = resp.data.body
      // console.log('latest jobs', resp);
    } catch (error) {
      console.log(error);
    }
    finally {
      loading.value = false
    }

  }


  return {
    loading,
    categories,
    functions,
    types,
    levels,
    latest,
    queryObj,
    allJobsChunked,
    allJobsData,
    isFromSearch,
    getAllJobs,
    getJobTypes,
    getJobLevels,
    getJobFunctions,
    getJobCategories,
    getLatestJobs,
  }
})
