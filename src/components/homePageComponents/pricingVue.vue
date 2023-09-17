
<template>
    <div class="section-panel">
        <div class="container">
            <div class="col-12">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="section-title text-center">
                            For Employers/
                            <span class="theme-color fw-bold">Recruiter</span>
                        </div>
                        <div class="text-center text-muted fs-4">
                            Choose a Subscription plan that best fits you.
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-5">
                <div class="row justify-content-center g-4">
                    <div class="col-lg-5">
                        <div class="card h-100">
                            <div class="card-header color-basic d-flex justify-content-center ">
                                <div>
                                    <h3> Basic </h3>
                                    <div>2 JOBS PER MONTH</div>
                                </div>
                                <div class="absolute">
                                    <div class="card round-card color-basic shadow">
                                        <div class="price-tag">$99</div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="pricing-details text-muted">
                                    <div v-for="i in 7" :key="i" class="my-3">
                                        <i class="bi bi-check-circle-fill text-success"></i> &nbsp;
                                        Lorem ipsum dolor sit amet consectetur.
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-transparent row justify-content-center border-0 py-3 px-5">
                                <button class="btn btn-basic">Select this Plan</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="card h-100 ">
                            <div class="card-header color-premium d-flex justify-content-center ">
                                <div>
                                    <h3> Premium </h3>
                                    <div>10 JOBS PER MONTH</div>
                                </div>
                                <div class="absolute">
                                    <div class="card round-card color-premium shadow">
                                        <div class="price-tag">$100</div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="pricing-details text-muted">
                                    <div v-for="i in 2" :key="i" class="my-3">
                                        <i class="bi bi-check-circle-fill text-success"></i> &nbsp;
                                        Lorem ipsum dolor sit amet consectetur.
                                    </div>
                                    <div v-for="i in 5" :key="i" class="my-3">
                                        <i class="bi bi-lock"></i> &nbsp;
                                        Lorem ipsum dolor sit amet consectetur.
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-transparent row justify-content-center border-0 py-3 px-5">
                                <button class="btn btn-premium">Select this Plan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-header {
    color: #fff;
    text-align: center;
    padding-bottom: 70px;
}



.color-basic {
    background-color: #E63468;
}

.color-premium {
    background-color: #1AB2B5;
}

.absolute {
    position: absolute;
    display: flex;
    justify-content: center;
    margin-top: 80px;
}

.round-card {
    height: 170px;
    width: 170px;
    border-radius: 50%;
    border: 5px solid #fff;
    display: flex;
    justify-content: center;
}

.price-tag {
    color: #fff;
    text-align: center;
    font-size: 60px;
    font-weight: 600;
}

.pricing-details {
    margin-top: 120px;
    font-size: 18px;
}

.btn {
    padding-block: 13px;
    border-radius: 20px;
}

.btn-basic {
    color: #E63468;
    border-color: #E63468;
}

.btn-basic:hover {
    color: #fff;
    background-color: #E63468;
}

.btn-premium {
    color: #1AB2B5;
    border-color: #1AB2B5;
}

.btn-premium:hover {
    color: #fff;
    background-color: #1AB2B5;
}
</style>