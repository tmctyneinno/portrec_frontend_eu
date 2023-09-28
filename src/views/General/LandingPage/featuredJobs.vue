
<template>
    <div class="section-panel min-vh-100">
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
                    <jobsDisplayVue2 @click="router.push({ 'path': `/job-description/${data.id}` })"
                        v-for="(data, index) in dataList" :key="index" :job="data" />
                </div>


            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import jobsDisplayVue2 from '@/components/jobsDisplay2.vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const dataList: any = [
    {
        id: 1,
        title: 'Email Marketing',
        company: 'Revoult',
        location: 'Madrid, Spain',
        jobType: 'full',
        tags: ['marketing', 'design']
    },

    {
        id: 2,
        title: 'Brand Designer',
        company: 'DropBox',
        location: 'San Francisco, US',
        jobType: 'full',
        tags: ['design', 'business']
    },
    {
        id: 3,
        title: 'Email Marketing',
        company: 'Pitch',
        location: 'Berling, Germany',
        jobType: 'full',
        tags: ['marketing']
    },

    {
        id: 4,
        title: 'UI/UX Designer',
        company: 'Pitch',
        location: 'Berling, Germany',
        jobType: 'full',
        tags: ['technology']
    },
    {
        id: 5,
        title: 'Media Expert',
        company: 'Pitch',
        location: 'Berling, Germany',
        jobType: 'full',
        tags: ['technology', 'business']
    },
    {
        id: 6,
        title: 'Cleaner',
        company: 'Maldavis',
        location: 'Toronto, Spain',
        jobType: 'full',
        tags: ['business']
    },
    {
        id: 7,
        title: 'Web Designer',
        company: 'Magnet',
        location: 'Abuja, Nigeria',
        jobType: 'part',
        tags: ['technology', 'business']
    },
    {
        id: 8,
        title: 'Web Designer',
        company: 'Magnet',
        location: 'Abuja, Nigeria',
        jobType: 'part',
        tags: ['technology', 'business']
    },

]

</script>


