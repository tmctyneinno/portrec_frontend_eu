<template>
    <div class="bg-white py-4">
        <div class="container ">
            <div class=" mb-5 fs-4 fw-bold text-muted text-center">Companies we have helped</div>
            <carousel class="px-4 px-lg-0" :items-to-show="5" snapAlign="start" :autoplay="5000" :wrapAround="true">
                <!-- <slide v-for="slide in 8" :key="slide">
                    <img src="@/assets/images/companies/company.png" width="100" alt="">
                </slide> -->
                <slide v-for="slide in images" :key="slide">
                    <img :src="`/images/companies/${slide}`" width="120" alt="">
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

const images = ['reform.png', 'statamic.png', 'transitor.png', 'tupple.png', 'savvycal.png']
</script>
<style scoped></style>