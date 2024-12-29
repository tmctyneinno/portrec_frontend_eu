<template>
    <div v-if="featurdJobsList.length" class="section-panel min-vh-100">
        <div class="container">
            <div class="col-12">
                <div class="row">
                    <div class="col-8">
                        <div class="section-title">Featured <span class="theme-color fw-bold">jobs</span> </div>
                    </div>
                    <div class="col-4 d-flex justify-content-end align-items-center ">
                        <router-link to="/find-jobs"
                            class="hover-tiltX float-end theme-color cursor-pointer fw-bolder section-right">
                            show all jobs <i class="bi bi-arrow-right-short"></i>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <div class="row g-4">
                    <featuredJobsCard @click="goToJob(data.id)" v-for="(data, index) in featurdJobsList" :key="index"
                        :job="data" />
                </div>

            </div>

            <!-- pagination -->
            <div class="mt-5">
                <customPagination :currentPage="pagination.currentPage" :perPage="pagination.perPage"
                    :totalRecords="pagination.totalRecords" @moveToNext="paginateToNext" />
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import featuredJobsCard from '@/components/featuredJobsCard.vue';
import { useRouter } from 'vue-router';
import { onMounted, reactive, ref, watch } from 'vue';
import { useJobsStore } from '@/stores/jobsStore';


const jobsStore = useJobsStore()

const featurdJobsList = ref<any[]>([])
const pagination = reactive({
    currentPage: 0,
    totalPages: 0,
    perPage: 0,
    totalRecords: 0,
})


onMounted(() => {
    loadFeaturedJobs()

})

async function loadFeaturedJobs(page = 1) {
    await jobsStore.getFeaturedJobs(page)
    featurdJobsList.value = jobsStore.featured.data
    pagination.currentPage = jobsStore.featured?.current_page ?? 0
    pagination.totalPages = jobsStore.featured?.last_page ?? 0
    pagination.perPage = jobsStore.featured?.per_page ?? 0
    pagination.totalRecords = jobsStore.featured?.total ?? 0
}


function paginateToNext(page: any) {
    window.scrollTo(0, 0)
    loadFeaturedJobs(page)
}



const router = useRouter()

function goToJob(id: any) {
    router.push({ path: `job-description/${btoa(id)}`, query: { t: new Date().getTime() } })
}

</script>

<style scoped>
.section-panel {
    background-color: var(--theme-color2-soft);
}
</style>
