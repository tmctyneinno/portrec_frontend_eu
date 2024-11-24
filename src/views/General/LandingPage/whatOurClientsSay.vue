<template>
    <div class="bg-white py-4">
        <div class="container ">
            <carousel class="px-4 px-lg-0" :items-to-show="itemsToShow" snapAlign="start" :autoplay="5000"
                :wrapAround="true">
                <slide class="col-6" v-for="slide in whatOurClientsSay" :key="slide.name">
                    <div class="card border-0">
                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <img :src="`/images/${slide.image}`" width="50" alt="">
                            </div>
                            <div class="text-center fw-bold">
                                {{ slide.name }}
                            </div>
                            <div class="text-center small">
                                {{ slide.text }}
                            </div>
                        </div>
                    </div>
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

const whatOurClientsSay: { id: number, image: string, name: string, text: string }[] = [
    { id: 1, image: `profile.png`, name: `Esther Stark`, text: `Lorem ipsum dolor sit amet consectetur. Odio lorem eu natoque eu aliquam. Lorem ipsum dolor sit amet consectetur. Odio lorem eu natoque eu aliquam. Lorem ipsum dolor sit amet consectetur. Odio lorem eu natoque eu aliquam. Lorem ipsum dolor sit amet consectetur. Odio lorem eu natoque eu aliquam.` },
    { id: 2, image: `profile.png`, name: `Megan Damon`, text: `Lorem ipsum dolor sit amet consectetur. Odio lorem eu natoque eu aliquam. Lorem ipsum dolor sit amet consectetur. Odio lorem eu natoque eu aliquam. Lorem ipsum dolor sit amet consectetur. Odio lorem eu natoque eu aliquam. Lorem ipsum dolor sit amet consectetur. Odio lorem eu natoque eu aliquam.` },
    { id: 3, image: `profile.png`, name: `Guy Hawkins`, text: `Lorem ipsum dolor sit amet consectetur. Odio lorem eu natoque eu aliquam. Lorem ipsum dolor sit amet consectetur. Odio lorem eu natoque eu aliquam. Lorem ipsum dolor sit amet consectetur. Odio lorem eu natoque eu aliquam. Lorem ipsum dolor sit amet consectetur. Odio lorem eu natoque eu aliquam.` }
]

const screenWidth = useWindowSize()
const itemsToShow = computed(() => { return screenWidth.width.value > 988 ? 3 : 1; })


</script>
<style scoped></style>