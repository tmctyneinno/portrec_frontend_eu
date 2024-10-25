<template>
    <div :class="size == 'half' ? 'col-lg-6' : ''">
        <div class="card card-latest p-3 py-lg-4 hover-tiltY cursor-pointer">
            <div class="row">
                <div class="col-3 row align-content-center ">
                    <img :src="job.image" alt="_img">
                </div>
                <div class="col-9">
                    <h5 class="slide-title job_title">
                        {{ job.title ?? '' }} <i class="bi d-md-none bi-chevron-right"></i>
                    </h5>
                    <div class="slide-info text-muted small text-capitalize">
                        {{ job.company?.name ?? '' }} <i class="bi bi-dot"></i>
                        {{ job.company?.city ?? '' }},
                        {{ job.company?.country ?? '' }}
                    </div>
                    <div class="col-12 mt-3">
                        <span class="border-right">
                            <span class="category-tag fulltime-tag text-capitalize">
                                {{ job.job_type?.name ?? 'Full Time' }}
                            </span>
                        </span>
                        <span class="category-tag text-capitalize" :class="job.industry?.name ?? '' + '-tag'">
                            <!-- {{ job.category?.name ?? '' }} -->
                            {{ job.industry?.name ?? '' }}
                            <!-- {{ job }} -->
                        </span>
                        <!-- <span class="category-tag text-capitalize">
                            {{ job.sub_category?.name ?? '' }}
                        </span> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps({
    job: {
        type: Object,
        required: true,
    },
    size: {
        default: 'half'
    }
})
</script>
<style scoped>
.card-latest {
    /* border-color: #fff; */
    /* border-width: 2px; */
    /* border-color: transparent; */
    /* border-left: 1px solid var(--theme-color); */
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
}

/* .card-latest:hover {
    border: 2px solid var(--theme-color);
    border-color: var(--theme-color);
    background-color: var(--theme-color2-soft);
} */

.card-latest:hover .slide-title {
    color: var(--theme-color);
}

.job_title {
    font-size: 20px !important;
    font-weight: 700;
    text-transform: capitalize;
}


@media (max-width: 767px) {
    .slide-title {
        font-size: 14px;
        color: var(--theme-color);
    }

    /* .slide-info {} */

}
</style>
