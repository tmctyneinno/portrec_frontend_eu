

<template>
    <div>
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                    type="button" role="tab" aria-controls="profile" aria-selected="true">My Profile</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button"
                    role="tab" aria-controls="login" aria-selected="false">Login Details</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="messages-tab" data-bs-toggle="tab" data-bs-target="#messages" type="button"
                    role="tab" aria-controls="messages" aria-selected="false">Notifications</button>
            </li>
        </ul>


        <div class="tab-content">
            <!-- PROFILE TAB -->
            <div class="tab-pane active p-3 py-4" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                <h6 class="fw-bold">Basic Information</h6>
                <span class="fw-light">This is your personal information that you can update anytime.</span>
                <hr>

                <div class="row g-3">
                    <div class="col-lg-5">
                        <h6 class="fw-bold">Profile Photo</h6>
                        <span class="fw-light">
                            This image will be shown publicly as your profile picture, it will help recruiters recognize
                            you!
                        </span>
                    </div>
                    <div class="col-lg-7 row g-3 justify-content-center ">
                        <profilePicUpload />
                    </div>
                </div>

                <hr>
                <div class="row g-3">
                    <div class="col-lg-6">
                        <h6 class="fw-bold">Personal Details</h6>
                    </div>
                    <div class="col-lg-5">
                        <div class="row g-3">
                            <div class="col-12">
                                <label> Full Name * </label>
                                <input v-model="details.name" class="form-control rounded-0" type="text">
                            </div>
                            <div class="col-md-12">
                                <label> Phone Number </label>
                                <vue-tel-input :inputOptions="phoneField.input" :dropdownOptions="phoneField.dropDown"
                                    :autoFormat="true" v-model="details.phone"></vue-tel-input>
                            </div>
                            <!-- <div class="col-md-7">
                                <label> Email </label>
                                <input v-model="details.email" class="form-control rounded-0" type="text">
                            </div> -->
                            <div class="col-md-6">
                                <label> Date of Birth </label>
                                <VueDatePicker :format="useFxn.dateDisplay" class="dob-settings-input"
                                    input-class-name="dob-settings-input" hide-input-icon :clearable="false"
                                    :max-date="new Date()" :enable-time-picker="false" auto-apply v-model="details.dob">
                                </VueDatePicker>

                            </div>
                            <div class="col-md-6">
                                <label> Gender </label>
                                <v-select v-model="details.gender" class="text-capitalize gender-chooser" :clearable="false"
                                    :searchable="false" :options="['Male', 'Female']"></v-select>
                            </div>
                            <div class="col-6">
                                <label> Country</label>
                                <v-select class="country-chooser-settings" :clearable="false" v-model="details.country"
                                    :loading="loading" placeholder="select country" :options="allCountries" />
                            </div>
                            <div class="col-6">
                                <label> City</label>
                                <input v-model="details.location" class="form-control rounded-0" type="text">
                            </div>
                            <div class="col-12">
                                <label> Title </label>
                                <input v-model="details.title" class="form-control rounded-0" type="text"
                                    placeholder="e.g: Software Enginner">
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <!-- <div class="row g-3">
                    <div class="col-lg-5">
                        <h6 class="fw-bold">Account Type</h6>
                        <span class="fw-light">
                            You can update your account type
                        </span>
                    </div>
                    <div class="col-lg-7">
                        <div class="row g-3">
                            <div class="col-12 d-flex">
                                <input v-model="details.user_type" class="me-3" type="radio" id="one" value="user" />
                                <label class="mt-3" for="one">
                                    <div class="fw-bold">Job Seeker</div>
                                    <span class="fw-light">Looking for a job</span>
                                </label>
                            </div>
                            <div class="col-12 d-flex">
                                <input v-model="details.user_type" class="me-3 custom-radio-button" type="radio" id="two"
                                    value="recruiter" />
                                <label class="mt-3 " for="two">
                                    <div class="fw-bold ">Employer</div>
                                    <span class="fw-light">Hiring, sourcing candidates, or posting a jobs</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div> -->

                <!-- <hr> -->
                <div class="col-12 col-lg-11">
                    <div class="col-md-2 float-lg-end">
                        <button v-if="!details.isLoading" @click="saveProfile"
                            class="float-end btn btn-primary rounded-0 w-100" type="button">
                            Save profile
                        </button>
                        <button v-else class="float-en btn btn-primary rounded-0 w-100" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        </button>
                    </div>

                </div>
            </div>

            <!-- LOGIN DETAILS TAB -->
            <div class="tab-pane p-3 py-4" id="login" role="tabpanel" aria-labelledby="login-tab">

                <h6 class="fw-bold">Basic Information</h6>
                <span class="fw-light">This is login information that you can update anytime.</span>
                <hr>

                <div class="row g-3">
                    <div class="col-lg-5">
                        <h6 class="fw-bold">Update Email</h6>
                        <span class="fw-light">
                            Update your email address to make sure it is safe.
                        </span>
                    </div>
                    <div class="col-lg-5 ">
                        <div class="row g-3">
                            <div class="col-12">
                                <h6 class="fw-bold">{{ profileStore.data.email ?? '' }} <i
                                        class="bi bi-exclamation-circle text-danger"></i> </h6>
                                <div class="fw-light small">
                                    Your email address is not verified.
                                </div>
                            </div>

                            <div class="col-12">
                                <label>Update Email</label>
                                <input class="form-control rounded-0" type="text" placeholder="Enter your new email">
                            </div>

                            <div class="col-md-6">
                                <button disabled class="btn btn-primary rounded-0 w-100">Update Email</button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr>
                <div class="row g-3">
                    <div class="col-lg-5">
                        <h6 class="fw-bold">New Password</h6>
                        <span class="fw-light">
                            Manage your password to make sure it is safe
                        </span>
                    </div>
                    <div class="col-lg-5">
                        <div class="row g-3">
                            <div class="col-12">
                                <label> Old Password</label>
                                <input v-model="password.old" class="form-control rounded-0" type="password"
                                    placeholder="Enter your old password">
                                <span class="small text-muted2">Minimum 8 characters</span>
                            </div>
                            <div class="col-md-6">
                                <label> New Password</label>
                                <input v-model="password.new" class="form-control rounded-0" type="password"
                                    placeholder="new password">
                                <span class="small text-muted2">Minimum 8 characters</span>
                            </div>
                            <div class="col-md-6">
                                <label> Repeat new Password</label>
                                <input v-model="password.repeat" class="form-control rounded-0" type="password"
                                    placeholder="new password">
                            </div>

                            <div class="col-md-6 mt-3">
                                <button @click="changePassword" v-if="!password.isLoading"
                                    class="btn btn-primary rounded-0 w-100">Change Password</button>
                                <button v-else class="btn btn-primary rounded-0 w-100" disabled>
                                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <hr>

                <button class="float-end btn btn-link text-info text-decoration-none" type="button">
                    Close Account <i class="bi bi-exclamation-circle"></i>
                </button>
            </div>


            <!-- NOTIFICATIONS TAB -->
            <div class="tab-pane p-3 py-4" id="messages" role="tabpanel" aria-labelledby="messages-tab">

                <h6 class="fw-bold">Basic Information</h6>
                <span class="fw-light">This is notifications preferences that you can update anytime.</span>
                <hr>

                <div class="row g-3">
                    <div class="col-lg-5">
                        <h6 class="fw-bold">Notifications</h6>
                        <span class="fw-light">
                            Customize your preferred notification settings
                        </span>
                    </div>
                    <div class="col-lg-5 ">
                        <div class="row g-3">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-2 d-flex justify-content-end">
                                        <input name="app-checkbox" class="form-check-input" type="checkbox" value="">
                                    </div>
                                    <div class="col-10">
                                        <div class="fw-bold">Applications</div>
                                        <span>These are notifications for jobs that you have applied to</span>
                                    </div>
                                </div>

                            </div>
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-2 d-flex justify-content-end">
                                        <input class="form-check-input  " type="checkbox" value="">
                                    </div>
                                    <div class="col-10">
                                        <div class="fw-bold">Jobs</div>
                                        <span>These are notifications for job openings that suit your profile</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-2 d-flex justify-content-end">
                                        <input class="form-check-input  " type="checkbox" value="">
                                    </div>
                                    <div class="col-10">
                                        <div class="fw-bold">Recommendations </div>
                                        <span>These are notifications for personalized recommendations from our
                                            recruiters</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-2 "></div>
                                    <div class="col-10 col-md-6">
                                        <button class="btn btn-primary w-100 rounded-0">Update Settings</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <hr>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useProfileStore } from '@/stores/profileStore';
