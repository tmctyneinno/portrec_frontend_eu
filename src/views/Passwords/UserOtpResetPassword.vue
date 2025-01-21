<template>
    <div class="wholePage">
        <overlayLoading v-if="otpIsVerifying" />
        <headerForLoginAndSignUp />
        <div class="container">
            <div class="row justify-content-center align-items-center min-vh-100 g-0">
                <div v-if="shouldShowEmailForm" class="col-lg-4">

                    <div class=" mb-3">
                        <div class="fs-4 fw-bolder text-center ">
                            Forgot password</div>
                        <div class=" text-center">Enter your registered email to get your code</div>
                    </div>

                    <form @submit.prevent="sendOTP">
                        <div class="mb-5">
                            <!-- <label for="email1" class="fw-bold text-muted small">Enter email address</label> -->
                            <input id="email1" v-model="form.email" type="email" class="form-control form-control-lg"
                                placeholder="email" />
                            <div class="small float-end">
                                Remember password?
                                <router-link class="theme-color text-decoration-none fw-bold"
                                    to="/auth/login">Login</router-link>
                            </div>
                        </div>


                        <div class="mb-3 mt-3">
                            <primaryButton btnType="submit" v-if="!form.isSendingEmail" className="btn-lg w-100">
                                Verify
                            </primaryButton>
                            <primaryButtonLoading v-else className="btn-lg w-100" />
                        </div>

                    </form>



                </div>
                <div v-else class="col-lg-4">
                    <div class="otp-panel">
                        <div class="mb-3">
                            <div class="fs-4 fw-bolder text-center ">
                                Verify your identity</div>
                            <div class=" text-center">Enter the code sent to your email</div>
                            <div class="small text-muted text-center mt-3">A verification code has been sent to your
                                email
                                address
                                <span class="theme-color">{{ form.email }}</span>
                                <i @click="shouldShowEmailForm = true"
                                    class="bi bi-pencil-fill ms-1 small cursor-pointer"></i>
                            </div>
                        </div>
                        <div class="mb-3 d-flex justify-content-center">
                            <v-otp-input :is-disabled="otpIsVerifying" ref="otpInputRef" input-classes="otp-input"
                                separator=" " inputType="number" inputmode="numeric" :num-inputs="6"
                                v-model:value="otpInput" :should-auto-focus="true" :should-focus-order="true"
                                @on-change="handleOnChange" @on-complete="handleOnComplete" />
                        </div>
                        <div class="text-center">
                            Didn’t receive the OTP?
                            <span v-if="!showResendButton">Resend ({{ otpCountdown }}s)</span>
                            <span v-else>
                                <button v-if="!form.isSendingEmail" @click="resendOTP"
                                    class="btn p-0 btn-link text-decoration-none theme-color fw-bold">
                                    <i class=" bi bi-arrow-clockwise"></i> Resend OTP
                                </button>

                                <div v-else class="spinner-border text-secondary spinner-border-sm" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>


                            </span>

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
import { useRouter } from "vue-router";
import headerForLoginAndSignUp from '@/components/templates/headerForLoginAndSignUp.vue'
import VOtpInput from "vue3-otp-input";

const router = useRouter()

const form = reactive<any>({
    email: '',
    isSendingEmail: false
})

const currentUser = ref<any>(null)

// OTP ENTRY
const otpInputRef = ref<InstanceType<typeof VOtpInput> | null>(null);
const otpInput = ref("");
const otpIsVerifying = ref<boolean>(false);
const shouldShowEmailForm = ref<boolean>(true)
const showResendButton = ref<boolean>(false)
const otpCountdown = ref(30);
let timer: any = null;


async function sendOTP() {

    if (!useFxn.isEmail(form.email)) {
        useFxn.toast('Email format is invalid!', 'warning')
        return;
    }

    form.isSendingEmail = true

    try {
        const formData = new FormData()
        formData.append('email', form.email)
        const { data } = await api.userForgotPasswordOTP(formData)
        if (!data?.data) {
            useFxn.toast('Email does not exist!', 'error')
            return
        }
        currentUser.value = data.data
        shouldShowEmailForm.value = false
        otpInput.value = ''
        startCountdown();

    } catch (error) {
        useFxn.toast('Sorry, something went wrong, check your internet', 'error')
    } finally {
        form.isSendingEmail = false
    }
}

async function resendOTP() {
    await sendOTP()
    useFxn.toast('OTP has been resent!', 'success')
}


const startCountdown = () => {
    showResendButton.value = false;
    otpCountdown.value = 30;

    timer = setInterval(() => {
        if (otpCountdown.value > 0) {
            otpCountdown.value -= 1;
        } else {
            clearInterval(timer);
            showResendButton.value = true;
        }
    }, 1000);
};




const handleOnComplete = async (value: string) => {
    // console.log("OTP completed: ", value);
    otpIsVerifying.value = true

    try {
        const formData = new FormData();
        formData.append('otp', value)
        formData.append('user_id', currentUser.value.id)
        const { data } = await api.userForgotPasswordVerifyOTP(formData)
        if (data?.error) {
            useFxn.toast(data.error, 'error')
            return;
        }
        router.push({
            path: `/password/user/reset`,
            query: {
                cde: btoa(value),
                id: btoa(currentUser.value.id),
                tme: new Date().getTime()
            }
        })

    } catch (error) {
        useFxn.toast('Sorry, something went wrong, check your internet', 'error')
    } finally {
        otpIsVerifying.value = false
    }

};



const handleOnChange = (value: string) => {
    // console.log("OTP changed: ", value);
};


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

<style>
.otp-input {
    width: 50px;
    height: 50px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid #D1E3FF;
    text-align: center;
    background-color: #D1E3FF;
}

/* Background colour of an input field with value */
.otp-input.is-complete {
    background-color: #fff;
    border-color: var(--theme-color);
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

@media(max-width: 767px) {
    .otp-input {
        width: 30px;
        height: 30px;

    }
}
</style>
