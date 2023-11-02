<template>
  <!-- header -->
  <headerVue />
  <div class="space-from-header"></div>

  <JobDescription_page_content />

  <!-- footer -->
  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/header.vue'
import footerVue from '@/components/footer.vue'
import JobDescription_page_content from './JobDescription_page_content.vue';

</script>

<style scoped>
/* @import '@/assets/css/theme-style.css'; */

.img-fluid {
  max-width: 100%;
  height: auto;
}

.skills-tag {
  background-color: var(--bs-light);
  padding: 5px 8px;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: small;
}

.category-tag {
  display: inline-block;
  margin-bottom: 5px;
}

.benefit-icon {
  font-size: 2.63rem;
  color: var(--theme-color);
}
</style>