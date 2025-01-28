<template>
    <div class="wholePage">
        <HeaderForLoginAndSignUp />
        <div class="row justify-content-center g-0">
            <div class=" col-lg-8 d-flex justify-content-center align-items-center min-vh-100">
                <div class="col-11 col-lg-12 row justify-content-center">
                    <div class="col-md-6 animate__animated animate__fadeIn">

                        <div class="col-12 mb-3">
                            <div class="fs-4 fw-bolder text-center ">
                                Reset Password</div>

                        </div>


                        <form @submit.prevent="submitForm" class="row g-3">

                            <div class="col-12">
                                <div class="fw-bold text-muted small col-12">Enter New Password:

                                </div>
                                <CustomPasswordField className="form-control-lg" v-model="form.password"
                                    placeholder="new password" />
                            </div>

                            <div class="col-12">
                                <div class="fw-bold text-muted small col-12">Confirm New Password:
                                </div>
                                <CustomPasswordField className="form-control-lg" v-model="form.password2"
                                    placeholder="confirm password" />

                            </div>
                            <div class="col-12 small " :class="!passwordRegexTested ? 'text-danger' : 'text-success'">
                                <div>Minimum of 8 characters</div>
                                <div>One special character</div>
                                <div>A number</div>

                            </div>

                            <div class="col-12 mt-3">
                                <primaryButton :disabled="!passwordRegexTested" v-if="!form.isLoading"
                                    :btnType="'submit'" :className="` w-100 btn-lg`">
                                    Confirm
                                </primaryButton>
                                <primaryButtonLoading v-else :className="`btn-lg w-100`" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import useFxn from "@/stores/Helpers/useFunctions";
import api from "@/stores/Helpers/axios";
import { useRouter, useRoute } from "vue-router";
import HeaderForLoginAndSignUp from "@/components/templates/headerForLoginAndSignUp.vue";
import CustomPasswordField from "@/components/templates/customPasswordField.vue";


const route = useRoute()
const router = useRouter()

const form = reactive<any>({
    password: '',
    password2: '',
    passwordDisplay: 'password',
    password2Display: 'password',
    isLoading: false,
})

const passwordRegexTested = computed(() => {
    return form.password && useFxn.passwordRegex(form.password) ? true : false
})

const otpOnRoute = ref<string>('')
const recruiterIdOnRoute = ref<string>('')

onMounted(() => {
    otpOnRoute.value = atob(route.query?.cde as string);
    recruiterIdOnRoute.value = atob(route.query?.id as string);
    if (!otpOnRoute.value || !recruiterIdOnRoute.value) {
        router.push({ path: '/' })
    }
})


function submitForm() {
    const requiredFields = ['password', 'password2'];

    for (const field of requiredFields) {
        if (!form[field]) {
            useFxn.toast(`Please complete ${field} field`, 'warning');
            return;
        }
    }

    if (form.password !== form.password2) {
        useFxn.toast('Passwords do not match', 'warning');
        return;
    }

    form.isLoading = true;
    changePassword()
}

async function changePassword() {
    try {
        const formData = new FormData();
        formData.append('password', form.password)
        formData.append('recruiter_id', recruiterIdOnRoute.value)
        formData.append('otp', otpOnRoute.value)

        const { data } = await api.recruiterResetPassword(formData)
        useFxn.toast(data?.data?.message ?? 'Password updated', 'success')
        router.replace({ path: '/auth/login/recruiter' })


    } catch (error: any) {
        console.error(error);
        useFxn.toast('Sorry, error occured, check your internet', 'error')

    } finally {
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
        padding-block: 50px;
    }
}

.google-card {
    cursor: pointer;
    background-color: #eeeeee49;
}

.google-card:hover {
    background-color: #eeeeee71;
}

.type-nav {
    padding: 7px 15px;
}

.type-nav a:hover {
    /* background-color: #cccccc5d; */
    color: black !important
}

.active {
    background-color: #E9EBFD;
}

.side-image {
    background: url('/images/signup.jpg') no-repeat;
    background-size: cover;
    background-position: center center;
}
</style>

<style>
.form-control .vti__input {
    background-color: transparent !important;
}
</style>
