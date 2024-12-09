<template>
    <div class="section-panel min-vh-100 section-panel-light">
        <div class="container">
            <div class="col-12">
                <div class="row">
                    <div class="col-8">
                        <div class=" section-title">Latest Jobs open</div>
                    </div>
                    <div class="col-4 d-flex justify-content-end align-items-center ">
                        <router-link to="/find-jobs"
                            class="hover-tiltX float-end theme-color cursor-pointer fw-bolder me-0 section-right">
                            show all jobs <i class="bi bi-arrow-right-short"></i>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <div v-if="!jobsStore.latest.length">
                    <noDataShow text="No jobs posted" />
                </div>
                <div v-else class="row g-4">
                    <jobsDisplayVue :job="latest" v-for="(latest, i) in jobsStore.latest" :key="i"
                        @click="goToJob(latest.id)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import jobsDisplayVue from '@/components/jobsDisplay.vue';
import { useRouter } from 'vue-router';
import { useJobsStore } from '@/stores/jobsStore';
import { onMounted } from 'vue';

const jobsStore = useJobsStore()

onMounted(() => {
    jobsStore.getLatestJobs()
})


const router = useRouter()


function goToJob(id: any) {
    router.push({ path: `job-description/${btoa(id)}`, query: { t: new Date().getMilliseconds() } })
}
</script>
