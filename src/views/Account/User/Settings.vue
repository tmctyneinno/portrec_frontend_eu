

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
            <div class="tab-pane active p-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">

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
                    <div class="col-lg-7 d-flex align-items-center">
                        <div class="image-circle"></div>
                        <div class="drag-drop ms-3">
                            <div class="text-center small">
                                <div><i class="bi bi-image them-color"></i></div>
                                <div><span class="theme-color">Click to replace</span> or drag and drop</div>
                                <div class="fw-light">SVG, PNG, JPG or GIF (max. 400 x 400px)</div>
                            </div>
                        </div>
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
                                <input class="form-control rounded-0" type="text">
                            </div>
                            <div class="col-md-6">
                                <label> Phone Number *</label>
                                <input class="form-control rounded-0" type="text">
                            </div>
                            <div class="col-md-6">
                                <label> Email *</label>
                                <input class="form-control rounded-0" type="text">
                            </div>
                            <div class="col-md-6">
                                <label> Date of Birth *</label>
                                <VueDatePicker :clearable="false" :max-date="new Date()" :enable-time-picker="false"
                                    auto-apply v-model="date"></VueDatePicker>

                            </div>
                            <div class="col-md-6">
                                <label> Gender *</label>
                                <v-select class="rounded-0" :clearable="false" :searchable="false"
                                    :options="['Male', 'Female']"></v-select>
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
                                <input name="input-type" class="me-3" type="radio" id="one" value="One" />
                                <label class="mt-3" for="one">
                                    <div class="fw-bold">Job Seeker</div>
                                    <span class="fw-light">Looking for a job</span>
                                </label>
                            </div>
                            <div class="col-12 d-flex">
                                <input name="input-type" class="me-3 custom-radio-button" type="radio" id="two"
                                    value="Two" />
                                <label class="mt-3 " for="two">
                                    <div class="fw-bold ">Employer</div>
                                    <span class="fw-light">Hiring, sourcing candidates, or posting a jobs</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <hr>

                <button class="float-end btn btn-primary rounded-0" type="button">
                    Save profile
                </button>

            </div>

            <!-- LOGIN DETAILS TAB -->
            <div class="tab-pane" id="login" role="tabpanel" aria-labelledby="login-tab"> profile </div>
            <div class="tab-pane" id="messages" role="tabpanel" aria-labelledby="messages-tab"> messages </div>
        </div>


    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const date = ref(new Date())
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

.image-circle {
    background-color: #d2edd26d;
    height: 100px;
    width: 100px;
    border-radius: 50%;
}

.drag-drop {
    background-color: var(--bs-light);
    padding: 20px;
    border: 2px dashed var(--theme-color);
    border-radius: 10px;
    cursor: pointer;
}




@media (max-width: 767px) {
    .nav-link {
        font-size: 13px;
    }
}
</style>

<style>
.dp__pointer {
    border-radius: 0px;
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
