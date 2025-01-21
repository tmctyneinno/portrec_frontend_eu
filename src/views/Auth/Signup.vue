<template>
    <div class="wholePage">
        <HeaderForLoginAndSignUp />
        <div class="row justify-content-center g-0">
            <div class=" col-lg-8 d-flex justify-content-center align-items-center min-vh-100">
                <div class="col-11 col-lg-12 row justify-content-center">
                    <div class="col-md-6 animate__animated animate__fadeIn">
                        <div class="col-12  type-nav">
                            <router-link
                                class=" hover-tiltY theme-color d-flex justify-content-end mb-3 fw-bolder text-decoration-none"
                                to="/auth/signup/recruiter">
                                Sign Up as Recuiter</router-link>
                        </div>
                        <div class="col-12 mb-3">
                            <div class="fs-4 fw-bolder text-center ">
                                {{ form.step == '1' ? 'Sign Up' : 'One more Step!' }}
                            </div>
                            <div class=" text-center">
                                Create your account and unlock new opportunities – it only
                                takes a few seconds!
                            </div>
                        </div>

                        <SignupStepOne v-if="form.step == '1'" />

                        <form v-else @submit.prevent="submitForm" class="row g-3">
                            <div class="col-12">
                                <label class="fw-bold text-muted small">
                                    About me
                                </label>
                                <textarea v-model="form.about_me" class="form-control"
                                    style="height: 120px;"></textarea>
                            </div>

                            <div class="col-12">
                                <label class="fw-bold text-muted small">
                                    Skills
                                </label>
                                <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                                    placeholder="" class="skills-select" multiple v-model="form.skills"
                                    :clearable="false" :options="skillsArray" label="name"></v-select>
                            </div>

                            <div class="col-12">
                                <label class="fw-bold text-muted small">
                                    Industry
                                </label>
                                <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                                    placeholder="" class="skills-select" v-model="form.industry" :clearable="false"
                                    :options="industriesArray" label="name"></v-select>
                            </div>

                            <div class="col-12">
                                <label class="fw-bold text-muted small">
                                    Desired Pay
                                </label>
                                <div class="input-group mb-3">
                                    <select v-model="form.desired_pay_currency" placeholder="Select Currency">
                                        <option value="Naira">Naira (N)</option>
                                        <option value="Dollar">Dollar ($)</option>
                                    </select>

                                    <input placeholder="0.00" type="text" v-model="form.desired_pay"
                                        class="form-control " v-maska data-maska="9,99#.##"
                                        data-maska-tokens="9:[0-9]:repeated" data-maska-reversed />
                                </div>

                            </div>

                            <div class="col-md-5 mt-3">
                                <primaryButtonOutline @click="form.step = '1'" :className="` w-100 btn-lg`">
                                    <i class="bi bi-chevron-left"></i> Back
                                </primaryButtonOutline>
                            </div>

                            <div class="col-md-7 mt-3">
                                <primaryButton v-if="!form.isLoading" :btnType="'submit'" :className="` w-100 btn-lg`">
                                    Sign Up
                                </primaryButton>
                                <primaryButtonLoading v-else :className="`btn-lg w-100`" />
                            </div>
                            <div class="col-12 mt-3">
                                Already have an account? <router-link replace to="/auth/login"
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
import { onMounted, ref } from "vue";
import useFxn from "@/stores/Helpers/useFunctions";
import api from "@/stores/Helpers/axios";
import { useOnline } from "@vueuse/core";
import { useRouter } from "vue-router";
import { vMaska } from "maska";

import HeaderForLoginAndSignUp from "@/components/templates/headerForLoginAndSignUp.vue";
import SignupStepOne from "./SignupStepOne.vue";
import { useSignupStore } from "./SignupStore";
import { storeToRefs } from "pinia";


const signupStore = useSignupStore()
const { form } = storeToRefs(signupStore)

const online = useOnline()
const router = useRouter()

onMounted(() => {
    getDropdowns()
});

const skillsArray = ref<any[]>([])
const industriesArray = ref<any[]>([])

async function getDropdowns() {
    try {
        const [skillsResponse, industriesResponse] = await Promise.all([
            api.skills(),
            api.jobCategories()
        ]);
        skillsArray.value = skillsResponse?.data?.body ?? [];
        industriesArray.value = industriesResponse?.data?.body ?? [];

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


function submitForm() {
    if (!form.value.industry) {
        useFxn.toastShort('Please select Industry');
        return;
    }

    if (!form.value.skills.length) {
        useFxn.toastShort('Please select at least a skill');
        return;
    }
    register()
}



async function register() {
    form.value.isLoading = true;
    try {
        const sumitObj: any = {
            fullName: form.value.name,
            phone: parseInt(form.value.phone.replace(/ /g, "")),
            email: form.value.email,
            password: form.value.password,
            about_me: form.value.about_me,
            industry_id: form.value.industry.id,
            skills: form.value.skills.map((x: { id: any; }) => x.id),
            desired_pay: form.value.desired_pay,

        }


        const resp = await api.userRegister(sumitObj)

        if (resp.status === 203) {
            useFxn.toast(`${resp.data}`, 'error')
            return;
        }

        else {
            useFxn.toast('Account created successfully! please login', 'success')
            const fields = ['name', 'email', 'password', 'password2', 'phone', 'about_me', 'industry', 'desired_pay'];
            fields.forEach(field => {
                form.value[field] = '';
            });
            form.value.skills = [];
            form.value.step = '1'
            router.push({ path: '/auth/login' })
        }
    } catch (error: any) {
        console.error(error);
        useFxn.toast('Sorry, error occured, check your internet', 'error')

    } finally {
        form.value.isLoading = false
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

select {
    border-color: var(--bs-border-color) !important;
    padding-inline: 10px
}
</style>
