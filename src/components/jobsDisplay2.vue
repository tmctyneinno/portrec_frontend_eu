<template>
    <div class="col-sm-6 col-lg-3">
        <div class="featured-card card h-100 hover-tiltY">
            <div class="card-header border-0 bg-transparent pt-3 ">
                <span>Logo</span>
                <span class="float-end top-tag">
                    {{ props.job.jobType == 'full' ? 'Full Time' : 'Part Time' }}
                </span>
            </div>
            <div class="card-body py-0 py-lg-2">
                <div class="card-title fw-bold fs-6">{{ props.job.title }} <i class="bi d-md-none bi-chevron-right"></i>
                </div>
                <div class="text-muted">
                    {{ props.job.company }}
                    <i class="bi bi-dot"></i>
                    {{ props.job.location }}
                </div>
                <p class="mt-1 mt-lg-2 mb-0">Revoult is looking for Email marketing to help ma...</p>
            </div>
            <div class="card-footer bg-transparent border-0 pb-2 pb-lg-4">
                <span :class="tag + '-tag'" v-for="(tag, i) in props.job.tags" :key="i" class="category-tag">
                    {{ tag }}
                </span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
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
    border-radius: 0%;
    cursor: pointer;
}

.featured-card:hover {
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
    border-color: var(--theme-color);
    background-color: var(--theme-color2-soft);
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