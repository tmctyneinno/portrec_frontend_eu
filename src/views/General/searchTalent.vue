<template>
  <headerVue />
  <div class="space-from-header"></div>

  <div class="container animate__animated animate__fadeIn">

    <div class="section-panel min-vh-100 pt-3 pt-lg-0 pb-0">
      <div class="row g-3  justify-content-center align-items-center">
        <!-- <div class="col-md-4"></div> -->
        <div class="col-md-6 order-2 order-md-1">
          <div class=" fs-1 fw-bold" style="line-height: 1.3;">
            Hire Top professional {{ tagNameOnRoute }}
          </div>
          <div class="">
            <p> {{ tagDescription }} </p>
            <p>
              Find expert {{ tagNameOnRoute }} you need today.
            </p>

            <div>
              <RouterLink class="btn btn-primary rounded-" to="/recruiter/search-talent">
                Hire {{ tagNameOnRoute ?? 'Talents' }}
              </RouterLink>
              <div class="text-muted small mt-2">Risk free trial for any hire</div>
            </div>
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
        Hire {{ tagNameOnRoute ?? 'Talents' }} with good track records
      </div>

      <div v-if="!talents.length" class="min-vh-50 d-flex justify-content-center align-items-center">
        <emptyDataComponent :text="'No ' + tagNameOnRoute + ' to Show.'" />
      </div>

      <div v-else class="row g-3">
        <UserProfileCardGeneral v-for="talent in talents" :key="talent.id" :user-profile="talent">
          <template #desc>
            <div class=" text-dark">
              <div class="fw-bold">{{ tagNameOnRoute }}</div>
              <div>
                {{ tagDescription }}
              </div>
            </div>
          </template>
        </UserProfileCardGeneral>
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

  <footerVue />
</template>

<script setup lang="ts">
import { onMounted, watch, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import headerVue from '@/components/templates/header.vue'
import footerVue from '@/components/templates/footer.vue'

import companiesWeHaveHelped from './LandingPage/companiesWeHaveHelped.vue';
import WhatOurClientsSay from './LandingPage/whatOurClientsSay.vue';
import UserProfileCardGeneral from '@/components/templates/userProfileCardGeneral.vue';
import api from '@/stores/Helpers/axios'
import type { UserProfileCardInterface } from '@/stores/interfaces';

const route = useRoute()
const tagNameOnRoute = ref<any>('Talents')
const idOnRoute = ref<any>(null)
const isLoadingTalents = ref<boolean>(false)
const talents = ref<UserProfileCardInterface[]>([])

onMounted(() => {
  loadDetailsOnRoute()
})

watch(() => [route.query?.tag], () => {
  loadDetailsOnRoute()
  // window.location.reload()
})


async function loadDetailsOnRoute() {
  idOnRoute.value = route.query?.ref ?? null
  tagNameOnRoute.value = route.query?.tag
  await getIndustryCareeres()
}

async function getIndustryCareeres() {
  isLoadingTalents.value = true
  talents.value.length = 0
  try {
    const resp = await api.searchTalent(idOnRoute.value)
    const array = resp?.data?.body ?? []
    if (array.length) {
      array.forEach((item: any) => {
        const userSkills = (item.user.skill ?? []).map((x: { skills: { name: any } }) => x.skills.name);

        const newMapp: UserProfileCardInterface = {
          id: item.user.id,
          name: item.user.name,
          title: item.user?.profile?.professional_headline ?? '',
          status: item.is_promoted == 1 ? 'promoted' : 'recommended',
          skills: userSkills,
          experience: 3,
          star: 4,
          location: 'remote',
          availability: 'remote',
          avatar: item?.user?.user_avatar?.url ?? '',
          email: item.user?.email,
        }
        talents.value.push(newMapp)
      });
    }
    isLoadingTalents.value = false
  }
  catch {
    isLoadingTalents.value = false
  }
}

const tagDescription = computed(() => {
  const categories = [
    {
      title: 'Designers',
      desc: 'Crafting visually engaging and intuitive user interfaces, focusing on layout, color, typography, and interactive elements to enhance the overall user experience.',
    },
    {
      title: 'Salespeople',
      desc: 'Building relationships, identifying customer needs, and driving revenue through effective communication and tailored solutions.',
    },
    {
      title: 'Marketers',
      desc: 'Creating and executing strategies to promote products or services, focusing on brand awareness, audience engagement, and lead generation.',
    },
    {
      title: 'Business Experts',
      desc: 'Providing strategic guidance, managing operations, and ensuring sustainable growth within an organization.',
    },
    {
      title: 'Project Managers',
      desc: 'Planning, executing, and overseeing projects to ensure they are completed on time, within scope, and on budget.',
    },
    {
      title: 'Software Engineers',
      desc: 'Designing, developing, and maintaining software solutions to solve complex problems and enhance functionality across digital platforms.',
    },
  ];

  const found = categories.find((x: { title: string }) => x.title == tagNameOnRoute.value)
  return found?.desc ?? ''

})




const whyChoose: { icon: string, title: string, desc: string }[] = [
  { icon: `bi-microsoft-teams`, title: `Efficient Matching`, desc: `Our website uses advanced algorithms to match employers with the most suitable candidates, saving time and effort in the hiring process.` },
  { icon: `bi-telephone`, title: `Seamless Communication`, desc: `Our built-in messaging system allows easy and efficient communication between employers and potential hires, streamlining the interview process.` },
  { icon: `bi-person`, title: `Comprehensive Profiles`, desc: `Employers can view detailed candidate profiles, including skills, experience, and certifications, making it easier to make informed hiring decisions.` },
  { icon: `bi-microsoft-teams`, title: `Efficient Matching`, desc: `Our website uses advanced algorithms to match employers with the most suitable candidates, saving time and effort in the hiring process.` },
  { icon: `bi-telephone`, title: `Seamless Communication`, desc: `Our built-in messaging system allows easy and efficient communication between employers and potential hires, streamlining the interview process.` },
  { icon: `bi-person`, title: `Comprehensive Profiles`, desc: `Employers can view detailed candidate profiles, including skills, experience, and certifications, making it easier to make informed hiring decisions.` },
]
</script>