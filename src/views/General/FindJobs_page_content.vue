<template>
  <!-- header -->
  <!-- <headerVue /> -->
  <overlayLoading v-if="jobsStore.loading" />
  <!-- <div class="space-from-header"></div> -->

  <div class="animate__animated animate__fadeIn mb-5">

    <div class="section-panel section-panel-light py-5">
      <div class="container mb-5">
        <div class="row g-3">
          <div class="col-md-12">
            <div class="section-title text-center mb-0">
              Find your <span class="theme-color fw-bold">dream job</span>
            </div>
            <div class="text-center small text-muted mb-4">
              Find your next career at companies like HubSpot, Nike, and Dropbox
            </div>
            <div class="row justify-content-center">
              <div class="col-md-10">
                <searchJobForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container bg-white py-3" :class="{ 'small': route.path != '/find-jobs' }">
      <div class="row">
        <div class="col-lg-3">
          <div class="card border-0 pt-5 pb-3">
            <div class="row gy-3">
              <div class="col-12 col-md-6 col-lg-12">
                <div class="accordion accordion-flush" id="type-of-employment">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne">
                        Type of Employment
                      </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse show"
                      data-bs-parent="#type-of-employment">
                      <div class="accordion-body small">
                        <div class="list-group list-group-flush">

                          <label v-for="x in jobsStore.types" :key="x" class="list-group-item border-0 text-capitalize">
                            <input @change="respondToCheckBox" class="form-check-input me-1" type="checkbox" :value="x.id"
                              v-model="checked.type_id">
                            {{ x.name }} ({{ x.total_jobs }})
                          </label>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 col-lg-12">
                <div class="accordion accordion-flush" id="categories">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button fw-bold" :class="{ 'collapsed': windowWidth > 768 }" type="button"
                        data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="true"
                        aria-controls="flush-collapseTwo">
                        Categories
                      </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" :class="{ 'show': windowWidth > 768 }"
                      data-bs-parent="#categories">
                      <div class="accordion-body small">
                        <div class="list-group list-group-flush">

                          <label v-for="x in jobsStore.categories" :key="x"
                            class="list-group-item border-0 text-capitalize">
                            <input @change="respondToCheckBox" class="form-check-input me-1" type="checkbox" :value="x.id"
                              v-model="checked.cat_id">
                            {{ x.name }} ({{ x.total_jobs }})
                          </label>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 col-lg-12">
                <div class="accordion accordion-flush" id="job-level">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button fw-bold" :class="{ 'collapsed': windowWidth > 768 }" type="button"
                        data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="true"
                        aria-controls="flush-collapseThree">
                        Job Level
                      </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse"
                      :class="{ 'show': windowWidth > 768 }" data-bs-parent="#job-level">
                      <div class="accordion-body small">
                        <div class="list-group list-group-flush">
                          <label v-for="x in jobsStore.levels" :key="x" class="list-group-item border-0 text-capitalize">
                            <input @change="respondToCheckBox" class="form-check-input me-1" type="checkbox" :value="x.id"
                              v-model="checked.level_id">
                            {{ x.name }} ({{ x.total_jobs }})
                          </label>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 col-lg-12">
                <div class="accordion accordion-flush" id="salary-range">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button fw-bold" :class="{ 'collapsed': windowWidth > 768 }" type="button"
                        data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="true"
                        aria-controls="flush-collapseFour">
                        Salary Range
                      </button>
                    </h2>
                    <div id="flush-collapseFour" class="accordion-collapse collapse"
                      :class="{ 'show': windowWidth > 768 }" data-bs-parent="#salary-range">
                      <div class="accordion-body small">
                        <div class="list-group list-group-flush">
                          <label class="list-group-item border-0">
                            <input class="form-check-input me-1" type="checkbox" value="">
                            $700 - $1000 (4)
                          </label>
                          <label class="list-group-item border-0">
                            <input class="form-check-input me-1" type="checkbox" value="">
                            $100 - $1500 (6)
                          </label>
                          <label class="list-group-item border-0">
                            <input class="form-check-input me-1" type="checkbox" value="">
                            $1500 - $2000 (10)
                          </label>
                          <label class="list-group-item border-0">
                            <input class="form-check-input me-1" type="checkbox" value="" checked>
                            $3000 or above (4)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="card p-2 border-0">
            <div class="col-12 my-3">
              <div class="row mb-3">
                <div class="col-12">
                  <div>

                    <div class="fw-bold fs-4">
                      {{ jobsStore.isFromSearch ? 'Search Results' : 'All Jobs' }}
                    </div>
                    <div v-if="!jobsStore.loading" class="small text-muted" style="line-height:7px; ">
                      Showing page <span class="fw-bold">{{ currentPage }}/ {{ totalPages }}</span>
                      of <span class="fw-bold">{{ totalRecords }}</span> results
                    </div>
                  </div>
                  <span v-show="jobsStore.isFromSearch" @click="getJobs()"
                    class="float-end fw-bold cursor-pointer theme-color hover-tiltX">
                    Show all jobs <i class="bi bi-chevron-right"></i>
                  </span>

                </div>

                <!-- <div class="col-lg-5 col-12 d-flex justify-content-end  align-items-center small ">
                  <div class="line-right">
                    <span class="text-muted">Sort By:</span>
                    <span class="ms-2">Most Revelant <i class="bi bi-chevron-down"></i> </span>
                  </div>
                  <div class="ps-3">
                    <span><i class="bi bi-grid"></i></span>
                    <span class="ms-3 p-2 bg-light"><i class="bi bi-hdd-stack-fill theme-color"></i></span>
                  </div>
                </div> -->
              </div>
            </div>
            <div class="col-12">
              <div class="card border-0 bg-light p-4">
                <div v-if="jobsStore.loading" style="min-height: 400px;">
                  <!-- <componentLoading /> -->
                </div>

                <div v-else>
                  <div v-if="jobsStore.allJobsData.length" class="row justify-content-center gy-4">

                    <div v-for="job in jobsStore.allJobsData" :key="job" class="col-md-12 col-sm-12 col-12 ">
                      <div class="card rounded- job-card">
                        <div class="card-body">
                          <div class="row gy-3 align-items-center">
                            <div class="col-md-2 text-lg-center">
                              <img :src="job.company ? job.company.image : ''" class="img-fluid" alt="_img">
                            </div>
                            <div class="col-md-7">
                              <h4 class="mb-0 job_title">{{ job.title }}</h4>
                              <div class="d-block mb-2 position-relative">
                                <span class="text-muted medium text-capitalize"><i class="lni lni-map-marker me-1"></i>
                                  {{ job.company ? job.company.city : '' }},
                                  {{ job.company ? job.company.country : '' }},

                                </span>
                              </div>
                              <span class="border-right">
                                <span class="category-tag fulltime-tag text-capitalize">
                                  {{ job.job_type ? job.job_type.name : 'Full Time' }}
                                </span>
                              </span>
                              <span class="category-tag text-capitalize" :class="job.category.name + '-tag'">
                                {{ job.category ? job.category.name : 'category' }}
                              </span>
                              <span class="category-tag text-capitalize">
                                {{ job.sub_category ? job.sub_category.name : 'category' }}
                              </span>
                            </div>
                            <div class="col-md-3 justify-content-end">
                              <div class="text-cente">
                                <router-link :to="`/job-description/${job.id}`"
                                  class="btn p-2 btn-primary rounded-0 w-100">Apply</router-link>

                                <div class="progress mt-2 mb-0 rounded-0" role="progressbar"
                                  :aria-valuenow="job.total_applied" aria-valuemin="0" :aria-valuemax="job.capacity"
                                  style="height: 5px">
                                  <div class="progress-bar bg-danger"
                                    :style="`width: ${(job.total_applied / job.capacity) * 100}%`">
                                  </div>
                                </div>
                                <small>{{ job.total_applied }} applied of {{ job.capacity }} capacity</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- pagination -->
                    <div class="mt-5">
                      <customPagination :currentPage="currentPage" :perPage="perPage" :totalRecords="totalRecords"
                        @moveToNext="paginateToNext" />
                    </div>

                  </div>

                  <noDataShow v-else text="No jobs to show" />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import searchJobForm from '@/components/searchJobForm.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { useJobsStore } from '@/stores/jobsStore';
