
<template>
    <div class="section-panel min-vh-100 section-panel-light">
        <div class="container">
            <div class="col-12">
                <div class="row">
                    <div class="col-8">
                        <div class="section-title">Quick Career <span class="theme-color fw-bold">Tips</span> </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <div class="row g-4">
                    <div v-for="i in 3" :key="i" class="col-md-4">
                        <div class="card border-0 rounded-0">
                            <img class="card-img-top rounded-0" src="@/assets/images/career.jpg" alt="Title">
                            <div class="card-body">
                                <div class="card-title">
                                    <span class="fs-6 fw-bold">2022 Salary guide</span>
                                    <span class="small text-muted float-end">5 mins read</span>
                                </div>
                                <p class="card-text text-muted">
                                    View the latest salary guide for recruitment insights, expected salaries and contract
                                    rates for professional roles in your region
                                </p>
                            </div>
                            <div class="card-footer py-3 bg-transparent border-0 hover-tiltX">
                                <router-link class="theme-color" to="/">Read More</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>