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
import headerVue from '@/components/templates/header.vue'
import footerVue from '@/components/templates/footer.vue'

import companiesWeHaveHelped from './LandingPage/companiesWeHaveHelped.vue';
import WhatOurClientsSay from './LandingPage/whatOurClientsSay.vue';




const whyChoose: { icon: string, title: string, desc: string }[] = [
  { icon: `bi-suitcase2`, title: `Access to Good Job Listings`, desc: `Find a variety of job opportunities, including exclusive roles from top employers, that aren’t available on other platforms.` },
  { icon: `bi-graph-up-arrow`, title: `Career Growth Resources`, desc: `Take advantage of resources to boost your skills, including personalized career advice, training programs, and industry insights to stay competitive.` },
  { icon: `bi-person`, title: `User-Friendly Experience`, desc: `Effortlessly search, apply, and track job applications through an intuitive platform designed to streamline your job-hunting journey.` },
  { icon: `bi-graph-up-arrow`, title: `Career Growth Resources`, desc: `Take advantage of resources to boost your skills, including personalized career advice, training programs, and industry insights to stay competitive.` },
  { icon: `bi-person`, title: `User-Friendly Experience`, desc: `Effortlessly search, apply, and track job applications through an intuitive platform designed to streamline your job-hunting journey.` },
  { icon: `bi-suitcase2`, title: `Access to Good Job Listings`, desc: `Find a variety of job opportunities, including exclusive roles from top employers, that aren’t available on other platforms.` },
]
</script>