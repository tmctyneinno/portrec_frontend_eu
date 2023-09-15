

<template>
    <div class="bg-white py-4">
        <div class="container ">
            <div class="my-4 text-muted">Companies we have helped</div>
            <carousel class="px-4 px-lg-0" :items-to-show="5" snapAlign="start" :autoplay="5000" :wrapAround="true">
                <slide v-for="slide in logos" :key="slide">
                    {{ slide }}
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
import { ref } from 'vue';

const logos = ref({
    logo1: 'logo1',
    logo2: 'logo2',
    logo3: 'logo3',
    logo4: 'logo4',
    logo5: 'logo5',
    logo6: 'logo6',
    logo7: 'logo7',
})

</script>
<style scoped></style>