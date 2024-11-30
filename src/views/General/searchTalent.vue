<template>
  <headerVue />
  <div class="space-from-header"></div>

  <div class="container animate__animated animate__fadeIn">

    <div class="section-panel min-vh-100 pt-3 pt-lg-0 pb-0">
      <div class="row g-3  justify-content-center align-items-center">
        <!-- <div class="col-md-4"></div> -->
        <div class="col-md-6 order-2 order-md-1">
          <div class=" fs-1 fw-bold" style="line-height: 1.3;">
            Hire Top professional Product Designers
          </div>
          <div class="">
            <p>
              Your vision deserves a great product designer to bring it to life. Finding the right fit alone is
              challenging alone, but Arc makes hiring the best freelance or full-time remote product designers easy.
              Save time by connecting directly with vetted product designers ready to interview.
            </p>
            <p>
              Find expert UI, UX, web, and product designers you need today.
            </p>


            <p>
              <RouterLink class="btn btn-primary rounded-" to="/recruiter/search-talent">
                Hire a Designer
              </RouterLink>
            <div class="text-muted small mt-2">Risk free trial for any hire</div>
            </p>
          </div>
        </div>
        <div class="col-md-6 order-1 order-md-2">
          <img src="/images/recruitment.png" width="100%" alt="">

        </div>
      </div>
    </div>

    <div class="py-0">
      <companiesWeHaveHelped />
    </div>

    <div class="section-panel">
      <div class="section-title fs-2 text-lg-center mb-4">
        Hire Product Designers with good track records
      </div>

      <div class="row g-3">
        <UserProfileCard v-for="user in 12" :user-profile="userProfiles[0]">
          <template #desc>
            <div class=" text-dark">
              <div class="fw-bold">UI Designers</div>
              <div>
                Crafting visually engaging and intuitive user interfaces, emphasizing layout, color, typography, and
                interactive elements to enhance the overall user experience across digital platforms.
              </div>
            </div>
          </template>
        </UserProfileCard>
      </div>
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
        What our clients say about <span class="theme-color  fw-bold">PORTREC</span>
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

import companiesWeHaveHelped from './LandingPage/companiesWeHaveHelped.vue';
import UserProfileCard from '@/components/userProfileCardGeneral.vue';
import { ref } from 'vue';
import type { UserProfileCardInterface } from '@/stores/interfaces';
import WhatOurClientsSay from './LandingPage/whatOurClientsSay.vue';


const userProfiles = ref<UserProfileCardInterface[]>([
  {
    id: 1,
    name: 'Mary Jones',
    title: 'Remote freelance designer',
    status: 'recommended',
    skills: ['illustration', 'design', 'design systems'],
    experience: 3,
    star: 4,
    location: 'remote',
    avalaiblity: 'remote',

  },
  {
    id: 2,
    name: 'Samuel Cooner',
    title: 'Remote Software Enginner',
    status: 'promoted',
    skills: ['illustration', 'design', 'design systems'],
    experience: 7,
    star: 3,
    location: 'remote',
    avalaiblity: 'remote',

  }
])



const whyChoose: { icon: string, title: string, desc: string }[] = [
  { icon: `bi-microsoft-teams`, title: `Efficient Matching`, desc: `Our website uses advanced algorithms to match employers with the most suitable candidates, saving time and effort in the hiring process.` },
  { icon: `bi-telephone`, title: `Seamless Communication`, desc: `Our built-in messaging system allows easy and efficient communication between employers and potential hires, streamlining the interview process.` },
  { icon: `bi-person`, title: `Comprehensive Profiles`, desc: `Employers can view detailed candidate profiles, including skills, experience, and certifications, making it easier to make informed hiring decisions.` },
  { icon: `bi-microsoft-teams`, title: `Efficient Matching`, desc: `Our website uses advanced algorithms to match employers with the most suitable candidates, saving time and effort in the hiring process.` },
  { icon: `bi-telephone`, title: `Seamless Communication`, desc: `Our built-in messaging system allows easy and efficient communication between employers and potential hires, streamlining the interview process.` },
  { icon: `bi-person`, title: `Comprehensive Profiles`, desc: `Employers can view detailed candidate profiles, including skills, experience, and certifications, making it easier to make informed hiring decisions.` },
]
</script>