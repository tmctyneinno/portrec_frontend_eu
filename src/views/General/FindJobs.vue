<template>
  <headerVue />
  <overlayLoading v-if="jobsStore.loading" />
  <div class="space-from-header"></div>

  <div class="min-vh-100">
    <FindJobs_page_content />
  </div>

  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/templates/header.vue'
import footerVue from '@/components/templates/footer.vue'
import { useJobsStore } from '@/stores/jobsStore';
import FindJobs_page_content from './FindJobs_page_content.vue';

const jobsStore = useJobsStore()

</script>