import { useRoute } from 'vue-router';
import { useWindowSize } from '@vueuse/core'

const jobsStore = useJobsStore()
const route = useRoute()

const { width: windowWidth } = useWindowSize()

// pagination
const currentPage = ref(0);
const totalPages = ref(0);
const perPage = ref(0);
const totalRecords = ref(0);

const checked: any = reactive({
  cat_id: [],
  type_id: [],
  level_id: [],
})

onMounted(async () => {
  window.scrollTo(0, 0)

  jobsStore.loading = true
  checkBoxesAccordingToExistingQuery()
  if (!jobsStore.isFromSearch)
    await getJobs()
  jobsStore.loading = false

  jobsStore.getJobCategories()
  jobsStore.getJobFunctions()
  jobsStore.getJobTypes()
  jobsStore.getJobLevels()

  if (windowWidth.value < 768) {
    // collapseAllAccordions();
  }
})


function checkBoxesAccordingToExistingQuery() {
  for (const key of ["cat_id", "type_id", "level_id"]) {
    if (jobsStore.queryObj[key]) {
      jobsStore.queryObj[key].forEach((e: any) => {
        checked[key].push(e);
      });
    }
  }
}

async function getJobs(page = 1) {


  const queryObj: any = {};

  for (const key of ["cat_id", "type_id", "level_id"]) {
    if (checked[key].length) {
      queryObj[key] = checked[key];
    }
  }

  jobsStore.queryObj = queryObj;

  await jobsStore.getAllJobs(page)
  jobsStore.isFromSearch = false


}

watch(() => jobsStore.allJobsChunked, () => {
  currentPage.value = jobsStore.allJobsChunked.current_page
  totalPages.value = jobsStore.allJobsChunked.last_page
  perPage.value = jobsStore.allJobsChunked.per_page
  totalRecords.value = jobsStore.allJobsChunked.total
})

function paginateToNext(page: any) {
  window.scrollTo(0, 0)
  getJobs(page)
}

function respondToCheckBox() {
  // window.scrollTo(0, 0)
  getJobs()
}


</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}


/* .img-fluid {
  max-width: 100%;
  height: auto;
} */

.job-card {
  /* border-color: #fff; */
  /* border-width: 2px; */
  border-color: transparent;
  /* border-left: 1px solid var(--theme-color); */
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
}


.job_title {
  font-size: 20px !important;
  font-weight: 700;
  text-transform: capitalize;
}


/* accordion */
.accordion-button {
  padding-block: 0px;
}

.accordion-button:not(.collapsed) {
  color: var(--bs-black);
  background-color: var(--bs-transparent);
  /* box-shadow: inset 0 calc(-1 * var(--bs-accordion-border-width)) 0 var(--bs-accordion-border-color); */
  box-shadow: none;
}

/* accordion */

@media (max-width: 767px) {
  .img-fluid {
    max-width: 20%;
    height: auto;
  }
}
</style>