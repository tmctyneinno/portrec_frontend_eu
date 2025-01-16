<template>
    <div class="col-sm-6 col-lg-4">
        <div class="featured-card card h-100 hover-tiltY shadow-sm">
            <div class="card-header border-0 bg-transparent pt-3 ">
                <!-- <span>Logo</span> -->
                <span class="float-end top-tag text-capitalize">
                    {{ jobTypeName }}
                </span>
            </div>
            <div class="card-body py-0 py-lg-">
                <div class="card-title fw-bold fs-6">{{ props.job.title }} <i class="bi d-md-none bi-chevron-right"></i>
                </div>
                <div class="text-muted">
                    <!-- {{ props.job.company }} -->
                    <!-- <i class="bi bi-dot"></i> -->
                    <i class="bi bi-geo-alt"></i>
                    {{ props.job.location }}
                    <div class="xsmall fw-bolder">({{ props.job.min_salary }} - {{ props.job.max_salary }}) USD </div>
                </div>
                <p class="mt-1 mt-lg-2 mb-0">{{ props.job.description }}</p>
            </div>
            <div class="card-footer bg-transparent border-0 pb-2 pb-lg-4 d-inline-block">
                <span :class="tag + '-tag'" v-for="(tag, i) in requiredSkills" :key="i"
                    class="category-tag d-inline-block mb-2">
                    {{ tag }}
                </span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useJobsStore } from '@/stores/jobsStore';
import { computed, ref, watchEffect } from 'vue';

const jobsStore = useJobsStore()
const jobTypeName = ref<string>()



watchEffect(async () => {
    await jobsStore.getJobTypes()
    const jobtype = jobsStore.types.find((x: any) => x.id == props.job.job_type_id)
    jobTypeName.value = jobtype ? jobtype.name : ''
})

const requiredSkills = computed(() => {
    let array: any[] = []
    const skills = props.job.required_skills
    if (skills) {
        const parsed = JSON.parse(props.job.required_skills)
        array = parsed.map((x: any) => x.name)
    }
    return array;
})


const props = defineProps({
    job: {
        type: Object,
        required: true,
    }
})
</script>
<style scoped>
.card-icon {
    font-size: 2.51rem;
}

.top-tag {
    color: var(--theme-color);
    border: 1px solid var(--theme-color);
    padding: 3px 6px;
    font-size: 12px;
}

.featured-card {
    /* border-radius: 0%; */
    cursor: pointer;
    border: 0px;
}

.featured-card:hover {
    /* box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important; */
    /* border-color: var(--theme-color); */
    /* background-color: var(--theme-color2-soft); */
    /* border-width: 2px; */
}

.featured-card:hover .card-title {
    color: var(--theme-color);
}


@media (max-width: 767px) {
    .featured-card .card-title {
        color: var(--theme-color);
    }
}
</style>