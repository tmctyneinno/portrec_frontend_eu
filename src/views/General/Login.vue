<template>
    <div class="wholePage">
        <div class="row justify-content-center g-0">
            <div class="side-image col-lg-4 d-none d-lg-block bg-danger min-vh-100"></div>
            <div
                class="animate__animated animate__fadeInUp col-lg-8 d-flex justify-content-center align-items-center min-vh-100">
                <div class="col-11 col-lg-12 row justify-content-center">
                    <div class="col-md-6">
                        <div class="col-12 ">
                            <div class="type-nav theme-color d-flex justify-content-aroun justify-content-evenly mb-3">
                                <span @click="formType = 'seeker'" class="fw-bolder cursor-pointer"
                                    :class="{ 'active': formType == 'seeker' }">
                                    Job Seeker
                                </span>
                                <span @click="formType = 'company'" class="fw-bolder cursor-pointer"
                                    :class="{ 'active': formType == 'company' }">
                                    Company
                                </span>
                            </div>
                        </div>
                        <div class="col-12 ">
                            <div class="fs-3 fw-light text-center mb-2">Welcom back, Dude</div>
                        </div>

                        <div class="col-12 mb-2">
                            <div class="card google-card rounded-0 p-2 ">
                                <div class="fw-bolder text-center theme-color">
                                    <img src="@/assets/images/google_icon.png"> &nbsp;Login with Google
                                </div>
                            </div>
                        </div>

                        <div class="col-12 my-3">
                            <div class="lined-title text-muted">
                                Or login with email
                            </div>
                        </div>

                        <form @submit.prevent class="row g-2">
                            <div class="col-12">
                                <label class="fw-bold text-muted">Email Address:</label>
                                <input type="text" class="form-control form-control-l  rounded-0"
                                    placeholder="Enter email address">
                            </div>
                            <div class="col-12">
                                <label class="fw-bold text-muted">Password:</label>
                                <input type="text" class="form-control form-control-l  rounded-0"
                                    placeholder="Enter password">
                            </div>
                            <div class="col-12 mt-3">
                                <button type="submit" class="btn btn-lg btn-primary rounded-0 w-100">
                                    Continue <i class="bi bi-chevron-right"></i>
                                </button>
                            </div>
                            <div class="col-12 mt-3">
                                Don't have an account? <router-link replace to="/signup"
                                    class="fw-bold theme-color text-decoration-none">Sign Up</router-link>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const formType = ref('seeker')
</script>

<style  scoped>
.wholePage {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    min-height: 100vh;
}

.type-nav span {
    padding: 7px 15px;
}

.active {
    background-color: #E9EBFD;
}

.google-card {
    cursor: pointer;
}

.google-card:hover {
    background-color: #eeeeee49;
}

.side-image {
    background: url('@/assets/images/signup.jpg') no-repeat;
    background-size: cover;
    background-position: center center;
}

.lined-title {
    overflow: hidden;
    text-align: center;
}

.lined-title:before,
.lined-title:after {
    background-color: #ccc;
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 50%;
}

.lined-title:before {
    right: 0.5em;
    margin-left: -50%;
}

.lined-title:after {
    left: 0.5em;
    margin-right: -50%;
}
</style>
