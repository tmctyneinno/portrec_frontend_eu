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
  <featuredVue />
  <!-- quick Career -->
  <quickCareerVue />
  <!-- pricing -->
  <pricingVue />
  <!-- footer -->
  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/generalComponents/headerVue.vue'
import footerVue from '@/components/generalComponents/footerVue.vue'
import heroVue from '@/components/homePageComponents/heroVue.vue'
import companiesVue from '@/components/homePageComponents/companiesVue.vue'
import exploreVue from '@/components/homePageComponents/exploreVue.vue'
import latestJobsVue from '@/components/homePageComponents/latestJobsVue.vue'
import featuredVue from '@/components/homePageComponents/featuredVue.vue'
import quickCareerVue from '@/components/homePageComponents/quickCareerVue.vue'
import pricingVue from '@/components/homePageComponents/pricingVue.vue'
</script>

