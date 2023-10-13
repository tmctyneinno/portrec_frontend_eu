<template>
  <headerVue />
  <overlayLoading v-if="jobsStore.loading" />
  <div class="space-from-header"></div>

  <FindJobs_page_content />

  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/header.vue'
import footerVue from '@/components/footer.vue'
import { useJobsStore } from '@/stores/jobsStore';
import FindJobs_page_content from './FindJobs_page_content.vue';

const jobsStore = useJobsStore()

</script>