<template>
  <!-- header -->
  <headerVue />
  <overlayLoading v-if="jobsStore.loading" />
  <div class="space-from-header"></div>

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

    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="card border-0 p-2 pt-5">
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
                            <input @change="getJobs" class="form-check-input me-1" type="checkbox" :value="x.id"
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
                      <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo" aria-expanded="true" aria-controls="flush-collapseTwo">
                        Categories
                      </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#categories">
                      <div class="accordion-body small">
                        <div class="list-group list-group-flush">

                          <label v-for="x in jobsStore.categories" :key="x"
                            class="list-group-item border-0 text-capitalize">
                            <input @change="getJobs" class="form-check-input me-1" type="checkbox" :value="x.id"
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
                      <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree" aria-expanded="true" aria-controls="flush-collapseThree">
                        Job Level
                      </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse show" data-bs-parent="#job-level">
                      <div class="accordion-body small">
                        <div class="list-group list-group-flush">
                          <label class="list-group-item border-0">
                            <input class="form-check-input me-1" type="checkbox" value="">
                            Entry Level (23)
                          </label>
                          <label class="list-group-item border-0">
                            <input class="form-check-input me-1" type="checkbox" value="">
                            Senior level(3)
                          </label>
                          <label class="list-group-item border-0">
                            <input class="form-check-input me-1" type="checkbox" value="">
                            Mid Level (14)
                          </label>
                          <label class="list-group-item border-0">
                            <input class="form-check-input me-1" type="checkbox" value="" checked>
                            Director (10)
                          </label>
                          <label class="list-group-item border-0">
                            <input class="form-check-input me-1" type="checkbox" value="">
                            VP or Above(20)
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
                      <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFour" aria-expanded="true" aria-controls="flush-collapseFour">
                        Salary Range
                      </button>
                    </h2>
                    <div id="flush-collapseFour" class="accordion-collapse collapse show" data-bs-parent="#salary-range">
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
                <div class="col-7">
                  <div>
                    <div class="fw-bold fs-4">All Jobs</div>
                    <div class="xsmall text-muted" style="line-height:7px; ">Showing 73 results</div>
                  </div>
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
              <div class="card border-0">
                <div v-if="jobsStore.allJobsChunked.data.length" class="row justify-content-center gy-3">

                  <div v-for="job in jobsStore.allJobsChunked.data" :key="job" class="col-md-12 col-sm-12 col-12 ">
                    <div class="card rounded-0">
                      <div class="card-body">
                        <div class="row gy-3 align-items-center">
                          <div class="col-md-2 text-lg-center">
                            <img :src="job.company ? job.company.image : 's'" class="img-fluid" width="55" alt="">
                          </div>
                          <div class="col-md-7">
                            <h4 class="fs-md mb-0 ft-medium">{{ job.title }}</h4>
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
                              <div @click="goToDesctiptionPage(job.id)" class="btn p-2 btn-primary rounded-0 w-100">Apply
                              </div>
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

                  <div class="col-12 mt-5">
                    <nav aria-label="Page navigation example">
                      <ul class="pagination justify-content-center">
                        <li class="page-item">
                          <div class="page-link">
                            <i class="bi bi-chevron-left"></i>
                          </div>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                          <div class="page-link">
                            <i class="bi bi-chevron-right"></i>
                          </div>
                        </li>
                      </ul>
                    </nav>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- footer -->
  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/header.vue'
import footerVue from '@/components/footer.vue'
import searchJobForm from '@/components/searchJobForm.vue';
import { onMounted, reactive } from 'vue';
import { useJobsStore } from '@/stores/jobsStore';
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
import { useRouter } from 'vue-router';

const jobsStore = useJobsStore()
const jobApplication = useJobApplicationStore()
const router = useRouter()

const checked: any = reactive({
  cat_id: [],
  type_id: [],
})

onMounted(async () => {
  window.scrollTo(0, 0)
  jobsStore.loading = true
  await jobsStore.getJobCategories()
  await jobsStore.getJobFunctions()
  await jobsStore.getJobTypes()
  jobsStore.loading = false
  checkBoxesAccordingToExistingQuery()
  getJobs()
})

function checkBoxesAccordingToExistingQuery() {
  if (jobsStore.queryObj.cat_id) {
    checked.cat_id.push(jobsStore.queryObj.cat_id)
  }
  if (jobsStore.queryObj.type_id) {
    checked.cat_id.push(jobsStore.queryObj.type_id)
  }
}

function getJobs() {
  let queryObj: any = {}
  if (checked.cat_id.length)
    queryObj.cat_id = checked.cat_id

  if (checked.type_id.length)
    queryObj.type_id = checked.type_id

  jobsStore.queryObj = queryObj;

  jobsStore.getAllJobs()
  console.log(jobsStore.allJobsChunked);

}


function goToDesctiptionPage(id?: string) {
  jobApplication.currentJobId = id
  router.push({
    path: '/job-description'
  })
}


</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

.ft-medium {
  font-weight: 500;
}

.fs-md {
  font-size: 16px !important;
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


.pagination .page-link {
  border: none !important;
  color: #000 !important;
  font-weight: bold;
  border-radius: 7px;
  padding-inline: 15px;
  margin-inline: 3px;
  cursor: pointer;
}

.pagination .active .page-link {
  background-color: var(--theme-color) !important;
  color: #fff !important;
}
</style>