<template>
  <!-- header -->
  <headerVue />
  <div class="space-from-header"></div>

  <div class="animate__animated animate__fadeIn">

    <div class="section-panel section-panel-light py-3 py-md-4">
      <div class="container mb-5">
        <div class="row justify-content-center pt-5 g-3">

          <div class="col-md-12 col-sm-12 col-lg-12 rounded-0">
            <div class="jbr-wrap text-left border">
              <div class="cats-box mlb-res rounded bg-white d-flex align-items-center justify-content-between px-3 py-3">
                <div class="cats-box bg-white d-flex align-items-center">
                  <div class="text-center"><img src="@/assets/images/jobs/round.png" class="img-fluid" width="55" alt="">
                  </div>
                  <div class="cats-box-caption px-2">
                    <h4 class="fs-md mb-0 ft-medium">Fresher UI/UX Designer (3 Year Exp.)</h4>
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
                  <router-link :to="`/`" class="btn btn-primary rounded-0 px-5">Apply</router-link>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>

    <div class="container">
      <div class="row py-5 gy-3">
        <div class="col-lg-8 ">
          <div class="py-3">
            <h4 class="fw-bold">Description</h4>
            Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be
            responsible for monitoring our social media channels, creating content, finding effective ways to engage the
            community and incentivize others to engage on our channels.
          </div>

          <div class="py-3">
            <h4 class="fw-bold">Responsibilities</h4>
            <ul class="list-group list-group-flush">
              <li v-for="i in 6" :key="i" class="list-group-item border-0 px-0">
                <i class="bi bi-check-circle text-danger"></i>
                Focus on social media content development and publication
              </li>
            </ul>
          </div>

          <div class="py-3">
            <h4 class="fw-bold">Who You Are</h4>
            <ul class="list-group list-group-flush">
              <li v-for="i in 6" :key="i" class="list-group-item border-0 px-0">
                <i class="bi bi-check-circle text-danger"></i>
                You get energy from people and building the ideal work environment
              </li>
            </ul>
          </div>

          <div class="py-3">
            <h4 class="fw-bold">Nice-To-Haves</h4>
            <ul class="list-group list-group-flush">
              <li v-for="i in 3" :key="i" class="list-group-item border-0 px-0">
                <i class="bi bi-check-circle text-danger"></i>
                Fluent in English
              </li>
            </ul>
          </div>

        </div>
        <div class="col-lg-4">
          <div class="py-3">
            <h4 class="fw-bold">About this job</h4>
            <div class="card p-3 border-0 bg-light">
              <div class="fw-bold small">5 applied of 10 capacity</div>
              <div class="progress mt-2 mb-0 rounded-0" role="progressbar" aria-valuenow="50" aria-valuemin="0"
                aria-valuemax="100" style="height: 5px">
                <div class="progress-bar bg-danger" style="width: 50%"></div>
              </div>
            </div>

            <div class="col-12 mt-3">
              <ul class="list-group list-group-flush">
                <li class="list-group-item border-0 px-0">Apply Before
                  <span class="float-end fw-bold"> July 31, 2021</span>
                </li>
                <li class="list-group-item border-0 px-0">Job Posted On
                  <span class="float-end fw-bold"> July 1, 2021</span>
                </li>
                <li class="list-group-item border-0 px-0">Job Type
                  <span class="float-end fw-bold"> Full-Time</span>
                </li>
                <li class="list-group-item border-0 px-0">Salary
                  <span class="float-end fw-bold">$75k-$85k USD</span>
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
            <span v-for="i in requirdSkills" :key="i" class=" skills-tag">{{ i }}</span>
          </div>


        </div>

        <hr>

        <div class="col-12 mb-3">
          <div class="fs-4 fw-bold">Perks & Benefits</div>
          <span class="small">This job comes with several perks and benefits</span>
        </div>

        <div class="col-12">
          <div class="row g-3">

            <div class="col-md-6 col-lg-3">
              <div class="card border-0">
                <div class="benefit-icon">
                  <i class="bi bi-heart-pulse"></i>
                </div>
                <div class="fs-5">Full Healthcare </div>
                We believe in thriving communities and that starts with our team being happy and healthy.
              </div>
            </div>

            <div class="col-md-6 col-lg-3">
              <div class="card border-0">
                <div class="benefit-icon">
                  <i class="bi bi-water"></i>
                </div>
                <div class="fs-5">Unlimited Vacation </div>
                We believe in thriving communities and that starts with our team being happy and healthy.
              </div>
            </div>

            <div class="col-md-6 col-lg-3">
              <div class="card border-0">
                <div class="benefit-icon">
                  <i class="bi bi-camera-video"></i>
                </div>
                <div class="fs-5">Skill Development </div>
                We believe in thriving communities and that starts with our team being happy and healthy.
              </div>
            </div>

            <div class="col-md-6 col-lg-3">
              <div class="card border-0">
                <div class="benefit-icon">
                  <i class="bi bi-cup-hot"></i>
                </div>
                <div class="fs-5">Remote Working </div>
                We believe in thriving communities and that starts with our team being happy and healthy.
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
            <jobsDisplayVue v-for="i in 8" :key="i" />
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
import jobsDisplayVue from '@/components/jobsDisplay.vue';
// import { reactive } from 'vue';

const requirdSkills = ['Project Management', 'Copywriting', 'Social Media Marketing', 'English', 'Copy Editing']

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