import api from '@/stores/Helpers/axios'
import useFxn from "@/stores/Helpers/useFunctions";
import profilePicUpload from './profilePicUpload.vue'

const profileStore = useProfileStore()


const allCountries = ref([])
const loading = ref(true)

onMounted(async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (response.ok) {
        const data = await response.json();
        let names = data.map((country: { name: any; }) => country.name.common)
        allCountries.value = names
        loading.value = false
    } else {
        console.error('', response.statusText);
    }
})





const userData = {
    name: profileStore.data?.name ?? '',
    gender: profileStore.data?.gender ?? '',
    phone: profileStore.data?.phone ?? '',
    country: profileStore.data?.country ?? '',
    location: profileStore.data?.location ?? '',
    title: profileStore.data?.title ?? '',
    dob: profileStore.data ? new Date(profileStore.data.dob) : null,
    isLoading: false,
    user_type: 'user'
}

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
        styleClasses: 'phone-input-profile'
    }

}

const details = reactive<any>(userData)

watch(() => profileStore.data, () => {
    details.name = profileStore.data?.name ?? '';
    details.gender = profileStore.data?.gender ?? '';
    details.phone = profileStore.data?.phone ?? '';
    details.location = profileStore.data?.location ?? '';
    details.country = profileStore.data?.country ?? '';
    details.title = profileStore.data?.title ?? '';
    details.dob = profileStore.data ? new Date(profileStore.data.dob) : null;
})


