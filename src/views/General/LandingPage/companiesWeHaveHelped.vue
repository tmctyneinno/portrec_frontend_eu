<template>
    <div class="bg-white">
        <div class="container my-5">
            <div class=" mb-4 fs-4 fw-bold text-muted text-center">Companies we have helped</div>
            <carousel class="px-4 px-lg-0" :items-to-show="itemsPerScreenSize" snapAlign="start" :autoplay="5000"
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

const images: string[] = ['crafties.png', 'jide.png', 'headway.png', 'NeptuneMFB.png', 'jimoh.png', 'nukreationz.png', 'rehoboth.webp', 'abilat.png', 'Eleshin-security.png', 'fowang-technologies.png', 'kindell.png', 'lordsandbrands.png']
const screenWidth = useWindowSize()
const itemsPerScreenSize = computed(() => { return screenWidth.width.value > 988 ? 5 : 2; })

</script>
<style scoped></style>