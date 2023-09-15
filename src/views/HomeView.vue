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
</script>

