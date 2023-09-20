

<template>
    <div class="bg-white py-4">
        <div class="container ">
            <div class="my-4 fs-6 text-muted">Companies we have helped:</div>
            <carousel class="px-4 px-lg-0" :items-to-show="5" snapAlign="start" :autoplay="5000" :wrapAround="true">
                <slide v-for="slide in 8" :key="slide">
                    <img src="@/assets/images/companies/company.png" width="100" alt="">
                </slide>

                <template #addons>
                    <!-- <navigation /> -->
                    <!-- <pagination /> -->
                </template>
            </carousel>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
</script>
<style scoped></style>