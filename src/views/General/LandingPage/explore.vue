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
                    <div v-for="(cat, index) in visibleItems" :key="index" class="col-md-4 col-lg-3">
                        <div @click="gotoFindJobs(cat.id)" class="card explore-card shadow-sm  hover-tiltY h-100">
                            <div class="card-body">
                                <div class="card-icon theme-color"><i class="bi" :class="cateIcon(cat.name)"></i> </div>
                                <h4 class="card-title fw-light my-2 text-capitalize">{{ cat.name }}</h4>
                            </div>

                            <div class=" card-footer bg-transparent border-0">
                                <span class="float-end fw-bolder">{{ cat.total_jobs }}
                                    {{ cat.total_jobs == 1 ? 'job' : 'jobs' }} available
                                    <i class="bi bi-arrow-right"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 pt-5">
                <div class="row justify-content-end">
                    <div>
                        <button class="btn btn-link float-end border-0 theme-color" v-if="showSeeMore"
                            @click="increaseLimitToShow">see
                            more.. <i class="bi bi-arrow-down small"></i></button>
                        <button class="btn btn-link float-end border-0 text-dark" v-if="showSeeLess"
                            @click="reduceLimitToShow">see less.. <i class="bi bi-arrow-up small"></i></button>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useJobsStore } from '@/stores/jobsStore';
import { computed, onMounted, ref } from 'vue';

const jobsStore = useJobsStore()
const router = useRouter()

const categories = ref<any[]>([])

onMounted(async () => {
    await jobsStore.getJobCategories()
    categories.value = jobsStore.categories
})


// Reactive state for managing the current visible limit
const limitToShow = ref(8);

// Compute the items to display based on the limit
const visibleItems = computed(() => categories.value.slice(0, limitToShow.value));

// Control visibility of buttons
const showSeeMore = computed(() => limitToShow.value < categories.value.length);
const showSeeLess = computed(() => limitToShow.value > 8);

// Handlers for the buttons
const increaseLimitToShow = () => {
    limitToShow.value = Math.min(limitToShow.value + 8, categories.value.length);
};

const reduceLimitToShow = () => {
    limitToShow.value = Math.max(limitToShow.value - 8, 8);
};







const cateIcon = (name: string) => {
    let iconsArray = [
        { name: 'design', icon: 'bi-vector-pen' },
        { name: 'creative & design', icon: 'bi-vector-pen' },
        { name: 'construction, education', icon: 'bi-duffle' },
        { name: 'sales', icon: 'bi-bar-chart' },
        { name: 'marketing', icon: 'bi-megaphone' },
        { name: 'finance', icon: 'bi-currency-exchange' },
        { name: 'accounting, auditing & finance', icon: 'bi-currency-exchange' },
        { name: 'banking, finance & insurance', icon: 'bi-currency-exchange' },
        { name: 'technology', icon: 'bi-laptop' },
        { name: 'engineering', icon: 'bi-code-slash' },
        { name: 'business', icon: 'bi-briefcase' },
        { name: 'human resource', icon: 'bi-people' },
    ]
    // return 'bi-tags';
    let $found = iconsArray.find(x => x.name == name.toLocaleLowerCase());
    return $found ? $found.icon : 'bi-tags';
}

function gotoFindJobs(id: any) {
    let industry_id = [];
    industry_id.push(id)
    jobsStore.queryObj.industry_id = industry_id;
    router.push({ path: '/find-jobs' })
}

</script>

<style scoped>
.section-panel {
    background-color: var(--theme-color2-soft);
}

.card-icon {
    font-size: 2rem;
}

.explore-card {
    /* border-radius: 0%; */
    cursor: pointer;
    border: 0px;
    min-height: 200px;
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
