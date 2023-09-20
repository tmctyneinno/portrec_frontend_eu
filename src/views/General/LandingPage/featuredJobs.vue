
<template>
    <div class="section-panel">
        <div class="container">
            <div class="col-12">
                <div class="row">
                    <div class="col-8">
                        <div class="section-title">Featured <span class="theme-color fw-bold">jobs</span> </div>
                    </div>
                    <div class="col-4 d-flex justify-content-end align-items-center ">
                        <span class="hover-tiltX float-end theme-color cursor-pointer fw-bolder section-right">
                            show all jobs <i class="bi bi-arrow-right-short"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <div class="row g-4">
                    <jobsDisplayVue2 v-for="(data, index) in dataList" :key="index" :job="data" />
                </div>


            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import jobsDisplayVue2 from '@/components/jobsDisplay2.vue';

const dataList: any = [
    {
        title: 'Email Marketing',
        company: 'Revoult',
        location: 'Madrid, Spain',
        jobType: 'full',
        tags: ['marketing', 'design']
    },

    {
        title: 'Brand Designer',
        company: 'DropBox',
        location: 'San Francisco, US',
        jobType: 'full',
        tags: ['design', 'business']
    },
    {
        title: 'Email Marketing',
        company: 'Pitch',
        location: 'Berling, Germany',
        jobType: 'full',
        tags: ['marketing']
    },

    {
        title: 'UI/UX Designer',
        company: 'Pitch',
        location: 'Berling, Germany',
        jobType: 'full',
        tags: ['technology']
    },
    {
        title: 'Media Expert',
        company: 'Pitch',
        location: 'Berling, Germany',
        jobType: 'full',
        tags: ['technology', 'business']
    },
    {
        title: 'Cleaner',
        company: 'Maldavis',
        location: 'Toronto, Spain',
        jobType: 'full',
        tags: ['business']
    },
    {
        title: 'Web Designer',
        company: 'Magnet',
        location: 'Abuja, Nigeria',
        jobType: 'part',
        tags: ['technology', 'business']
    },
    {
        title: 'Web Designer',
        company: 'Magnet',
        location: 'Abuja, Nigeria',
        jobType: 'part',
        tags: ['technology', 'business']
    },

]

</script>


