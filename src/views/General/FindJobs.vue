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
                            <input class="form-check-input me-1" type="checkbox" :value="x.id" v-model="checked.types">
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
                            <input class="form-check-input me-1" type="checkbox" :value="x.id"
                              v-model="checked.categories">
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
                <div class="row justify-content-center gy-3">

                  <div v-for="i in 8" :key="i" class="col-md-12 col-sm-12 col-12 ">
                    <div class="card rounded-0">
                      <div class="card-body">
                        <div class="row gy-3 align-items-center">
                          <div class="col-md-2 text-lg-center">
                            <img src="@/assets/images/jobs/round.png" class="img-fluid" width="55" alt="">
                          </div>
                          <div class="col-md-7">
                            <h4 class="fs-md mb-0 ft-medium">Fresher UI/UX Designer (3 Year Exp.)</h4>
                            <div class="d-block mb-2 position-relative">
                              <span class="text-muted medium"><i class="lni lni-map-marker me-1"></i>Liverpool,
                                London</span>
                            </div>
                            <span class="border-right">
                              <span class="category-tag fulltime-tag">Full-Time</span>
                            </span>
                            <span class="category-tag marketing-tag">Marketing</span>
                            <span class="category-tag design-tag">Design</span>
                          </div>
                          <div class="col-md-3 justify-content-end">
                            <div class="text-cente">
                              <router-link :to="`/job-description/${i}`"
                                class="btn p-2 btn-primary rounded-0 w-100">Apply</router-link>
                              <div class="progress mt-2 mb-0 rounded-0" role="progressbar" aria-valuenow="50"
                                aria-valuemin="0" aria-valuemax="100" style="height: 5px">
                                <div class="progress-bar bg-danger" style="width: 50%"></div>
                              </div>
                              <small>5 applied of 10 capacity</small>
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
import { onMounted, reactive, watch } from 'vue';
import { useJobsStore } from '@/stores/jobsStore';
import { useRoute, useRouter } from 'vue-router';

const route: any = useRoute()
const router = useRouter()
const jobsStore = useJobsStore()

const checked = reactive({
  categories: [],
  types: [],
})

onMounted(async () => {
  window.scrollTo(0, 0)
  jobsStore.loading = true
  await jobsStore.getJobCategories()
  await jobsStore.getJobFunctions()
  await jobsStore.getJobTypes()
  getJobs()
})

function getJobs() {

  if (route.query.category) {
    checked.categories = route.query.category.split(',')
  }
  if (route.query.type) {
    checked.types = route.query.type.split(',')
  }

  console.log(route.query);

}

watch(() => route.query, () => getJobs())


watch(() => [checked.categories, checked.types], () => {
  let queryObj: any = {};
  if (checked.categories.length)
    queryObj.category = checked.categories.toString()

  if (checked.types.length)
    queryObj.type = checked.types.toString()

  router.replace({
    path: `/find-jobs`,
    query: queryObj
  })
})

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