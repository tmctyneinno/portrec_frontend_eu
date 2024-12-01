<template>
    <form @submit.prevent="moveToNext" class="row g-3">
        <div class="col-12">
            <label class="fw-bold text-muted small">
                Enter Full name
            </label>
            <input v-model="form.name" type="text" class="form-control form-control-lg" placeholder="full name">
        </div>
        <div class="col-12">
            <label class="fw-bold text-muted small">
                Enter email address
            </label>
            <input v-model="form.email" type="email" class="form-control form-control-lg" placeholder="email address">
        </div>

        <div class="col-12">
            <label class="fw-bold text-muted small">
                Enter Phone Number
            </label>
            <vue-tel-input class="form-control form-control-lg p-0 rounded-3" :validCharactersOnly="true"
                :inputOptions="phoneField.input" :dropdownOptions="phoneField.dropDown" :autoFormat="true"
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
            <input v-model="form.password" :type="form.passwordDisplay" class="form-control form-control-lg"
                placeholder="password">
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
            <input v-model="form.password2" :type="form.password2Display" class="form-control form-control-lg"
                placeholder="confirm password">
        </div>

        <div class="col-12 mt-3">
            <primaryButton v-if="!form.isLoading" :btnType="'submit'" :btnClass="` w-100 btn-lg`"
                :btnMainClass="'btn-primary'">
                Next <i class="bi bi-chevron-right"></i>
            </primaryButton>
            <primaryButtonLoading :btnMainClass="'btn-primary'" v-else :btnClass="`btn-lg w-100`" />
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

</template>

<script lang="ts" setup>
import useFxn from "@/stores/Helpers/useFunctions";
import { useSignupStore } from "./SignupStore";
import { storeToRefs } from "pinia";

const signupStore = useSignupStore()
const { form } = storeToRefs(signupStore)


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

function moveToNext() {

    const requiredFields = ['name', 'email', 'password', 'phone'];

    for (const field of requiredFields) {
        // @ts-ignore
        if (!form.value[field]) {
            useFxn.toast(`Please complete ${field} field`, 'warning');
            return;
        }
    }

    if (form.value.password !== form.value.password2) {
        useFxn.toast('Passwords do not match', 'warning');
        return;
    }

    if (!useFxn.isEmail(form.value.email)) {
        useFxn.toast('Email format is invalid!', 'warning');
        return;
    }

    form.value.step = '2'
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
