<template>
  <headerVue />
  <heroVue />
  <companiesWeHaveHelped />
  <exploreVue />
  <latestJobsVue />
  <featuredJobsVue />
  <!-- <quickCareerVue /> -->
  <!-- <pricingVue /> -->
  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/templates/header.vue'
import footerVue from '@/components/templates/footer.vue'
import heroVue from './hero.vue'
import companiesWeHaveHelped from './companiesWeHaveHelped.vue'
import exploreVue from './explore.vue'
import latestJobsVue from './latestJobs.vue'
import featuredJobsVue from './featuredJobs.vue'
import { useRouter } from 'vue-router' 
import { onMounted } from 'vue'
// import quickCareerVue from './quickCareer.vue'
// import pricingVue from './pricing.vue'



// const router = useRouter()
// onMounted(() => {
//   const routes = router.getRoutes()
//     .filter(route => route.path !== "/:pathMatch(.*)*") // Exclude wildcard routes
//     .map(route => route.path);
// })
</script>
