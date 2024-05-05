<template>
    <div class="wholePage">
        <div class="row justify-content-center g-0">
            <div class="side-image col-lg-4 d-none d-lg-block bg-danger min-vh-100"></div>
            <div class=" col-lg-8 d-flex justify-content-center align-items-center min-vh-100">
                <div class="col-11 col-lg-12 row justify-content-center">
                    <div class="col-md-8">
                        <div class="col-12 ">
                            <div class="type-nav theme-color d-flex justify-content-aroun justify-content-evenly mb-1">
                                <span @click="form.type = 'seeker'" class="fw-bolder cursor-pointer"
                                    :class="{ 'active': form.type == 'seeker' }">
                                    Job Seeker
                                </span>
                                <span @click="form.type = 'recruiter'" class="fw-bolder cursor-pointer"
                                    :class="{ 'active': form.type == 'recruiter' }">
                                    Recruiter
                                </span>
                            </div>
                        </div>
                        <div class="col-12 ">
                            <div class="fs-4 fw-lighter text-center mb-2">Get more oportunities</div>
                        </div>

                        <div class="col-12 mb-2">
                            <div class="card google-card rounded-0 p-2 ">
                                <div class="fw-bolder text-center theme-color">
                                    <img src="@/assets/images/google_icon.png" width="20"> &nbsp;Sign Up with Google
                                </div>
                            </div>
                        </div>

                        <div class="col-12 my-2">
                            <div class="between-lines text-muted">
                                Or sign up with email
                            </div>
                        </div>


                        <form @submit.prevent="submitForm" class="row g-3">
                            <div class="col-12">
                                <label class="fw-bold text-muted small">Full name:</label>
                                <input v-model="form.name" type="text" class="form-control form-control-l  rounded-0"
                                    placeholder="Enter your full name">
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="fw-bold text-muted small">Email Address:</label>
                                <input v-model="form.email" type="text" class="form-control form-control-l  rounded-0"
                                    placeholder="Enter email address">
                            </div>

                            <div class="col-12 col-md-6">
                                <label class="fw-bold text-muted small">Phone:</label>
                                <vue-tel-input :inputOptions="phoneField.input" :dropdownOptions="phoneField.dropDown"
                                    :autoFormat="true" v-model="form.phone"></vue-tel-input>
                            </div>

                            <div class="col-12 col-md-6">
                                <div class="fw-bold text-muted small col-12">Password:
                                    <span v-if="form.password"
                                        @click="form.passwordDisplay = form.passwordDisplay == 'password' ? 'text' : 'password'"
                                        class="float-end cursor-pointer theme-color">
                                        <span v-if="form.passwordDisplay == 'password'"> show</span>
                                        <span v-else> hide </span>
                                    </span>
                                </div>
                                <input v-model="form.password" :type="form.passwordDisplay"
                                    class="form-control form-control-l  rounded-0" placeholder="Enter password">
                            </div>

                            <div class="col-12 col-md-6">
                                <div class="fw-bold text-muted small col-12">Re-enter Password:
                                    <span v-if="form.password2"
                                        @click="form.password2Display = form.password2Display == 'password' ? 'text' : 'password'"
                                        class="float-end cursor-pointer theme-color">
                                        <span v-if="form.password2Display == 'password'">show</span>
                                        <span v-else>hide</span>
                                    </span>
                                </div>
                                <input v-model="form.password2" :type="form.password2Display"
                                    class="form-control form-control-l  rounded-0" placeholder="Enter password">
                            </div>


                            <div class="col-12 mt-3">
                                <button v-if="!form.isLoading" type="submit"
                                    class="btn btn-lg btn-primary rounded-0 w-100">
                                    Continue <i class="bi bi-chevron-right"></i>
                                </button>
                                <button v-else class="btn btn-primary rounded-0 w-100" disabled>
                                    <span class="spinner-border spinner-border" aria-hidden="true"></span>
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
import { reactive } from "vue";
import useFxn from "@/stores/Helpers/useFunctions";
import api from "@/stores/Helpers/axios";
import { useOnline } from "@vueuse/core";
import { useRouter } from "vue-router";


const online = useOnline()
const router = useRouter()

const form = reactive<any>({
    type: 'seeker',
    name: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
    passwordDisplay: 'password',
    password2Display: 'password',
    isLoading: false
})

const phoneField = {
    dropDown: {
        showDialCodeInSelection: false,
        showFlags: true,
        showSearchBox: true,
        showDialCodeInList: true,

    },
    input: {
        showDialCode: true,
        placeholder: 'Enter phone',
        styleClasses: 'phone-input-signup',
        // type: 'number'
    }

}

function submitForm() {
    const requiredFields = ['name', 'email', 'password', 'phone'];

    for (const field of requiredFields) {
        if (!form[field]) {
            useFxn.toastShort(`Please complete ${field} field`);
            return;
        }
    }

    if (form.password !== form.password2) {
        useFxn.toastShort('Passwords do not match');
        return;
    }

    if (!useFxn.isEmail(form.email)) {
        useFxn.toastShort('Email format is invalid!');
        return;
    }

    if (!online.value) {
        useFxn.toastShort('No internet, You are offline!');
        return;
    }

    if (form.type === 'seeker') {
        form.isLoading = true;
        registerJobSeeker();
    }
}

async function registerJobSeeker() {
    try {

        const sumitObj = {
            fullName: form.name,
            phone: parseInt(form.phone.replace(/ /g, "")),
            email: form.email,
            password: form.password
        }

        let resp = await api.userRegister(sumitObj)
        console.log(resp);

        if (resp.status === 201) {
            useFxn.toast('Account created successfully! please login', 'success')
            router.push({ path: '/login' })
        }
    } catch (error: any) {
        console.error(error);

        if (error.response.status === 409) {
            useFxn.toastShort('Email already taken')
        } else {
            useFxn.toast('Sorry, error occured, check your internet', 'error')
        }
    } finally {
        form.isLoading = false
    }
}
</script>

<style scoped>
.vue-tel-input {
    border-radius: 0px;
}

.wholePage {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    min-height: 100vh;
}

.google-card {
    cursor: pointer;
    background-color: #eeeeee49;
}

.google-card:hover {
    background-color: #eeeeee71;
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
