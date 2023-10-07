<template>
    <div class="col-lg-6">
        <div class="card rounded-0 card-latest p-3 py-lg-4 hover-tiltY cursor-pointer">
            <div class="row">
                <div class="col-3">
                    <img src="@/assets/images/jobs/round.png" width="60" alt="">
                </div>
                <div class="col-9">
                    <h5 class="slide-title">Social Media Assistant <i class="bi d-md-none bi-chevron-right"></i></h5>
                    <div class="slide-info text-muted small">Nomad <i class="bi bi-dot"></i> Paris, France
                    </div>
                    <div class="col-12 mt-3">
                        <span class="border-right">
                            <span class="category-tag fulltime-tag">Full-Time</span>
                        </span>
                        <span class="category-tag marketing-tag">Marketing</span>
                        <span class="category-tag design-tag">Design</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
// const props = defineProps({
//     job: {
//         type: Object,
//         required: true,
//     }
// })
</script>
<style scoped>
.card-latest {
    /* border-color: #fff; */
    /* border-width: 2px; */
    border-color: transparent;
}

.card-latest:hover {
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
    /* border: 2px solid var(--theme-color); */
    border-color: var(--theme-color);
    background-color: var(--theme-color2-soft);
}

.card-latest:hover .slide-title {
    color: var(--theme-color);
}


@media (max-width: 767px) {
    .slide-title {
        font-size: 14px;
        color: var(--theme-color);
    }

    /* .slide-info {} */

}
</style>
