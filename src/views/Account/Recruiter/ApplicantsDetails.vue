<template>
    <OverlayLoading v-if="applicants.detailsLoading" />
    <div class="row g-3 m-0 pb-5">
        <div class="col-12">
            <div class="row g-3">
                <div class="col-12">
                    <div class="d-lg-flex justify-content-between">
                        <div class="fw-bold text-capitalize fs-5">
                            <i @click="navigateBack" class="bi bi-arrow-left cursor-pointer me-3"></i>
                            Application Details
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-5">
            <div class="card rounded- h-100">
                <div class="card-body">

                    <!-- name -->
                    <div class="d-lg-flex ">
                        <i style="font-size: 3rem;" class="bi bi-person-circle text-muted me-3"></i>
                        <div>
                            <div class="fs-3 fw-lighter">{{ applicants.details?.user?.name }}</div>
                            <!-- <div>Product Designer</div> -->
                            <div>{{ applicants.details?.user?.profile?.professional_headline }}</div>
                            <div class="text-muted">{{ applicants.details?.user?.email }}</div>
                            <!-- <div class="fw-bold">
                                <i class="bi bi-star-fill text-warning"></i> 4.0
                            </div> -->
                        </div>
                    </div>


                    <div class="card mt-3 rounded- border-0 bg-light p-2">
                        <div class="card-header bg-transparent">
                            Applied
                            <span class="float-end xsmall">
                                {{ useFxn.timeAgo(applicants.details?.applied_date) }}
                            </span>
                        </div>
                        <div class="card-body">
                            <div class="fw-bold"> {{ applicants.details?.job?.title }} </div>
                            <div class="text-muted text-capitalize">{{ applicants.details?.job?.industry?.name }}
                                ({{ applicants.details?.job?.job_type?.name }})
                            </div>
                        </div>
                    </div>

                    <!-- stage -->
                    <div class="card mt-3 rounded- border-0 bg-light p-2">
                        <div class="card-body">
                            <div>
                                <span class="xsmall">Status</span>
                                <span class="float-end xsmall">
                                    <i class="bi bi-circle-fill theme-color"></i> {{ applicants.details?.status }}
                                </span>
                            </div>
                            <div class="progress rounded-">
                                <div v-for="(progress, index) in commonStore.hiringProgressList" :key="progress.val"
                                    class="progress-bar bg-transparent me-1" role="progressbar" style="width: 100%;"
                                    aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                    :class="{ 'bg-theme': isHighlighted(index) }">
                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- shecdule and chat -->
                    <div class="d-flex justify-content-between mt-3">
                        <button @click="openInterviewModal" class="btn w-100 me-3  btn-primary-outline">Schedule
                            Interview</button>
                        <!-- <a :href="userResume" target="_blank" class="btn w-100 me-3 btn-primary-outline" download>
                            <i class="bi bi-file-earmark-arrow-down-fill"></i> Download Resume
                        </a> -->
                        <button class="btn  btn-primary-outline">
                            <i class="bi bi-chat-left-text"></i>
                        </button>
                    </div>

                    <hr>

                    <!-- contact -->
                    <div class="card border-0 p-0">
                        <div class="fw-bold">Contact</div>
                        <div class="my-2 d-flex">
                            <i class="bi bi-envelope me-3"></i>
                            <div>
                                <div class="text-muted">Email</div>
                                <div>{{ applicants.details?.user?.email }}</div>
                            </div>
                        </div>
                        <div class="my-2 d-flex">
                            <i class="bi bi-phone me-3"></i>
                            <div>
                                <div class="text-muted">Phone</div>
                                <div>{{ applicants.details?.user?.phone }}</div>
                            </div>
                        </div>
                        <div class="my-2 d-flex">
                            <i class="bi bi-instagram me-3"></i>
                            <div>
                                <div class="text-muted">Instagram</div>
                                <div class="theme-color">{{ applicants.details?.user?.profile?.instagram ?? '-' }}</div>
                            </div>
                        </div>
                        <div class="my-2 d-flex">
                            <i class="bi bi-twitter-x me-3"></i>
                            <div>
                                <div class="text-muted">Twitter</div>
                                <div class="theme-color">{{ applicants.details?.user?.profile?.twitter ?? '-' }}</div>
                            </div>
                        </div>
                        <div class="my-2 d-flex">
                            <i class="bi bi-globe me-3"></i>
                            <div>
                                <div class="text-muted">Website</div>
                                <div class="theme-color">{{ applicants.details?.user?.profile?.website ?? '-' }}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>

        <div class="col-md-7">
            <div class="card rounded- h-100">
                <div class="card-body">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1"
                                type="button" role="tab" aria-controls="tab1" aria-selected="true">
                                Applicant Profile
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2"
                                type="button" role="tab" aria-controls="tab2" aria-selected="false">
                                Resume
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3"
                                type="button" role="tab" aria-controls="tab3" aria-selected="false">
                                Hiring Progress
                            </button>
                        </li>
                    </ul>

                    <div class="tab-content" style="min-height: 300px;">
                        <div class="tab-pane active py-4" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                            <ApplicantsDetailsComponentProfile />
                        </div>
                        <div class="tab-pane py-4" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                            <ApplicantsDetailsComponentResume />
                        </div>
                        <div class="tab-pane py-4" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                            <ApplicantsDetailsComponentProgress />
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <scheduleInterviewModal />

    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { computed, onMounted, ref } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'
import { useRecruiterCommonStore } from './RecruiterCommonStore';
import ApplicantsDetailsComponentProfile from './ApplicantsDetailsComponentProfile.vue';
import ApplicantsDetailsComponentResume from './ApplicantsDetailsComponentResume.vue';
import ApplicantsDetailsComponentProgress from './ApplicantsDetailsComponentProgress.vue';
import { storeToRefs } from 'pinia';
import OverlayLoading from '@/components/overlayLoading.vue';
import scheduleInterviewModal from './Interview/scheduleInterviewModal.vue';

const commonStore = useRecruiterCommonStore()
const { applicants, interview } = storeToRefs(commonStore)

const profileStore = useProfileStore()
onMounted(() => {
    console.log(profileStore.data);
})


function navigateBack() {
    applicants.value.currentIdShowing = '';
    applicants.value.showing = 'list'
}


// const userResume = computed(() => {
//     return applicants.value.details?.resume?.resume_url ?? null
// })


function openInterviewModal() {
    interview.value.scheduleModal = !interview.value.scheduleModal
}


const currentIndex = computed(() =>
    commonStore.hiringProgressList.findIndex((progress) => progress.label === applicants.value?.details?.status)
);

const isHighlighted = (index: any) => index <= currentIndex.value;


</script>

<style lang="css" scoped>
.purple-tag {
    background: transparent;
    border: 1px solid #873A70 !important;
    color: #873A70 !important;
}

.yellow-tag {
    background: transparent;
    border: 1px solid #6cdc56 !important;
    color: #6cdc56 !important;
}

.action-btn {
    color: var(--theme-color);
    border: 1px solid var(--theme-color);
    background-color: var(--bs-light);
}
</style>
