<template>
  <!-- header -->
  <headerVue />
  <div class="spacefromheader"></div>

  <div class="container animate__animated animate__fadeIn">

    <div class="section-panel pt-5 pb-0">
      <div class="row g-3">
        <!-- <div class="col-md-4"></div> -->
        <div class="col-md-12">
          <div class="section-title theme-color">Find Jobs</div>

        </div>
      </div>
    </div>
  </div>

  <!-- footer -->
  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/header.vue'
import footerVue from '@/components/footer.vue'
</script>