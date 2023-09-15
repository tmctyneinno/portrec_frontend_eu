
<template>
    <div class="section-panel section-panel-light">
        <div class="container">
            <div class="col-12">
                <div class="row">
                    <div class="col-9">
                        <div class=" section-title">Latest Jobs open</div>
                    </div>
                    <div class="col-3 d-flex justify-content-end align-items-center ">
                        <span class="float-end theme-color cursor-pointer fw-bolder me-0 section-right">
                            show all jobs <i class="bi bi-arrow-right-short"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <div class="row g-4">
                    <div v-for="i in 8" :key="i" class="col-lg-6">
                        <div class="card card-latest p-3 py-lg-4 hover-tiltX border-0">
                            <div class="row">
                                <div class="col-4">
                                    <img src="@/assets/images/round.png" width="100" alt="">
                                </div>
                                <div class="col-8">
                                    <h3 class="slide-title">Social Media Assistant</h3>
                                    <div class="slide-info text-muted small">Nomad <i class="bi bi-dot"></i> Paris, France
                                    </div>
                                    <div class="col-12 mt-3">
                                        <span class="border-right">
                                            <span class="b-btn full-time-btn">Full-Time</span>
                                        </span>
                                        <span class="b-btn marketing-btn">Marketing</span>
                                        <span class="b-btn design-btn">Design</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<script lang="ts" setup>

</script>

<style scoped>
.card-latest:hover {
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
}

.b-btn {
    font-size: 12px;
    padding: 7px 15px;
    border-radius: 40px;
    cursor: pointer;
    margin: 0px;
    margin-right: 10px;
    border-width: 1px;
    border-style: solid;
    font-weight: bolder;
}

.border-right {
    border-right: 1px solid #e5e5e5;
    margin-right: 10px;
}

/* .b-btn:hover {
    font-weight: bolder;
} */

.full-time-btn {
    color: #E63468;
    background-color: #56cdad32;
    border: 0;
}

.marketing-btn {
    color: #FFB836;
    border-color: #FFB836;
}

.design-btn {
    color: #873A70;
    border-color: #873A70;
}

@media (max-width: 767px) {
    .b-btn {
        font-size: 9px;
        padding: 6px 9px;
        margin-right: 4px;
    }

    .border-right {
        margin-right: 4px;
    }

    .slide-title {
        font-size: 18px;
    }

    /* .slide-info {} */

}
</style>
