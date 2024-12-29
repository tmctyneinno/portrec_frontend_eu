/* eslint-disable no-prototype-builtins */
import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
// import { useStorage } from '@vueuse/core'
import api from '@/stores/Helpers/axios'

export const useJobsStore = defineStore('jobsStore', () => {
  const functions = ref<any[]>([]);
  const categories = ref<any[]>([]);
  const latest = ref<any[]>([]);
  const featured = ref<any>([]);
  const qualifications = ref<any[]>([]);
  const types = ref<any[]>([]);
  const levels = ref<any[]>([]);
  const allJobsData = ref<any[]>([]);
  const allJobsChunked = ref<any>([]);

  const loading = ref<boolean>(false)
  const queryObj = ref<any>({});
  const currentQueryStr = ref<string>('');

  const isFromSearch = ref<boolean>(false)

  const search = reactive({
    title: '',
    location: ''
  })


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

  async function getJobQualifications() {
    try {
      const resp: any = await api.jobQualifications()
      if (resp.status == 200)
        qualifications.value = resp.data.body
      console.log('qualifications', resp.data.body);
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

  async function getFeaturedJobs(page = 1) {
    try {
      const queryStr = `?page=${page}`
      const resp: any = await api.featuredJobs(queryStr)
      if (resp.status == 200)
        featured.value = resp.data.data
    } catch (error) {
      console.log(error);
    }
    finally {
      loading.value = false
    }

  }

  const jobsKeyWords = ["Accountant",
    "Administrative Assistant",
    "Analyst",
    "Business Development",
    "Customer Service",
    "Data Analyst",
    "Designer",
    "Developer",
    "Engineer",
    "Financial Analyst",
    "Graphic Designer",
    "Human Resources",
    "IT Manager",
    "Java Developer",
    "Job Coach",
    "Legal Assistant",
    "Marketing Manager",
    "Medical Assistant",
    "Nurse",
    "Operations Manager",
    "Pharmacist",
    "Physical Therapist",
    "Product Manager",
    "Project Manager",
    "Quality Assurance",
    "Receptionist",
    "Researcher",
    "Sales Representative",
    "Software Engineer",
    "Systems Analyst",
    "Teacher",
    "Technical Support",
    "Truck Driver",
    "UX Designer",
    "Web Developer",
    "Account Manager",
    "Architect",
    "Biologist",
    "Chef",
    "Content Writer",
    "Dentist",
    "Electrician",
    "Event Planner",
    "Financial Planner",
    "Front End Developer",
    "Interior Designer",
    "Journalist",
    "Mechanic",
    "Network Engineer",
    "Nutritionist"]



  return {
    loading,
    categories,
    functions,
    qualifications,
    types,
    levels,
    latest,
    featured,
    queryObj,
    allJobsChunked,
    allJobsData,
    isFromSearch,
    jobsKeyWords,
    search,
    getAllJobs,
    getJobTypes,
    getJobLevels,
    getJobFunctions,
    getJobCategories,
    getLatestJobs,
    getFeaturedJobs,
    getJobQualifications,
  }
})
