
<template>
    <div class="section-panel section-panel-light slanted-left">
        <div class="container">
            <div class="col-12">
                <div class="row">
                    <div class="col-8">
                        <div class=" section-title">Latest Jobs open</div>
                    </div>
                    <div class="col-4 d-flex justify-content-end align-items-center ">
                        <span class="hover-tiltX float-end theme-color cursor-pointer fw-bolder me-0 section-right">
                            show all jobs <i class="bi bi-arrow-right-short"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <div class="row g-4">
                    <div v-for="i in 8" :key="i" class="col-lg-6">
                        <div class="card rounded-0 card-latest p-3 py-lg-4 hover-tiltY cursor-pointer">
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
                                            <span class="b-tag full-time-tag">Full-Time</span>
                                        </span>
                                        <span class="b-tag marketing-tag">Marketing</span>
                                        <span class="b-tag design-tag">Design</span>
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
.card-latest {
    border: 0;
}

.card-latest:hover {
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
    border: 1px solid var(--theme-color);
}

.b-tag {
    font-size: 12px;
    padding: 7px 15px;
    border-radius: 40px;
    margin: 0px;
    margin-right: 10px;
    /* width notch */
    border-width: 1px;
    border-style: solid;
}

.border-right {
    border-right: 1px solid #e5e5e5;
    margin-right: 10px;
}

/* .b-tag:hover {
    font-weight: bolder;
} */

.full-time-tag {
    color: #E63468;
    background-color: #56cdad32;
    border: 0;
}

.marketing-tag {
    color: #FFB836;
    border-color: #FFB836;
}

.design-tag {
    color: #873A70;
    border-color: #873A70;
}

@media (max-width: 767px) {
    .b-tag {
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


.slanted-left {
    position: relative;
}

.slanted-left::before,
.slanted-left::after {
    content: "";
    position: absolute;
    /* background-color: inherit; */
}

.slanted-left::before {
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    transform-origin: top left;
    transform: skew(-60deg);
}

/* .slanted-left::after {
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    transform-origin: top right;
    transform: skew(20deg);
} */
</style>
