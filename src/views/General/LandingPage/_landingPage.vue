<template>
  <!-- header -->
  <headerVue />
  <!-- hero -->
  <heroVue />
  <!-- hero -->
  <companiesVue />
  <!-- explore -->
  <exploreVue />
  <!-- latest Jobs -->
  <latestJobsVue />
  <!-- featured Jobs -->
  <featuredJobsVue />
  <!-- quick Career -->
  <quickCareerVue />
  <!-- pricing -->
  <pricingVue />
  <!-- footer -->
  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/header.vue'
import footerVue from '@/components/footer.vue'
import heroVue from './hero.vue'
import companiesVue from './companies.vue'
import exploreVue from './explore.vue'
import latestJobsVue from './latestJobs.vue'
import featuredJobsVue from './featuredJobs.vue'
import quickCareerVue from './quickCareer.vue'
import pricingVue from './pricing.vue'
</script>

