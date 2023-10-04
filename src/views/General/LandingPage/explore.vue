
<template>
    <div v-show="jobsStore.categories.length" class="section-panel min-vh-100">
        <div class="container">
            <div class="col-12">
                <div class="row">
                    <div class="col-8">
                        <div class="section-title">Explore by <span class="theme-color fw-bold">category</span> </div>
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
                    <div v-for="(cat, index) in  jobsStore.categories" :key="index" class="col-md-4 col-lg-3">
                        <div @click="router.push({ path: '/find-jobs', query: { category: cat.id } })"
                            class="card explore-card p-3 py-lg-4 hover-tiltY">
                            <div class="card-icon theme-color"><i class="bi" :class="cateIcon(cat.name)"></i> </div>
                            <h3 class="card-title fw-light my-2 text-capitalize">{{ cat.name }}</h3>
                            <div class="fw-bolder">{{ cat.total_jobs }} jobs available <i class="bi bi-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useJobsStore } from '@/stores/jobsStore';
import { onMounted } from 'vue';

const jobsStore = useJobsStore()
const router = useRouter()

onMounted(() => {
    jobsStore.getJobCategories()
})

const cateIcon = (name: string) => {
    let iconsArray = [
        { name: 'design', icon: 'bi-vector-pen' },
        { name: 'sales', icon: 'bi-bar-chart' },
        { name: 'marketing', icon: 'bi-megaphone' },
        { name: 'finance', icon: 'bi-currency-exchange' },
        { name: 'technology', icon: 'bi-laptop' },
        { name: 'engineering', icon: 'bi-code-slash' },
        { name: 'business', icon: 'bi-briefcase' },
        { name: 'human resource', icon: 'bi-people' },
    ]
    let $found = iconsArray.find(x => x.name == name.toLocaleLowerCase());
    return $found ? $found.icon : '';
}

</script>

<style scoped>
.card-icon {
    font-size: 2.51rem;
}

.explore-card {
    border-radius: 0%;
    cursor: pointer;
}

.explore-card:hover {
    background-color: var(--theme-color);
    color: #fff;
}

.explore-card:hover .bi {
    color: #fff !important;
}


@media (max-width: 767px) {

    .explore-text,
    .explore-text .theme-color {
        font-size: 20px;
    }

    /* .card-icon {
        font-size: 1.7rem;
    } */

}
</style>
