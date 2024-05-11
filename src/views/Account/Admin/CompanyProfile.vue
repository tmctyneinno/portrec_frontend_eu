<template>
    <div class="row g-1">
        <div class="col-md-2 d-flex align-items-center">
            <img src="" alt="coy_logo">
        </div>
        <div class="col-md-10">
            <h1 class="large-coy-name"> Nomad </h1>
            <router-link to="#" class="theme-color">https://nomad.com</router-link>
            <div class="row g-3 mt-2">
                <div class="col-6 col-lg-3 d-flex align-items-center">
                    <i class="bi bi-fire info-icon me-2"></i>
                    <div>
                        <div clas="text-muted">Founded</div>
                        <div class="fw-bold lh-1">July 31, 2011</div>
                    </div>
                </div>
                <div class="col-6 col-lg-3 d-flex align-items-center">
                    <i class="bi bi-people info-icon me-2"></i>
                    <div>
                        <div clas="text-muted ">Employees</div>
                        <div class="fw-bold lh-1">4000+</div>
                    </div>
                </div>
                <div class="col-6 col-lg-3 d-flex align-items-center">
                    <i class="bi bi-geo-alt info-icon me-2"></i>
                    <div>
                        <div clas="text-muted ">Location</div>
                        <div class="fw-bold lh-1">20 countries</div>
                    </div>
                </div>
                <div class="col-6 col-lg-3 d-flex align-items-center">
                    <i class="bi bi-buildings info-icon me-2"></i>
                    <div>
                        <div clas="text-muted">Industry</div>
                        <div class="fw-bold lh-1">Social & Non-Profit</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <div class="row g-3">
        <div class="col-lg-8">
            <div class="card border-0 mb-3">
                <div class="card-body">
                    <h5 class="card-title bg-transparent border-0 fw-bold">
                        Company Profile
                        <span class="float-end floated-btn d-flex-center">
                            <i class="bi bi-pencil-square"></i>
                        </span>
                    </h5>
                    <div class="card-text">
                        Nomad is a software platform for starting and running internet businesses. Millions of
                        businesses rely on Stripe’s software tools to accept payments, expand globally, and manage their
                        businesses online. Stripe has been at the forefront of expanding internet commerce, powering new
                        business models, and supporting the latest platforms, from marketplaces to mobile commerce
                        sites. We believe that growing the GDP of the internet is a problem rooted in code and design,
                        not finance. Stripe is built for developers, makers, and creators. We work on solving the hard
                        technical problems necessary to build global economic infrastructure—from designing highly
                        reliable systems to developing advanced machine learning algorithms to prevent fraud.
                    </div>
                </div>
            </div>
            <div class="card border-0 mb-3">
                <div class="card-body">
                    <h5 class="card-title bg-transparent border-0 fw-bold">
                        Contact
                        <span class="float-end floated-btn d-flex-center">
                            <i class="bi bi-pencil-square"></i>
                        </span>
                        <span class="float-end floated-btn d-flex-center me-2">
                            <i class="bi bi-plus-lg"></i>
                        </span>
                    </h5>
                    <div class="card-text mt-3">
                        <div class="row g-3">
                            <div class=" col-md-6">
                                <div class="link-pane d-flex-center">
                                    <i class="bi bi-twitter-x me-1"></i>
                                    twitter.com/nomad
                                </div>
                            </div>
                            <div class=" col-md-6">
                                <div class="link-pane d-flex-center">
                                    <i class="bi bi-facebook me-1"></i>
                                    facebook.com/NomadHQ
                                </div>
                            </div>
                            <div class=" col-md-6">
                                <div class="link-pane d-flex-center">
                                    <i class="bi bi-linkedin me-1"></i>
                                    linkedin.com/company/nomad
                                </div>
                            </div>
                            <div class=" col-md-6">
                                <div class="link-pane d-flex-center">
                                    <i class="bi bi-envelope me-1"></i>
                                    nomad@gmail.com
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="card card border-0">
                <h5 class="card-title bg-transparent border-0 fw-bold">
                    Open Positions
                    <router-link to="#" class="float-end theme-color small">
                        Show all jobs <i class="bi bi-arrow-right"></i>
                    </router-link>

                </h5>
                <div class="card-text mt-3">
                    <div class="row g-3">
                        <jobsDisplay v-for="i in 12" :key="i" :job="job" :size="'full'" />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card border-0 mb-3">
                <div class="card-body">
                    <h5 class="card-title bg-transparent border-0 fw-bold">
                        Tech Stack
                        <span class="float-end floated-btn d-flex-center">
                            <i class="bi bi-pencil-square"></i>
                        </span>
                        <span class="float-end floated-btn d-flex-center me-2">
                            <i class="bi bi-plus-lg"></i>
                        </span>
                    </h5>
                    <div class="card-text mt-4">
                        <div class="row g-3">
                            <div class="col-6">
                                <img src="@/assets/images/companies/company.png" width="100" alt="">
                                <div class="small text-center">Stack</div>
                            </div>
                            <div class="col-6">
                                <img src="@/assets/images/companies/company.png" width="100" alt="">
                                <div class="small text-center">Stack2</div>
                            </div>
                            <div class="col-6">
                                <img src="@/assets/images/companies/company.png" width="100" alt="">
                                <div class="small text-center">Stack3</div>
                            </div>
                            <div class="col-6">
                                <img src="@/assets/images/companies/company.png" width="100" alt="">
                                <div class="small text-center">Stack4</div>
                            </div>
                            <div class="col-6">
                                <img src="@/assets/images/companies/company.png" width="100" alt="">
                                <div class="small text-center">Stack5</div>
                            </div>
                            <div class="col-6">
                                <img src="@/assets/images/companies/company.png" width="100" alt="">
                                <div class="small text-center">Stack6</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import jobsDisplay from '@/components/jobsDisplay.vue';
const job = {
    title: 'Frontend Engineer',
    company: {
        name: 'Company Name'
    }
}
</script>


<style lang="css" scoped>
.large-coy-name {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.46rem;
}

.info-icon {
    /* background-color: #FFB836; */
    /* color: #ffffff; */
    color: var(--theme-color);
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    border: 1px solid #ccc;
    align-items: center;
    border-radius: 50%;
    font-size: 11px;
}


.floated-btn {
    width: 25px;
    height: 25px;
    border: 1px solid #ccc;
    font-size: 12px;
    cursor: pointer;
}

.link-pane {
    cursor: pointer;
    border: 1px solid var(--theme-color);
    color: var(--theme-color);
}
</style>
