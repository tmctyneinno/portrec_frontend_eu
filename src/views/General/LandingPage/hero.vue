

<template>
    <div class="section-panel-light min-vh-100 overflow-hidden py-3">
        <div class="container">
            <div class="row justify-content-between align-items-center min-vh-100">
                <div class="col-lg-7 col-md-7 col-sm-12 col-12">
                    <div class="hero-text">
                        <div class="find animate__animated animate__slideInLeft animate__faster">Find Your Dream Employment.
                        </div>
                        <div class="theme-color2 with-us animate__animated animate__slideInLeft ">With Us.</div>
                        <div class="small-text text-muted animate__animated animate__fadeInLeft animate__slower">
                            Great platform for the job seeker that is searching for new carreer heights and
                            passionate about startups.
                        </div>
                        <searchJobFormVue />

                    </div>
                </div>

                <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 image-span animate__animated animate__slideInRight">
                    <img src="@/assets/images/hero/hero-image.svg" class="hero-image" alt="">
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import searchJobFormVue from '@/components/searchJobForm.vue';
</script>

<style scoped>
.hero-text .find,
.hero-text .with-us {
    font-weight: 700;
    line-height: 1.2;
    font-size: 63px;
}

.hero-text .small-text {
    font-size: 17px;
}


.hero-image {
    max-width: 130%;
    height: auto;
}



@media (max-width: 767px) {
    .hero-text {
        margin-top: 100px;
    }

    .hero-text .find,
    .hero-text .with-us {
        /* line-height: 30px; */
        font-size: 50px;
    }

    .hero-text .small-text {
        font-size: 14px;
    }

    /* .image-span {
    display: flex;
    justify-content: center;
  } */

    .hero-image {
        margin-top: 30px;
        max-width: 100%;
        height: auto;
    }
}
</style>
