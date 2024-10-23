<template>
    <div class="wholePage">
        <div class="row justify-content-center g-0">
            <div class="side-image col-lg-4 d-none d-lg-block min-vh-100"></div>
            <div class=" col-lg-8 d-flex justify-content-center align-items-center min-vh-100">
                <div class="col-11 col-lg-12 row justify-content-center">
                    <div class="col-md-6 animate__animated animate__fadeIn">
                        <div class="col-12 ">
                            <div class="text-center mb-3 fw-bold text-uppercase">Login as a</div>
                            <div class="type-nav theme-color d-flex justify-content-aroun justify-content-evenly mb-3">
                                <span @click="form.type = 'seeker'" class="fw-bolder cursor-pointer hover-tiltY"
                                    :class="{ 'active': form.type == 'seeker' }">
                                    Job Seeker
                                </span>
                                <span class="text-dark">OR</span>
                                <span @click="form.type = 'recruiter'" class="fw-bolder cursor-pointer hover-tiltY"
                                    :class="{ 'active': form.type == 'recruiter' }">
                                    Recruiter
                                </span>
                            </div>
                        </div>
                        <div class="col-12 ">
                            <div class="fs-4 fw-lighter text-center mb-2">Welcom back,
                                {{ form.type == 'seeker' ? 'Dude' : 'Admin' }}</div>

                        </div>

                        <!-- <div class="col-12 mb-2">
                            <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError">
                            </GoogleSignInButton>
                        </div> -->
                        <div :disabled="!isReady" @click="() => loginWithGoogle()"
                            class="card google-card rounded-0 p-2 ">
                            <div class="fw-bolder text-center theme-color">
                                <img src="@/assets/images/google_icon.png" width="20"> &nbsp;signin with Google
                            </div>
                        </div>

                        <div class="col-12 my-3">
                            <div class="between-lines text-muted">
                                Or login with email
                            </div>
                        </div>

                        <form @submit.prevent="submitForm" class="row g-2">
                            <div class="col-12">
                                <label class="fw-bold text-muted small">
                                    {{ form.type == 'recruiter' ? 'Recruiter Email Address' : 'Email Address' }}:
                                </label>
                                <input v-model="form.email" type="text" class="form-control form-control-l  rounded-0"
                                    placeholder="Enter email address">
                            </div>
                            <div class="col-12">
                                <div class="fw-bold text-muted small">
                                    {{ form.type == 'recruiter' ? 'Recruiter Password' : 'Password' }}:

                                    <span v-if="form.password"
                                        @click="form.passwordDisplay = form.passwordDisplay == 'password' ? 'text' : 'password'"
                                        class="float-end cursor-pointer theme-color">
                                        <span v-if="form.passwordDisplay == 'password'">show</span>
                                        <span v-else>hide</span>
                                    </span>
                                </div>
                                <input v-model="form.password" :type="form.passwordDisplay"
                                    class="form-control form-control-l  rounded-0" placeholder="Enter password">
                            </div>
                            <div v-show="form.isError" class="col-12 mt-2">
                                <div class="alert alert-danger small py-1 border-0 rounded-0 text-danger">
                                    Your password is incorrect or this account doesn't exist.
                                    <router-link class="text-danger" to="/reset_password">Reset password</router-link>
                                </div>
                            </div>
                            <div class="col-12 mt-3">
                                <label class="cursor-pointer">
                                    <input class="form-check-input me-1" type="checkbox" checked>
                                    Remember me
                                </label>
                            </div>
                            <div class="col-12 mt-3">
                                <button v-if="!form.isLoading" type="submit" class="btn btn-lg  rounded-0 w-100"
                                    :class="form.type == 'seeker' ? 'btn-primary' : 'btn-dark'">
                                    {{ form.type == 'seeker' ? 'Login as Job Seeker ' : 'Login as Recruiter' }}
                                </button>
                                <button v-else class="btn btn-primary rounded-0 w-100" disabled>
                                    <span class="spinner-border spinner-border" aria-hidden="true"></span>
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
import { reactive } from "vue";
import useFxn from "@/stores/Helpers/useFunctions";
import api from "@/stores/Helpers/axios";
import { useOnline } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useProfileStore } from "@/stores/profileStore";
// @ts-ignore
import { useCodeClient, type ImplicitFlowSuccessResponse, type ImplicitFlowErrorResponse, } from "vue3-google-signin";

const online = useOnline()
const router = useRouter()
const profile = useProfileStore()

interface LoginInterface {
    type: 'seeker' | 'recruiter',
    email: string,
    password: string,
    passwordDisplay: 'password' | 'text',
    isError: boolean,
    isLoading: boolean
}

const form = reactive<LoginInterface>({
    type: 'seeker',
    email: '',
    password: '',
    passwordDisplay: 'password',
    isError: false,
    isLoading: false
})

function submitForm() {
    if (!form.email || !form.password) {
        useFxn.toast('Please complete fields', 'warning')
        return;
    }

    if (!useFxn.isEmail(form.email)) {
        useFxn.toast('Email format is invalid!', 'warning')
        return;
    }
    // if (!online.value) {
    //     useFxn.toastShort('No internet, You are offline!')
    //     return;
    // }

    form.isLoading = true
    signin()
}

async function signin() {
    form.isError = false;
    try {
        const axObj = {
            email: form.email,
            password: form.password
        }
        const { data } = form.type == 'seeker' ? await api.userLogin(axObj) : await api.recruiterLogin(axObj)

        if (data.status === 200) {
            // profile.token = data.body.token
            const loginType = form.type == 'seeker' ? 'user' : 'recruiter';
            profile.login(data.body.token, loginType)
            router.push({ path: `/${loginType}/dashboard` })
        }
    } catch (error: any) {
        if (error.response.status === 401) {
            form.isError = true
        }
        else {
            useFxn.toast('Sorry, error occured, check your internet', 'error')
        }
    }
    finally {
        form.isLoading = false

    }
}


// google sign in ################################
const handleOnSuccess = async (response: ImplicitFlowSuccessResponse) => {
    // send code to a backend server to verify it.
    console.log("Code: ", response.code);

    // use axios or something to reach backend server
    const result = await fetch("https://_BACKEND/", {
        method: "POST",
        body: JSON.stringify({
            code: response.code,
        }),
    });

    console.log(result);
};

const handleOnError = (errorResponse: ImplicitFlowErrorResponse) => {
    console.log("Error: ", errorResponse);
};

const { isReady, login: loginWithGoogle } = useCodeClient({
    onSuccess: handleOnSuccess,
    onError: handleOnError,
    // other options
});


</script>

<style scoped>
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
    background-color: #eeeeee49;
}

.google-card:hover {

    background-color: #eeeeee71;
}

.side-image {
    background: url('@/assets/images/signup.jpg') no-repeat;
    background-size: cover;
    background-position: center center;
}
</style>
