

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
                        <div class="mt-3 position-relativ animate__animated animate__slideInLeft">
                            <form @submit.prevent="" class="bg-white p-3 p-lg-4 overlay-for ">
                                <div class="col-12">
                                    <div class="row g-3">
                                        <div class="col-lg-4">
                                            <div class="input-group position-relative">
                                                <span class="input-group-text" id="addon-search"><i
                                                        class="bi bi-search"></i> </span>
                                                <input type="text" class="form-control" placeholder="Job title or keyword"
                                                    aria-describedby="addon-search">
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="input-group position-relative">
                                                <span class="input-group-text" id="addon-location"><i
                                                        class="bi bi-geo-alt"></i></span>
                                                <select class="form-select form-control" id="inputGroupSelect01">
                                                    <option selected>Choose...</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <button type="submit" class="btn btn-primary w-100 rounded-0">
                                                Search my job <i class="bi bi-chevron-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="mt-1">
                                Popupar: UI Designer, UX Researcher, Andrioid, Admin
                            </div>
                        </div>

                    </div>
                </div>

                <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 image-span animate__animated animate__slideInRight">
                    <img src="@/assets/images/hero-image.svg" class="hero-image" alt="">
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>

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


.input-group .form-control,
.input-group .input-group-text {
    background-color: #fff !important;
    outline: 0;
    border-width: 0 0 1px;
    font-size: 14px;
    border-radius: 0px;
}

.hero-image {
    max-width: 130%;
    height: auto;
}

.overlay-form {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
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
