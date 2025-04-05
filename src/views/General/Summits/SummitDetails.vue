<template>
  <div class="pt-4 container animate__animated animate__fadeIn">
    <div class="row g-3">

      <div class="col-md-8">
        <div class="card min-vh-100">
          <div class="card-body">
            Details
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="section-title fs-4  mb-4">
          Older Summits
        </div>

        <div class="row g-3">

          <div class="col-12" v-for="(summit, index) in summitStore.olderSummits" :key="index">
            <SummitsCardComponent :obj="summit" />
          </div>

          <div class="col-12">
            <a class="float-end small theme-color text-decoration-none" href="#">Show more...</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import SummitsCardComponent from './SummitsCardComponent.vue';
import { useSummitStore } from './summitStore';

const summitStore = useSummitStore()
</script>