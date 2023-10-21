

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
                    <div class="col-lg-5">
                        <h6 class="fw-bold">Personal Details</h6>
                    </div>
                    <div class="col-lg-5">
                        <div class="row g-3">
                            <div class="col-12">
                                <label> Full Name *</label>
                                <input v-model="details.name" class="form-control rounded-0" type="text">
                            </div>
                            <div class="col-md-12">
                                <label> Phone Number *</label>
                                <input v-maska data-maska="+9" data-maska-tokens="9:\d:multiple" v-model="details.phone"
                                    class="form-control rounded-0" type="text">
                            </div>
                            <!-- <div class="col-md-7">
                                <label> Email *</label>
                                <input v-model="details.email" class="form-control rounded-0" type="text">
                            </div> -->
                            <div class="col-md-6">
                                <label> Date of Birth *</label>
                                <VueDatePicker input-class-name="dob-settings-input" hide-input-icon :clearable="false"
                                    :max-date="new Date()" :enable-time-picker="false" auto-apply v-model="details.dob">
                                </VueDatePicker>

                            </div>
                            <div class="col-md-6">
                                <label> Gender *</label>
                                <v-select v-model="details.gender" class="rounded-0" :clearable="false" :searchable="false"
                                    :options="['male', 'female']"></v-select>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row g-3">
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
                </div>

                <hr>
                <div class="col-12">
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
                        <h6 class="fw-bold">jakegyll@email.com <i class="bi bi-check-circle text-danger"></i> </h6>
                        <div class="fw-light small">
                            Your email address is verified.
                        </div>
                        <div class="col-12 mt-3">
                            <label class="fw-bold">Update Email</label>
                            <input class="form-control rounded-0" type="text" placeholder="Enter your new email">
                            <button class="btn btn-primary mt-3 rounded-0">Update Email</button>
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
                                <input class="form-control rounded-0" type="text" placeholder="Enter your old password">
                                <span class="small text-muted">Minimum 8 characters</span>
                            </div>
                            <div class="col-md-12">
                                <label> New Password</label>
                                <input class="form-control rounded-0" type="text" placeholder="Enter your new password">
                                <span class="small text-muted">Minimum 8 characters</span>
                            </div>

                            <div class="col-md-12 mt-3">
                                <button class="btn btn-primary rounded-0">Change Password</button>
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
import { reactive, watch } from 'vue';
import { useProfileStore } from '@/stores/profileStore';
import api from '@/stores/Helpers/axios'
import useFxn from "@/stores/Helpers/useFunctions";
import { vMaska } from "maska"
import profilePicUpload from './profilePicUpload.vue'
import { useOnline } from '@vueuse/core';

const profileStore = useProfileStore()
const isOnline = useOnline()

const userData = {
    name: profileStore.data?.name ?? '',
    gender: profileStore.data?.gender ?? '',
    phone: profileStore.data?.phone ?? '',
    dob: profileStore.data ? new Date(profileStore.data.dob) : null,
    isLoading: false,
    user_type: 'user'
}

const details = reactive(userData)

watch(() => profileStore.data, () => {
    details.name = profileStore.data?.name ?? '';
    details.gender = profileStore.data?.gender ?? '';
    details.phone = profileStore.data?.phone ?? '';
    details.dob = profileStore.data ? new Date(profileStore.data.dob) : null;
})


function saveProfile() {
    if (!details.name || !details.phone || !details.dob || !details.gender) {
        useFxn.toastShort('Please complete compulsory fields')
        return;
    }

    if (!isOnline.value) {
        useFxn.toastShort('You are offline!')
        return;
    }
    submitProfileForm()
}

async function submitProfileForm() {
    let obj = {
        name: details.name,
        gender: details.gender,
        phone: details.phone,
        dob: details.dob
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
</style>

<style>
.dp__pointer {
    border-radius: 0px !important;
}

/* .dob-settings-input {
    border-radius: 0px !important;
} */

.dp__range_end,
.dp__range_start,
.dp__active_date {
    background: var(--theme-color);
    color: var(--dp-primary-text-color);
}

.vs__search,
.vs__search:focus {
    line-height: 25px !important;
    border-radius: 0px !important;
}

.vs--unsearchable .vs__dropdown-toggle {
    border-radius: 0px;
}
</style>
