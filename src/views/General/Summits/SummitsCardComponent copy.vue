<template>

  <div @click="goToSubmitDetails()" class="card text-start summit-card h-100 rounded-top-4 hover-tiltY">
    <img class="card-img-top" :src="obj.image ?? 'images/summitImage.png'" alt="Title" />
    <div class="card-body pb-0">
      <h6 class="card-title fw-bold small">{{ obj?.title }}</h6>
      <div class="card-text xsmall mt-2">
        <div>Theme: {{ obj?.theme }}</div>
        <div>Date & Time: {{ new Date(obj?.summit_date).toUTCString() }}</div>
        <div>Location: {{ obj?.venue }}</div>
        <!-- <div class="mt-2">
          Speakers:
          <ul>
            <li v-for="({ name, title }, index) in obj.speakers" :key="index">
              {{ name }} <i class="bi bi-dash-lg"></i> {{ title }}
            </li>
          </ul>
        </div> -->
      </div>
    </div>
    <div class="card-footer border-0 bg-transparent pt-0 mt-0">
      <button class="btn-link theme-color text-decoration-none btn btn-link float-end hover-tiltX ">
        Details <i class="bi bi-arrow-right"></i>
      </button>
    </div>

    <!-- <div class="curtain" :style="{ 'background-image': `url(${obj.image})` }"></div> -->
  </div>

</template>

<script setup lang="ts">

import type { SummitInterface } from '@/stores/interfaces';
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';

const prop = defineProps({
  obj: {
    type: Object as PropType<SummitInterface>,
    required: true,
  }
})

const router = useRouter()
function goToSubmitDetails() {
  router.push({
    path: '/summits',
    query: {
      summit: prop.obj.title,
      ref: prop.obj.id,
      tme: new Date().getTime()
    }
  })
}

</script>

<style scoped>
.summit-card {
  position: relative;
  overflow: hidden;
  /* background-color: #f8f9fa; */
  cursor: pointer;
}

/* Top image stays as normal */
.card-img-top {
  width: 100%;
  height: auto;
  display: block;
}
</style>