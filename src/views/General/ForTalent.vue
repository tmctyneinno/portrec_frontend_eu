<template>
  <headerVue />
  <div class="space-from-header"></div>

  <div class="container animate__animated animate__fadeIn">

    <div class="section-panel min-vh-100 pt-3 pt-lg-0 pb-0">
      <div class="row g-3  justify-content-center align-items-center">
        <!-- <div class="col-md-4"></div> -->
        <div class="col-md-6 order-2 order-md-1">
          <div class=" fs-1 fw-bold" style="line-height: 1.3;">
            Find jobs, grow skills, and connect with employers.
          </div>
          <div class="">
            <p>
              Explore a wide range of job opportunities, enhance your skills, and connect with top employers to advance
              your career successfully.
            </p>

            <p>
              <RouterLink class="btn btn-primary rounded-" to="/find-jobs">
                Find jobs
              </RouterLink>
            </p>
          </div>
        </div>
        <div class="col-md-6 order-1 order-md-2">
          <img src="/images/talents.png" width="100%" alt="">

        </div>
      </div>
    </div>

    <div class="py-5">
      <companiesWeHaveHelped />
    </div>


    <div class="section-panel pt-3 pt-lg-0">
      <div class="section-title fs-2 text-lg-center mb-4">
        Why Choose <span class="theme-color  fw-bold">PORTREC</span>
      </div>
      <div class="row g-3">
        <div v-for="why in whyChoose" :key="why.title" class="col-md-6 col-lg-4">
          <div class="card h-100">
            <div class="card-body">
              <i :class="`bi ${why.icon} fs-3 theme-color2`"></i>
              <div class="fw-bold">{{ why.title }}</div>
              <p>{{ why.desc }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="section-panel pt-3 pt-lg-0">
      <div class="section-title fs-2 text-lg-center mb-4 text-uppercase">
        Job seekers' testimonials about <span class="theme-color  fw-bold">PORTREC</span>
      </div>
      <WhatOurClientsSay />
    </div>



  </div>

  <!-- footer -->
  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/header.vue'
import footerVue from '@/components/footer.vue'

import companiesWeHaveHelped from './LandingPage/companies.vue';
import WhatOurClientsSay from './LandingPage/whatOurClientsSay.vue';




const whyChoose: { icon: string, title: string, desc: string }[] = [
  { icon: `bi-microsoft-teams`, title: `Efficient Matching`, desc: `Our website uses advanced algorithms to match employers with the most suitable candidates, saving time and effort in the hiring process.` },
  { icon: `bi-telephone`, title: `Seamless Communication`, desc: `Our built-in messaging system allows easy and efficient communication between employers and potential hires, streamlining the interview process.` },
  { icon: `bi-person`, title: `Comprehensive Profiles`, desc: `Employers can view detailed candidate profiles, including skills, experience, and certifications, making it easier to make informed hiring decisions.` },
  { icon: `bi-microsoft-teams`, title: `Efficient Matching`, desc: `Our website uses advanced algorithms to match employers with the most suitable candidates, saving time and effort in the hiring process.` },
  { icon: `bi-telephone`, title: `Seamless Communication`, desc: `Our built-in messaging system allows easy and efficient communication between employers and potential hires, streamlining the interview process.` },
  { icon: `bi-person`, title: `Comprehensive Profiles`, desc: `Employers can view detailed candidate profiles, including skills, experience, and certifications, making it easier to make informed hiring decisions.` },
]
</script>