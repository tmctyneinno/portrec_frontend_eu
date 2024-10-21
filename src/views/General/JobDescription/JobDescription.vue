<template>
  <!-- header -->
  <headerVue />
  <div class="space-from-header"></div>

  <div class="min-vh-100">
    <JobDescription_page_content />
  </div>

  <!-- footer -->
  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/header.vue'
import footerVue from '@/components/footer.vue'
import JobDescription_page_content from './JobDescription_page_content.vue';

</script>