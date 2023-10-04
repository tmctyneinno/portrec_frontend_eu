<template>
    <div class="wholePage">
        <div class="row justify-content-center g-0">
            <div class="side-image col-lg-4 d-none d-lg-block bg-danger min-vh-100"></div>
            <div
                class="animate__animated animate__fadeIn col-lg-8 d-flex justify-content-center align-items-center min-vh-100">
                <div class="col-11 col-lg-12 row justify-content-center">
                    <div class="col-md-6">

                        <div class="col-12 ">
                            <div class="fs-4 fw-lighter text-center mb-2">Reset Password</div>
                        </div>

                        <form @submit.prevent class="row g-2">
                            <div class="col-12">
                                <label class="fw-bold text-muted small">New passoword:</label>
                                <input type="text" class="form-control form-control-l  rounded-0"
                                    placeholder="Enter email address">
                            </div>
                            <div class="col-12">
                                <label class="fw-bold text-muted small">Repeat new password:</label>
                                <input type="text" class="form-control form-control-l  rounded-0"
                                    placeholder="Enter password">
                            </div>

                            <div class="col-12 mt-3">
                                <button type="submit" class="btn btn-lg btn-primary rounded-0 w-100">
                                    Reset Password
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style  scoped>
.wholePage {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    min-height: 100vh;
}



.google-card:hover {
    background-color: #eeeeee49;
}

.side-image {
    background: url('@/assets/images/signup.jpg') no-repeat;
    background-size: cover;
    background-position: center center;
}
</style>
