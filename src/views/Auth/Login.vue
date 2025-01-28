<template>
    <div class="wholePage">
        <headerForLoginAndSignUp />
        <div class="row justify-content-center g-0">
            <div class=" col-lg-8 d-flex justify-content-center align-items-center min-vh-100">
                <div class="col-11 col-lg-12 row justify-content-center">
                    <div class="col-md-6 animate__animated animate__fadeIn">
                        <div class="col-12  type-nav">
                            <router-link
                                class=" hover-tiltY theme-color d-flex justify-content-end mb-3 fw-bolder text-decoration-none"
                                to="/auth/login/recruiter">
                                Login as Recruiter</router-link>
                        </div>
                        <div class="col-12 mb-3">
                            <div class="fs-4 fw-bolder text-center ">
                                Welcome</div>
                            <div class=" text-center">Enter your login details below</div>
                        </div>

                        <form @submit.prevent="submitForm" class="row g-3">
                            <div class="col-12">
                                <label class="fw-bold text-muted small">
                                    Enter email address
                                </label>
                                <input v-model="form.email" type="text" class="form-control form-control-lg  "
                                    placeholder="email">
                            </div>
                            <div class="col-12">
                                <div class="fw-bold text-muted small">
                                    Enter Password
                                </div>
                                <CustomPasswordField v-model="form.password" className="form-control-lg "
                                    placeholder="password" />

                            </div>
                            <div v-if="form.isError" class="col-12 mt-2">
                                <div class="alert alert-danger small py-1 border-0 text-danger">
                                    Your password is incorrect or this account doesn't exist.
                                    <router-link class="text-danger" to="/password/forgot/user/otp">Reset
                                        password</router-link>
                                </div>
                            </div>
                            <div class="col-12">
                                <label class="cursor-pointer">
                                    <input class="form-check-input me-1" type="checkbox" checked>
                                    Remember me
                                </label>
                                <router-link class="float-end theme-color text-decoration-none"
                                    to="/password/forgot/user/otp">Forgot
                                    password?</router-link>
                            </div>
                            <div class="col-12 mt-3">
                                <primaryButton v-if="!form.isLoading" :btnType="'submit'" :className="` w-100 btn-lg`">
                                    Login
                                </primaryButton>
                                <primaryButtonLoading v-else :className="`btn-lg w-100`" />
                            </div>
                            <div class="col-12 mt-3">
                                Don't have an account? <router-link replace to="/auth/signup"
                                    class="fw-bold theme-color text-decoration-none">Sign Up</router-link>
                            </div>
                        </form>

                        <div class="col-12 my-3">
                            <div class="between-lines text-muted">
                                OR
                            </div>
                        </div>


                        <div :disabled="!isReady" @click="() => loginWithGoogle()"
                            class="card google-card rounded-0 p-2 ">
                            <div class="fw-bolder text-center theme-color">
                                <img src="/images/google_icon.png" width="20"> &nbsp;signin with Google
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import useFxn from "@/stores/Helpers/useFunctions";
import api from "@/stores/Helpers/axios";
import { useOnline } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useProfileStore } from "@/stores/profileStore";
import headerForLoginAndSignUp from '@/components/templates/headerForLoginAndSignUp.vue'
// @ts-ignore
import {
    useTokenClient,
    type AuthCodeFlowSuccessResponse,
    type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";
import CustomPasswordField from "@/components/templates/customPasswordField.vue";

// import { useOneTap, type CredentialResponse } from "vue3-google-signin";

// useOneTap({
//     onSuccess: (response: CredentialResponse) => {
//         console.log("Success:", response);
//     },
//     onError: () => console.error("Error with One Tap Login"),
//     // options
// });


const online = useOnline()
const router = useRouter()
const profile = useProfileStore()

interface LoginInterface {
    email: string,
    password: string,
    isError: boolean,
    isLoading: boolean
}

const form = reactive<LoginInterface>({
    email: '',
    password: '',
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
        const { data } = await api.userLogin(axObj)

        if (data.status === 200) {
            profile.login(data.body.token, 'user')
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


// // google sign in ################################
const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
    const accessToken = response.access_token
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const googleProfile = await response.json();
        signinUsingGoogle(googleProfile)
    } catch (error) {
        console.error("Error fetching user profile:", error);
        useFxn.toast('Sorry, Cannot initiate login now, check your internet', 'error')
    }
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
    useFxn.toast('Sorry, Cannot initiate login now,' + errorResponse, 'error')
    console.log("Error: ", errorResponse);
};

const { isReady, login: loginWithGoogle } = useTokenClient({
    onSuccess: handleOnSuccess,
    onError: handleOnError,
    // other options
});



async function signinUsingGoogle(googleProfile: any) {
    form.isLoading = true
    try {
        const { data } = await api.userLoginWithGoogle(googleProfile)

        if (data.status === 200) {
            profile.login(data.body.token, 'user')
        }
    } catch (error: any) {
        console.log(error);
        if (error.response.status === 401) {
            useFxn.toast(error?.response?.data?.message ?? 'Error occoured', 'error')
        }
        else {
            useFxn.toast('Sorry, error occured, check your internet', 'error')
        }
    }
    finally {
        form.isLoading = false
    }
}




</script>

<style scoped>
.wholePage {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    min-height: 100vh;
    padding-block: 30px;
}

@media(max-width: 767px) {
    .wholePage {
        padding-top: 50px;
    }
}

.type-nav span {
    padding: 7px 15px;
}

.type-nav span:hover {
    background-color: #cccccc5d;
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
    background: url('/images/signup.jpg') no-repeat;
    background-size: cover;
    background-position: center center;
}
</style>
