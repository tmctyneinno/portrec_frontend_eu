<template>
  <!-- header -->
  <headerVue />
  <overlayLoading v-if="loading" />
  <div class="space-from-header"></div>

  <div class="animate__animated animate__fadeIn">

    <div class="section-panel section-panel-light py-3 py-md-4">
      <div class="container mb-5">
        <div class="row justify-content-center pt-5 g-3">

          <div class="col-md-12 col-sm-12 col-lg-12 rounded-0">
            <div class="jbr-wrap text-left border">
              <div class="cats-box mlb-res rounded bg-white d-flex align-items-center justify-content-between px-3 py-3">
                <div class="cats-box bg-white d-flex align-items-center">
                  <div class="text-center"><img :src="''" class="img-fluid" width="55" alt="image">
                  </div>
                  <div class="cats-box-caption px-2">
                    <h3 class="fs-m mb-0 ft-medium fw-bold">{{ currentJob.title }}</h3>
                    <div class="d-block mb-2 position-relative">
                      <span class="text-muted medium"><i class="lni lni-map-marker me-1"></i>Liverpool,
                        London</span>
                      <span class="muted medium ms-2 theme-cl"><i class="lni lni-briefcase me-1"></i>Full
                        Time</span>
                    </div>
                  </div>
                </div>
                <div class="text-center mlb-last">
                  <span class="line-right pe-4 me-3">
                    <i class="bi bi-share"></i>
                  </span>
                  <button @click="openApplyModal" class="btn btn-primary rounded-0 px-5">Apply</button>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>

    <div class="container">
      <div class="row py-5 gy-3">
        <div class="col-lg-8">

          <div class="py-3">
            <h4 class="fw-bold">Description</h4>
            <div class="card m-0 p-0 border-0">
              {{ currentJob.description ?? '' }}
            </div>
          </div>

          <div v-for="(qualification, i) in JSON.parse(currentJob.other_qualifications)" :key="i" class="py-3">
            <h4 class="fw-bold">{{ qualification.title }}</h4>
            <ul class="list-group list-group-flush">
              <li v-for="(description, d) in qualification.descriptions" :key="d" class="list-group-item border-0 px-0">
                <i class="bi bi-check-circle text-danger"></i>
                {{ description }}
              </li>
            </ul>
          </div>

        </div>
        <div class="col-lg-4">
          <div class="py-3">
            <h4 class="fw-bold">About this job</h4>
            <div class="card p-3 border-0 bg-light">
              <div class="fw-bold small">
                {{ currentJob.total_applied }} applied of {{ currentJob.capacity }} capacity
              </div>
              <div class="progress mt-2 mb-0 rounded-0" role="progressbar" :aria-valuenow="currentJob.total_applied"
                aria-valuemin="0" :aria-valuemax="currentJob.capacity" style="height: 5px">
                <div class="progress-bar bg-danger"
                  :style="`width: ${(currentJob.total_applied / currentJob.capacity) * 100}%`">
                </div>
              </div>
            </div>

            <div class="col-12 mt-3">
              <ul class="list-group list-group-flush">
                <li class="list-group-item border-0 px-0">Apply Before
                  <span class="float-end fw-bold">
                    {{ useDateFormat(currentJob.deadline, `MMMM D, YYYY`) }}
                  </span>
                </li>
                <li class="list-group-item border-0 px-0">Job Posted On
                  <span class="float-end fw-bold">
                    {{ useDateFormat(currentJob.created_at, `MMMM D, YYYY`) }}
                  </span>
                </li>
                <li class="list-group-item border-0 px-0">Job Type
                  <span class="float-end fw-bold"> Full-Time</span>
                </li>
                <li class="list-group-item border-0 px-0">Salary
                  <span class="float-end fw-bold">
                    ({{ numeral(currentJob.min_salary).format('0,0.00') }} -
                    {{ numeral(currentJob.max_salary).format('0,0.00') }})
                    USD
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <hr>

          <div class="py-2  border-0">
            <h4 class="fw-bold">Categories</h4>
            <span class="category-tag marketing-tag">Marketing</span>
            <span class="category-tag design-tag">Design</span>
          </div>

          <hr>

          <div class="py-2 border-0">
            <h4 class="fw-bold">Required Skills</h4>
            <span v-for="skill in JSON.parse(currentJob.required_skills)" :key="skill" class=" skills-tag">
              {{ skill.name }}
            </span>
          </div>

        </div>

        <hr>

        <div class="col-12 mb-3">
          <div class="fs-4 fw-bold">Perks & Benefits</div>
          <span class="small">This job comes with several perks and benefits</span>
        </div>

        <div class="col-12">
          <div class="row g-3">

            <div v-for="benefit in JSON.parse(currentJob.benefits)" :key="benefit" class="col-md-6 col-lg-3">
              <div class="card border-0">
                <div class="benefit-icon">
                  <i class="bi bi-check-circle"></i>
                </div>
                <div class="fs-5 text-capitalize">{{ benefit.title }} </div>
                {{ benefit.description }}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="section-panel min-vh-100 section-panel-light">
      <div class="container">
        <div class="col-12">
          <div class="row">
            <div class="col-8">
              <div class=" section-title">Similar Jobs</div>
            </div>
            <div class="col-4 d-flex justify-content-end align-items-center ">
              <router-link to="/find-jobs"
                class="hover-tiltX float-end theme-color cursor-pointer fw-bolder me-0 section-right">
                show all jobs <i class="bi bi-arrow-right-short"></i>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="row g-4">
            <jobsDisplayVue :job="currentJob" @click="router.push({ 'path': `/job-description/${i}` })" v-for="i in 8"
              :key="i" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modals -->
  <modal1 v-if="modalOpen && currentModal == 1" />
  <modal2 v-if="modalOpen && currentModal == 2" />
  <modal3 v-if="modalOpen && currentModal == 3" />
  <modal4 v-if="modalOpen && currentModal == 4" />

  <!-- footer -->
  <footerVue />
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { onBeforeRouteLeave } from 'vue-router';
import headerVue from '@/components/header.vue'
import footerVue from '@/components/footer.vue'
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
import { useDateFormat } from '@vueuse/core';
import { storeToRefs } from 'pinia';
//@ts-ignore
import numeral from 'numeral';

import modal1 from './jobApplication/modal1.vue';
import modal2 from './jobApplication/modal2.vue';
import modal3 from './jobApplication/modal3.vue';
import modal4 from './jobApplication/modal4.vue';

const job = useJobApplicationStore()
const { currentJob, loading, modalOpen, currentModal } = storeToRefs(job)
const router = useRouter()
const route = useRoute()

watchEffect(() => {
  loading.value = true
  job.currentJobQuery(route.params.id)
  console.log(currentJob);
})

function openApplyModal() {
  modalOpen.value = true;
  currentModal.value = 1
}

onBeforeRouteLeave(() => {
  modalOpen.value = false
})

</script>

<style scoped>
@import '@/assets/css/theme-style.css';

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

.skills-tag {
  background-color: var(--bs-light);
  padding: 5px 8px;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: small;
}

.category-tag {
  display: inline-block;
  margin-bottom: 5px;
}

.benefit-icon {
  font-size: 2.63rem;
  color: var(--theme-color);
}
</style>