<template>
    <div class="wholePage">
        <HeaderForLoginAndSignUp />
        <div class="row justify-content-center g-0">
            <div class=" col-lg-8 d-flex justify-content-center align-items-center min-vh-100">
                <div class="col-11 col-lg-12 row justify-content-center">
                    <div class="col-md-6 animate__animated animate__fadeIn">
                        <div class="col-12  cursor-pointer hover-tiltY"
                            @click="formType = formType == 'seeker' ? 'recruiter' : 'seeker'">
                            <div class="type-nav theme-color d-flex justify-content-end mb-3">
                                <span class="fw-bolder ">
                                    Sign Up as {{ formType !== 'seeker' ? 'Job Seeker' : 'Recruiter' }}
                                </span>
                            </div>
                        </div>
                        <div class="col-12 mb-3">
                            <div class="fs-4 fw-bolder text-center ">
                                Sign Up</div>
                            <div class=" text-center">
                                {{ formType == `seeker` ? `Create your account and unlock new opportunities – it only
                                takes a few seconds!` : 'Post jobs, recruit professionals' }}
                            </div>
                        </div>


                        <form @submit.prevent="submitForm" class="row g-3">
                            <div class="col-12">
                                <label class="fw-bold text-muted small">
                                    Enter Full name
                                </label>
                                <input v-model="form.name" type="text" class="form-control form-control-lg"
                                    placeholder="full name">
                            </div>
                            <div class="col-12">
                                <label class="fw-bold text-muted small">
                                    Enter email address
                                </label>
                                <input v-model="form.email" type="email" class="form-control form-control-lg"
                                    placeholder="email address">
                            </div>

                            <div class="col-12">
                                <label class="fw-bold text-muted small">
                                    Enter Phone Number
                                </label>
                                <vue-tel-input class="form-control form-control-lg p-0 rounded-3"
                                    :validCharactersOnly="true" :inputOptions="phoneField.input"
                                    :dropdownOptions="phoneField.dropDown" :autoFormat="true"
                                    v-model="form.phone"></vue-tel-input>
                            </div>

                            <div class="col-12">
                                <div class="fw-bold text-muted small col-12">Enter Password:
                                    <span v-if="form.password"
                                        @click="form.passwordDisplay = form.passwordDisplay == 'password' ? 'text' : 'password'"
                                        class="float-end cursor-pointer theme-color">
                                        <span v-if="form.passwordDisplay == 'password'"> show</span>
                                        <span v-else> hide </span>
                                    </span>
                                </div>
                                <input v-model="form.password" :type="form.passwordDisplay"
                                    class="form-control form-control-lg" placeholder="password">
                            </div>

                            <div class="col-12">
                                <div class="fw-bold text-muted small col-12">Confirm Password:
                                    <span v-if="form.password2"
                                        @click="form.password2Display = form.password2Display == 'password' ? 'text' : 'password'"
                                        class="float-end cursor-pointer theme-color">
                                        <span v-if="form.password2Display == 'password'">show</span>
                                        <span v-else>hide</span>
                                    </span>
                                </div>
                                <input v-model="form.password2" :type="form.password2Display"
                                    class="form-control form-control-lg" placeholder="confirm password">
                            </div>

                            <div class="col-12" v-if="formType == 'recruiter'">
                                <div class="fw-bold text-muted small col-12">Enter Company name:
                                </div>
                                <input v-model="form.company_name" type="text" class="form-control form-control-lg"
                                    placeholder=" company name">
                            </div>


                            <div class="col-12 mt-3">
                                <primaryButton v-if="!form.isLoading" :btnType="'submit'" :btnClass="` w-100 btn-lg`"
                                    :btnMainClass="formType == 'seeker' ? 'btn-primary' : 'btn-dark'">
                                    {{ formType == 'seeker' ? 'Sign Up ' : 'Sign Up as Recruiter' }}
                                </primaryButton>
                                <primaryButtonLoading :btnMainClass="formType == 'seeker' ? 'btn-primary' : 'btn-dark'"
                                    v-else :btnClass="`btn-lg w-100`" />
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
import { reactive, ref } from "vue";
import useFxn from "@/stores/Helpers/useFunctions";
import api from "@/stores/Helpers/axios";
import { useOnline } from "@vueuse/core";
import { useRouter } from "vue-router";
import HeaderForLoginAndSignUp from "@/components/headerForLoginAndSignUp.vue";


const online = useOnline()
const router = useRouter()

const formType = ref<'seeker' | 'recruiter'>('seeker')

const form = reactive<any>({
    name: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
    company_name: '',
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
        maxlength: 15
        // type: 'number'
    }

}

function submitForm() {
    const requiredFields = ['name', 'email', 'password', 'phone'];

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

    if (!useFxn.isEmail(form.email)) {
        useFxn.toast('Email format is invalid!', 'warning');
        return;
    }

    if (formType.value === 'recruiter') {
        if (!form.company_name) {
            useFxn.toast('Please enter company name!', 'warning');
            return;
        }
    }

    // if (!online.value) {
    //     useFxn.toastShort('No internet, You are offline!');
    //     return;
    // }

    form.isLoading = true;
    register()

}

async function register() {
    try {

        const sumitObj: any = {
            fullName: form.name,
            phone: parseInt(form.phone.replace(/ /g, "")),
            email: form.email,
            password: form.password
        }

        if (formType.value === 'recruiter') sumitObj.company_name = form.company_name;

        const resp = formType.value == 'seeker' ? await api.userRegister(sumitObj) : await api.recruiterRegister(sumitObj)

        if (resp.status === 203) {
            useFxn.toast(`${resp.data}`, 'error')
            return;
        }

        else {
            useFxn.toast('Account created successfully! please login', 'success')
            router.push({ path: '/login' })
        }
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

.type-nav span {
    padding: 7px 15px;
}

.type-nav span:hover {
    background-color: #cccccc5d;
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
