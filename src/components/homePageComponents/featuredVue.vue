
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
                    <div v-for="(data, index) in dataList" :key="index" class="col-sm-6 col-lg-3">
                        <div class="featured-card card h-100 hover-tiltY">
                            <div class="card-header border-0 bg-transparent pt-3 ">
                                <span>Logo</span>
                                <span class="float-end top-tag">
                                    {{ data.jobType == 'full' ? 'Full Time' : 'Part Time' }}
                                </span>
                            </div>
                            <div class="card-body">
                                <div class="card-title fw-bold fs-6">{{ data.title }}</div>
                                <div class="text-muted">
                                    {{ data.company }}
                                    <i class="bi bi-dot"></i>
                                    {{ data.location }}
                                </div>
                                <p class="mt-3">Revoult is looking for Email marketing to help ma...</p>
                            </div>
                            <div class="card-footer bg-transparent border-0 pb-4">
                                <span :class="tag + '-tag'" v-for="(tag, i) in data.tags" :key="i" class="bottom-tag me-3">
                                    {{ tag }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>

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

<style scoped>
.card-icon {
    font-size: 2.51rem;
}

.top-tag {
    color: var(--theme-color);
    border: 1px solid var(--theme-color);
    padding: 4px 9px;
}

.featured-card {
    border-radius: 0%;
    cursor: pointer;

}

.featured-card:hover {
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
    border-color: var(--theme-color);
    border-width: 2px;
}

.featured-card:hover .card-title {
    color: var(--theme-color);
}


.bottom-tag {
    border-radius: 35px;
    padding: 5px 13px;
    font-size: smaller;
    background-color: #efefef86;
    text-transform: capitalize;
}

.marketing-tag {
    color: #FFB836;
    background-color: #EB853310;
}

.design-tag {
    color: #E63468;
    background-color: #56cdad10;
}

.business-tag {
    color: #873A70;
    background-color: #4640DE10;
}

.technology-tag {
    color: #1AB2B5;
    background-color: #FF655010;
}


@media (max-width: 767px) {}
</style>
