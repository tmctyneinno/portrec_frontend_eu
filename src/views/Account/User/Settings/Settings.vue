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
                                <input v-model="details.name" class="form-control " type="text">
                            </div>
                            <div class="col-md-12">
                                <label> Phone Number </label>
                                <vue-tel-input :validCharactersOnly="true" :inputOptions="phoneField.input"
                                    :dropdownOptions="phoneField.dropDown" :autoFormat="true"
                                    v-model="details.phone"></vue-tel-input>
                            </div>
                            <!-- <div class="col-md-7">
                                <label> Email </label>
                                <input v-model="details.email" class="form-control " type="text">
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
                                <v-select v-model="details.gender_id" class="text-capitalize gender-chooser"
                                    :clearable="false" :searchable="false" :options="['Male', 'Female']"></v-select>
                            </div>
                            <div class="col-6">
                                <label> Country</label>
                                <v-select @option:selected="updateCitiesOnCountrySelect" append-to-body
                                    :calculate-position="useFxn.vueSelectPositionCalc" class="country-chooser-settings"
                                    :clearable="false" v-model="details.country" :loading="loading" label="name"
                                    placeholder="select country" :options="allCountries" />
                            </div>
                            <div class="col-6">
                                <label> City</label>
                                <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                                    class="country-chooser-settings" :clearable="false" v-model="details.location"
                                    :loading="loading" placeholder="select city" :options="citiesArray" label="name" />
                                <!-- <input v-model="details.location" class="form-control " type="text"> -->
                            </div>
                            <div class="col-12">
                                <label> Proffessional Headline </label>
                                <input v-model="details.professional_headline" class="form-control " type="text"
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
                    <div class="col-md-4 col-lg-2 float-md-end">
                        <primaryButton v-if="!details.isLoading" @click="saveProfile" className="float-end w-100">
                            Update profile
                        </primaryButton>

                        <primaryButtonLoading v-else className="w-100 " />
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
                                <h6 class="fw-bold">{{ profileStore.data?.email ?? '' }} <i
                                        class="bi bi-exclamation-circle text-danger"></i> </h6>
                                <div class="fw-light small">
                                    Your email address is not verified.
                                </div>
                            </div>

                            <div class="col-12">
                                <label>Update Email</label>
                                <input class="form-control " type="text" placeholder="Enter your new email">
                            </div>

                            <div class="col-md-6">
                                <button disabled class="btn btn-primary  w-100">Update Email</button>
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
                    <div class="col-lg-6">
                        <div class="row g-3">
                            <div class="col-12">
                                <label> Old Password</label>
                                <CustomPasswordField placeholder="Enter your old password" v-model="password.old" />

                            </div>
                            <div class="col-md-6">
                                <label> New Password</label>
                                <CustomPasswordField v-model="password.new" />

                            </div>
                            <div class="col-md-6">
                                <label> Repeat Password</label>
                                <CustomPasswordField v-model="password.repeat" />
                            </div>
                            <div class="col-12 small " :class="!passwordRegexTested ? 'text-danger' : 'text-success'">
                                <div>Minimum of 8 characters</div>
                                <div>One special character</div>
                                <div>A number</div>

                            </div>

                            <div class="col-md-6 mt-3">
                                <primaryButton :disabled="!passwordRegexTested" @click="changePassword"
                                    v-if="!password.isLoading" :className="` w-100`">
                                    Change Password
                                </primaryButton>
                                <primaryButtonLoading v-else :className="`btn-lg w-100`" />
                            </div>

                        </div>
                    </div>
                </div>
                <hr>

                <button class="float-end btn btn-lin text-info text-decoration-none" type="button">
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
                                        <primaryButton className="w-100">
                                            Update Settings
                                        </primaryButton>
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
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useProfileStore } from '@/stores/profileStore';
import api from '@/stores/Helpers/axios'
import useFxn from "@/stores/Helpers/useFunctions";
import profilePicUpload from './profilePicUpload.vue'
import { Country, State } from 'country-state-city';
import CustomPasswordField from '@/components/templates/customPasswordField.vue';

const profileStore = useProfileStore()


const allCountries = Country.getAllCountries()
const citiesArray = ref<any[]>([])
const loading = ref(false)

onMounted(async () => {
    // getCountries()
})


function updateCitiesOnCountrySelect() {
    details.location = ''
    citiesArray.value = State.getStatesOfCountry(details.country.isoCode)
}

const userData = {
    name: profileStore.data?.name ?? '',
    gender_id: profileStore.profile?.gender_id ?? '',
    phone: profileStore.profile?.phone ?? '',
    country: profileStore.profile?.country ?? '',
    location: profileStore.profile?.location ?? '',
    professional_headline: profileStore.profile?.professional_headline ?? '',
    dob: profileStore.profile ? new Date(profileStore.profile.dob) : null,
    isLoading: false,
    user_type: 'user'
}

const details = reactive<any>(userData)

watch(() => profileStore.data, () => {
    details.name = profileStore.data?.name ?? '';
    details.gender_id = profileStore.profile?.gender_id ?? '';
    details.phone = profileStore.profile?.phone ?? '';
    details.location = profileStore.profile?.location ?? '';
    // if (profileStore.profile?.country) {
    //     const country = allCountries.find((x: any) => x.name == profileStore.profile?.country)
    //     details.country = country
    // }
    details.country = profileStore.profile?.country ?? '';
    details.proffesional_headline = profileStore.profile?.proffesional_headline ?? '';
    details.dob = profileStore.profile ? new Date(profileStore.profile.dob) : null;
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
        styleClasses: 'phone-input-profile',
        maxlength: 15
    }

}




function saveProfile() {
    if (!useFxn.isOnline()) {
        useFxn.toastShort('You are offline')
        return
    }

    // const requiredFields = ['name', 'phone', 'dob', 'gender_id', 'location', 'country'];
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
        gender_id: details.gender_id,
        phone: details.phone,
        dob: details.dob,
        professional_headline: details.professional_headline,
        location: details.location?.name ?? null,
        country: details.country?.name ?? null,
    }

    try {
        details.isLoading = true
        let { data } = await api.userUpdateProfile(obj)
        if (data.status === 201) {
            useFxn.toast('Updated successfully', 'success')
            profileStore.getProfile()
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

const passwordRegexTested = computed(() => {
    return password.new && useFxn.passwordRegex(password.new) ? true : false
})


function changePassword() {

    for (const field of ['old', 'new', 'repeat']) {
        if (!password[field]) {
            useFxn.toastShort(`Please complete '${field} password' field`);
            return;
        }
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
        if (resp.status == 200) {
            useFxn.toast('Password changed succesfully', 'success')
        }

    } catch (error: any) {

        if (error.response.status === 400) {
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
.vue-tel-input {
    border-radius: 0px;
    line-height: 27px;
}
</style>

<style>
/* .vti__dropdown {
    background-color: #fff !important;
} */

/* .dob-settings-input .dp__pointer {
    border-radius: 0px !important;
} */

.country-chooser-settings .vs__search,
.gender-chooser .vs__search {
    line-height: 1.7rem !important;
    /* border-radius: 0px !important; */
    border: 0px !important;
}

.country-chooser-settings .vs__dropdown-toggle,
.gender-chooser .vs__dropdown-toggle {
    background-color: #fff !important;
    /* border-radius: 0px; */
}
</style>
