<template>
    <div class="bg-white py-4">
        <div class="container ">
            <div class=" mb-5 fs-4 fw-bold text-muted text-center">Companies we have helped</div>
            <carousel class="px-4 px-lg-0" :items-to-show="itemsToShow" snapAlign="start" :autoplay="5000"
                :wrapAround="true">
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
import { useWindowSize } from '@vueuse/core';
import { computed } from 'vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const images: string[] = ['reform.png', 'statamic.png', 'transitor.png', 'tupple.png', 'savvycal.png']
const screenWidth = useWindowSize()
const itemsToShow = computed(() => { return screenWidth.width.value > 988 ? 5 : 2; })

</script>
<style scoped></style>