function saveProfile() {

    if (!useFxn.isOnline()) {
        useFxn.toastShort('You are offline')
        return
    }

    // const requiredFields = ['name', 'phone', 'dob', 'gender', 'location', 'country'];
    const requiredFields = ['name', 'phone'];

    for (const field of requiredFields) {
        if (!details[field]) {
            useFxn.toastShort(`Please complete field: ${field}`);
            return;
        }
    }
    submitProfileForm()
}

async function submitProfileForm() {
    let obj = {
        name: details.name,
        gender: details.gender,
        phone: details.phone,
        dob: details.dob,
        title: details.title,
        location: details.location,
        country: details.country,
    }

    try {
        details.isLoading = true
        let { data } = await api.userUpdateProfile(obj)
        if (data.status === 201) {
            useFxn.toast('Updated successfully', 'success')
            profileStore.getUserProfile()
        }
    } catch (error) {
        useFxn.toast('Could not save data, Check your internet', 'error')
    }
    finally {
        details.isLoading = false
    }
}



// password \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const password = reactive<any>({
    old: '',
    new: '',
    repeat: '',
    isLoading: false
})

function changePassword() {
    if (!useFxn.isOnline()) {
        useFxn.toastShort('You are offline')
        return
    }

    for (const field of ['old', 'new', 'repeat']) {
        if (!password[field]) {
            useFxn.toastShort(`Please complete '${field} password' field`);
            return;
        }
    }

    if (password.new.length < 8) {
        useFxn.toastShort(`Your new password must not be less that 8 characters`);
        return;
    }

    if (password.new !== password.repeat) {
        useFxn.toastShort(`Passwords do not match!`);
        return;
    }

    submitPasswordForm()
    password.isLoading = true
}

async function submitPasswordForm() {
    const obj = { oldPassword: password.old, newPassword: password.new }
    try {
        let resp = await api.userPassword(obj)
        console.log(resp);
        if (resp.status == 201) {
            useFxn.toast('Password changed succesfully', 'success')
        }

    } catch (error: any) {

        if (error.response.status === 401) {
            useFxn.toastShort('Your password is incorrect')
        }
        else {
            useFxn.toast('Sorry, error occured, check your internet', 'error')
        }
    }
    finally {
        password.isLoading = false
        password.old = password.new = password.repeat = ''
    }

}

</script>

<style lang="css" scoped>
.nav-link {
    border: none !important;
    font-size: 14px;
}

.nav-link {
    color: #7C8493;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
    font-weight: bolder;
    border-bottom: 2px solid var(--theme-color) !important;
}

@media (max-width: 767px) {
    .nav-link {
        font-size: 13px;
    }
}

.vue-tel-input {
    border-radius: 0px;
    line-height: 27px;
}
</style>

<style>
/* .vti__dropdown {
    background-color: #fff !important;
} */

.dob-settings-input .dp__pointer {
    border-radius: 0px !important;
}

.country-chooser-settings .vs__search,
.gender-chooser .vs__search {
    line-height: 1.7rem !important;
    border-radius: 0px !important;
    border: 0px !important;
}

.country-chooser-settings .vs__dropdown-toggle,
.gender-chooser .vs__dropdown-toggle {
    background-color: #fff !important;
    border-radius: 0px;
}
</style>
