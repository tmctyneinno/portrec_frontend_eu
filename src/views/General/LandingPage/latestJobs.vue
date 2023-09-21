
<template>
    <div class="section-panel min-vh-100 section-panel-light slanted-left">
        <div class="container">
            <div class="col-12">
                <div class="row">
                    <div class="col-8">
                        <div class=" section-title">Latest Jobs open</div>
                    </div>
                    <div class="col-4 d-flex justify-content-end align-items-center ">
                        <span class="hover-tiltX float-end theme-color cursor-pointer fw-bolder me-0 section-right">
                            show all jobs <i class="bi bi-arrow-right-short"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <div class="row g-4">
                    <jobsDisplayVue v-for="i in 8" :key="i" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import jobsDisplayVue from '@/components/jobsDisplay.vue';
</script>


