<template>
    <div class="wholePage">
        <div class="row justify-content-center g-0">
            <div class="side-image col-lg-4 d-none d-lg-block bg-danger min-vh-100"></div>
            <div
                class="animate__animated animate__fadeInDown col-lg-8 d-flex justify-content-center align-items-center min-vh-100">
                <div class="col-11 col-lg-12 row justify-content-center">
                    <div class="col-md-6">
                        <div class="col-12 ">
                            <div class="type-nav theme-color d-flex justify-content-aroun justify-content-evenly mb-3">
                                <span @click="form.type = 'seeker'" class="fw-bolder cursor-pointer"
                                    :class="{ 'active': form.type == 'seeker' }">
                                    Job Seeker
                                </span>
                                <span @click="form.type = 'company'" class="fw-bolder cursor-pointer"
                                    :class="{ 'active': form.type == 'company' }">
                                    Company
                                </span>
                            </div>
                        </div>
                        <div class="col-12 ">
                            <div class="fs-4 fw-lighter text-center mb-2">Get more oportunities</div>
                        </div>

                        <div class="col-12 mb-2">
                            <div class="card google-card rounded-0 p-2 ">
                                <div class="fw-bolder text-center theme-color">
                                    <img src="@/assets/images/google_icon.png"> &nbsp;Sign Up with Google
                                </div>
                            </div>
                        </div>

                        <div class="col-12 my-3">
                            <div class="between-lines text-muted">
                                Or sign up with email
                            </div>
                        </div>


                        <form @submit.prevent="submitForm" class="row g-2">
                            <div class="col-12">
                                <label class="fw-bold text-muted small">Full name:</label>
                                <input v-model="form.full_name" type="text" class="form-control form-control-l  rounded-0"
                                    placeholder="Enter your full name">
                            </div>
                            <div class="col-12">
                                <label class="fw-bold text-muted small">Email Address:</label>
                                <input v-model="form.email" type="text" class="form-control form-control-l  rounded-0"
                                    placeholder="Enter email address">
                            </div>
                            <div class="col-12">
                                <label class="fw-bold text-muted small">Password:</label>
                                <input v-model="form.password" type="text" class="form-control form-control-l  rounded-0"
                                    placeholder="Enter password">
                            </div>
                            <div class="col-12 mt-3">
                                <button type="submit" class="btn btn-lg btn-primary rounded-0 w-100">
                                    Continue <i class="bi bi-chevron-right"></i>
                                </button>
                            </div>
                            <div class="col-12 mt-3">
                                Already have an account? <router-link replace to="/login"
                                    class="fw-bold theme-color text-decoration-none">Login</router-link>
                            </div>

                            <div class="col-12 text-muted mt-3 small">
                                By clicking 'Continue', you acknowledge that you have read and accept the <span
                                    class="theme-color cursor-pointer">Terms of Service</span>
                                and <span class="theme-color cursor-pointer">Privacy Policy</span>.
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
//@ts-ignore
import validator from 'validator';

onMounted(() => {
    console.log(validator.isEmail('f.ds.oobar.co'));

})


const form = reactive({
    type: 'seeker',
    full_name: '',
    email: '',
    password: '',
    isError: false,
    isLoading: false
})

function submitForm() {

}
</script>

<style  scoped>
.wholePage {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    min-height: 100vh;
}

.google-card {
    cursor: pointer;
}

.google-card:hover {
    background-color: #eeeeee49;
}

.type-nav span {
    padding: 7px 15px;
}

.active {
    background-color: #E9EBFD;
}

.side-image {
    background: url('@/assets/images/signup.jpg') no-repeat;
    background-size: cover;
    background-position: center center;
}
</style>
