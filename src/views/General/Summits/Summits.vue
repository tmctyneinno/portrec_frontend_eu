<template>
  <headerVue />
  <div class="space-from-header"></div>

  <div v-if="showDetails" class="pt-4 container animate__animated animate__fadeIn">
    <SummitDetails />
  </div>

 
  <div v-else>
    <div v-if="isLoadingSummits" class="min-vh-100 d-flex justify-content-center align-items-center">
      <ComponentLoading />
    </div>
    <div v-else class="pt-4 container animate__animated animate__fadeIn min-vh-100">
      <div class="section-panel">
        <div class="col-lg-8">
          <div class="fw-bold">
            Watch and Register for all Summit
          </div>
          <div class="text-muted">
            Our summit brings together top professionals to discuss emerging technologies, ethical challenges, and
            real-world applications shaping our future.
          </div>
          <!-- <div class="mt-3">
      <SearchSummitsForm />
    </div> -->
        </div>
      </div>

      <div class="section-panel pt-3 pt-lg-0">
        <div class="section-title fs-4  mb-4">
          Latest Summits
        </div>

        <carousel :items-to-show="itemsPerScreenSize" snapAlign="start" :autoplay="5000" :wrapAround="false">

          <slide class="px-2" v-for="(summit, index) in summitStore.recentSummits" :key="index">
            <SummitsCardComponent :obj="summit" />
          </slide>

          <template #addons>
            <!-- <navigation /> -->
            <!-- <pagination /> -->
          </template>
        </carousel>
      </div>

      <div class="section-panel pt-3 pt-lg-0">
        <div class="section-title fs-4  mb-4">
          Older Summits
        </div>

        <div class="row g-3">

          <div class="col-md-6 col-lg-4" v-for="(summit, index) in summitStore.olderSummits" :key="index">
            <SummitsCardComponent :obj="summit" />
          </div>

          <!-- <div class="col-12">
            <a class="float-end small theme-color text-decoration-none" href="#">Show more...</a>
          </div> -->
        </div>
      </div>

    </div>
  </div>



  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/templates/header.vue'
import footerVue from '@/components/templates/footer.vue'

import { useWindowSize } from '@vueuse/core';
import { computed, watchEffect, ref, onMounted } from 'vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import SearchSummitsForm from '@/components/templates/searchSummitsForm.vue';
import SummitsCardComponent from './SummitsCardComponent.vue';
import { useSummitStore } from './summitStore';
import { useRoute } from 'vue-router';
import SummitDetails from './SummitDetails.vue';
import api from '@/stores/Helpers/axios'
import ComponentLoading from '@/components/templates/componentLoading.vue';

const screenWidth = useWindowSize()
const itemsPerScreenSize = computed(() => { return screenWidth.width.value > 988 ? 3 : 1; })

const summitStore = useSummitStore()
const isLoadingSummits = ref<boolean>(true)

const route = useRoute()
const showDetails = ref<boolean>(false)
watchEffect(() => {
  showDetails.value = route?.query?.summit ? true : false
})


onMounted(() => {
  getSummits()
})

async function getSummits() {
  try {
    const { data } = await api.summits()
    console.log(data);

    summitStore.recentSummits = data?.active ?? []
    summitStore.olderSummits = data.expired ?? []
  } catch (error) {

  }
  finally {
    isLoadingSummits.value = false
  }

}

</script>