<template>
    <div class="wholePage">
        <headerForLoginAndSignUp />
        <div class="row justify-content-center align-items-center min-vh-100 g-0">
            <div v-if="!hasRecievedOTP" class="col-lg-4">

                <div class=" mb-3">
                    <div class="fs-4 fw-bolder text-center ">
                        Forgot password</div>
                    <div class=" text-center">Enter your registered email to get your code</div>
                </div>

                <div class="mb-5">
                    <!-- <label for="email1" class="fw-bold text-muted small">Enter email address</label> -->
                    <input id="email1" v-model="form.email" type="email" class="form-control form-control-lg"
                        placeholder="email" />
                    <div class="small float-end">
                        Remember password?
                        <router-link class="theme-color text-decoration-none fw-bold" to="/login">Login</router-link>
                    </div>
                </div>


                <div class="mb-3 mt-3">
                    <primaryButton v-if="!form.isLoading" @click="sendOTP" className="btn-lg w-100">
                        Verify
                    </primaryButton>
                    <primaryButtonLoading v-else className="btn-lg w-100">

                    </primaryButtonLoading>
                </div>



            </div>
            <div v-else class="col-lg-4">
                <div class="otp-panel">
                    <div class="mb-3">
                        <div class="fs-4 fw-bolder text-center ">
                            Verify your identity</div>
                        <div class=" text-center">Enter the code sent to your email</div>
                        <div class="small text-muted text-center mt-3">A verification code has been sent to your email
                            address
                            johndoe@gmail.com</div>
                    </div>

                    <div class="mb-3 d-flex justify-content-center">
                        <v-otp-input :is-disabled="otpIsLoading" ref="otpInputRef" input-classes="otp-input"
                            separator=" " inputType="number" inputmode="numeric" :num-inputs="6"
                            v-model:value="otpInput" :should-auto-focus="true" :should-focus-order="true"
                            @on-change="handleOnChange" @on-complete="handleOnComplete" />
                    </div>
                    <div class="text-center">
                        Didn’t receive the OTP?
                        <span v-if="!showResendButton">Resend ({{ otpCountdown }}s)</span>
                        <button @click="resendOTP" v-else
                            class="btn p-0 btn-link text-decoration-none theme-color fw-bold">
                            <i class=" bi bi-arrow-clockwise"></i> Resend OTP
                        </button>
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
import headerForLoginAndSignUp from '@/components/headerForLoginAndSignUp.vue'
import VOtpInput from "vue3-otp-input";





const online = useOnline()
const router = useRouter()


const form = reactive<any>({
    email: '',
    isLoading: false
})






async function signin() {
    form.isError = false;
    try {
        const axObj = {
            email: form.email,
            password: form.password
        }
        const { data } = await api.userLogin(axObj)

        if (data.status === 200) {
            // 
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




// OTP ENTRY
const otpInputRef = ref<InstanceType<typeof VOtpInput> | null>(null);
const otpInput = ref("");
const otpIsLoading = ref<boolean>(false);
const hasRecievedOTP = ref<boolean>(false)
const showResendButton = ref<boolean>(false)
const otpCountdown = ref(30);
let timer: any = null;


function sendOTP() {
    form.isLoading = true
    setTimeout(() => {
        form.isLoading = false
        hasRecievedOTP.value = true
        startCountdown();

    }, 500);
}

function resendOTP() {
    startCountdown();
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




const handleOnComplete = (value: string) => {
    console.log("OTP completed: ", value);
    router.push({ name: 'Reset Password' })
};

const handleOnChange = (value: string) => {
    console.log("OTP changed: ", value);
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
