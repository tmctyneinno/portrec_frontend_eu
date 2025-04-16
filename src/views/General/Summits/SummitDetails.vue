<template>
  <JobDescriptionInfoSkeleton v-if="isLoadingdetails" />
  <div v-else class="py-5 container animate__animated animate__fadeIn">
    <div class="row g-3 mb-5">
      <div class="col-md-8">
        <!-- <div class="section-title fs-5 mb-2">
          Recent summits
        </div> -->
        <div class="card min-vh-100">
          <!-- <img class="card-img-top" src="/images/summitImage.png" alt="Title" /> -->
          <img class="card-img-top" :src="summitDetails?.image ?? '/images/summitImage.png'" alt="Title" />
          <div class="card-body">
            <h4 class="card-title fw-bold mt-3">{{ summitDetails?.title }}</h4>
            <div class="card-text  mt-2">
              <!-- <div>Theme: {{ summitDetails.theme }}</div> -->
              <div>Date & Time: {{ new Date(summitDetails?.summit_date ?? new Date()).toUTCString() }}</div>
              <div>Location: {{ summitDetails?.venue }}</div>
              <!-- <div class="mt-2">
                Speakers:
                <ul>
                  <li v-for="({ name, title }, index) in summitDetails.speakers" :key="index">
                    {{ name }} <i class="bi bi-dash-lg"></i> {{ title }}
                  </li>
                </ul>
              </div> -->

              <section class="mt-5">
                <div class="fw-bold">
                  About the Summit
                </div>
                <div v-html="summitDetails?.content">
                </div>

                <div class="mt-5">
                  <PrimaryButton @click="goToSummitLink">
                    Register to attend
                  </PrimaryButton>
                </div>

              </section>

            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="section-title fs-5 mb-2">
          Other summits
        </div>

        <div class="row g-3">
          <div class="col-12" v-for="(summit, index) in [...summitStore.recentSummits, ...summitStore.olderSummits]"
            :key="index">
            <SummitsCardComponent :obj="summit" />
          </div>

          <!-- <div class="col-12">
            <a class="float-end small theme-color text-decoration-none" href="#">Show more...</a>
          </div> -->
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { SummitInterface } from '@/stores/interfaces';
import SummitsCardComponent from './SummitsCardComponent.vue';
import { useSummitStore } from './summitStore';
import { onMounted, ref } from 'vue';
import JobDescriptionInfoSkeleton from '@/components/skeletonLoaders/jobDescriptionInfoSkeleton.vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/stores/Helpers/axios'
import PrimaryButton from '@/components/buttons/primaryButton.vue';

const summitStore = useSummitStore()


const route = useRoute()
const router = useRouter()
const isLoadingdetails = ref<boolean>(false)
const summitDetails = ref<SummitInterface | null>()
const otherSummits = ref<SummitInterface[]>([])

onMounted(() => {
  if (!route?.query?.ref) router.back()
  loadSummitDetails()
})


async function loadSummitDetails() {
  try {
    isLoadingdetails.value = true
    const { data } = await api.summitsDetails(route.query.ref)
    summitDetails.value = data?.summit ?? []
    otherSummits.value = data?.summits ?? []
  } catch (error) {

  }
  finally {
    isLoadingdetails.value = false
  }
}

function goToSummitLink() {
  window.open(summitDetails.value?.link, '_blank'); // Open in a new tab
}

const schedulesTable = ref<{ time: string, session: string, speaker: string }[]>([
  { time: '10:00 AM', session: 'Welcome & Opening Remarks', speaker: 'Host Name' },
  { time: '10:30 AM', session: 'Keynote: The Future of AI', speaker: 'John Doe' },
  { time: '11:30 AM', session: 'Panel Discussion: Cybersecurity', speaker: 'Jane Smith' },
  { time: '12:30 PM', session: 'Break', speaker: '-' },
  { time: '1:00 PM', session: 'Workshop: AI Ethics & Regulations', speaker: 'Dr. Michael' },
  { time: '2:30 PM', session: 'Closing Remarks', speaker: 'Dr. Brown' },
])


</script>