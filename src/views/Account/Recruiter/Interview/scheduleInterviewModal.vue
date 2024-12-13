<template>
    <div>

        <button ref="openInterviewModal" class="btn d-none" data-bs-toggle="modal"
            data-bs-target="#scheduleInterviewModal">
        </button>

        <div class="modal  fade" id="scheduleInterviewModal" tabindex="-1" data-bs-backdrop="static"
            data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollabl modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header border-0">

                        <h5 class="modal-title fw-bold text-center">{{ form.topic }}</h5>
                        <button ref="closeInterviewModal" type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <form class="row g-3" @submit.prevent>
                            <div class="col-md-6 col-lg-3">
                                <div class="form-floating">
                                    <select class="form-select" id="duration" aria-label="">
                                        <option v-for="duration in durations" :key="duration.value"
                                            :value="duration.value">
                                            {{ duration.label }}
                                        </option>
                                    </select>
                                    <label for="duration">Duration <span class="text-danger">*</span></label>
                                </div>
                            </div>

                            <!-- <div class="col-md-6 col-lg-4">
                                <div class="form-floating">
                                    <input v-model="form.interviewer_no" placeholder="" type="text"
                                        class="form-control " v-maska data-maska="#"
                                        data-maska-tokens="#:[0-9]:repeated" data-maska-reversed id="interviewer_no" />
                                    <label for="interviewer_no">Interviewer's phone number <span
                                            class="text-danger">*</span></label>
                                </div>

                            </div> -->

                            <div class="col-md-6 col-lg-5">
                                <div class="form-floating">
                                    <VueDatePicker placeholder="" class="form-control datepicker-floating-label"
                                        v-model="form.start_time" :format="useFxn.dateTimeDisplay" :teleport="true"
                                        hide-input-icon :clearable="false" :enable-time-picker="true" :is24="false"
                                        auto-apply id="interview_date">
                                    </VueDatePicker>
                                    <label for="interview_date">Date & Time <span class="text-danger">*</span></label>
                                </div>

                            </div>

                            <!-- <div class="col-md-6">
                                <div class="form-label">Time <span class="text-danger">*</span>
                                </div>
                                <VueDatePicker v-model="form.interview_time" :teleport="true" hide-input-icon
                                    time-picker :clearable="false" :format="'hh:mm a'" :is24="false">
                                </VueDatePicker>
                            </div> -->

                            <div class="col-md-7">
                                <div class="form-label">Meeting Type <span class="text-danger">*</span>
                                </div>
                                <div class="row g-0 justify-content-center">
                                    <div v-for="intv in meetingTypes" class="col">
                                        <div @click="form.meeting_type = intv.value" class="interview-type-chooser"
                                            :class="{ 'bg-secondary text-white': form.meeting_type == intv.value }">
                                            <i :class="intv.icon"></i>&nbsp;{{ intv.name }}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col-lg-12" v-if="form.meeting_type === 'physical'">
                                <div class="form-floating">
                                    <input v-model="form.location" type="text" class="form-control"
                                        id="interview_address" placeholder="" />
                                    <label for="interview_address">Address <span class="text-danger">*</span></label>
                                </div>

                            </div>

                            <div class="col-12">
                                <div class="form-floating">
                                    <textarea class="form-control" placeholder="" id="floatingTextarea2"
                                        style="height: 100px"></textarea>
                                    <label for="floatingTextarea2">Additional message to candidate </label>
                                </div>
                            </div>
                        </form>

                    </div>

                    <div class="modal-footer border-0">
                        <!-- <button ref="closeInterviewModal" type="button" class="btn btn-light " data-bs-dismiss="modal"
                            aria-label="Close">Cancel</button> -->
                        <div v-if="form.fieldError" class="small text-danger me-3">{{ form.fieldError }}llll</div>

                        <primaryButtonLoading v-if="form.isSaving" :btnText="'Creating schedule'" />

                        <primaryButton @click="createSchedule" v-else>
                            Create schedule
                        </primaryButton>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRecruiterCommonStore } from '../RecruiterCommonStore'
import { storeToRefs } from 'pinia';
import useFxn from '@/stores/Helpers/useFunctions';
import { vMaska } from "maska";
import { useProfileStore } from '@/stores/profileStore';
import api from '@/stores/Helpers/axios'

const route = useRoute()
const recruiterCommonStore = useRecruiterCommonStore()
const profileStore = useProfileStore()

const { interview, applicants } = storeToRefs(recruiterCommonStore)

// modal
const openInterviewModal = ref<any>(null)
const closeInterviewModal = ref<any>(null)

type meetingTypeOptions = 'online' | 'physical';
interface InterviewForm {
    type: '2' | '1',
    start_time: Date,
    duration: string,
    topic: string,
    meeting_type: meetingTypeOptions,
    location: string,
    user_id: string,
    job_application_id: string,
    isSaving: boolean,
    fieldError: string
}

const form = reactive<InterviewForm>({
    type: '2',
    start_time: new Date(),
    duration: '10',
    topic: '',
    meeting_type: 'online',
    location: '',
    user_id: '',
    job_application_id: '',
    isSaving: false,
    fieldError: ''
})

const durations = ref<{ value: string, label: string }[]>([
    { value: '10', label: '10 mins' },
    { value: '15', label: '15 mins' },
    { value: '30', label: '30 mins' },
    { value: '40', label: '40 mins' },
])

const meetingTypes = ref<{ name: string, value: meetingTypeOptions, icon: string }[]>([
    { name: 'Video', value: 'online', icon: 'bi bi-camera-video' },
    { name: 'In person', value: 'physical', icon: 'bi bi-geo-alt' }
])



watch(() => interview.value.scheduleModal, () => {
    const jobApplication = applicants.value.details
    form.user_id = jobApplication.user.id;
    form.job_application_id = jobApplication.id;
    form.topic = `Interview with ${jobApplication.user.name}`;
    openInterviewModal.value.click()
    // console.log(jobApplication);
});

watch(() => route, () => {
    closeInterviewModal.value.click()
}, { deep: true })




// actions ###############################



async function createSchedule(obj: any) {
    form.fieldError = ''
    if (form.meeting_type == 'physical' && !form.location) {
        form.fieldError = 'Please enter address for physical interview'
        return;
    }
    form.isSaving = true;

    const formData = new FormData();
    formData.append('type', form.type);
    formData.append('start_time', new Date(form.start_time).toISOString());
    formData.append('duration', form.duration);
    formData.append('topic', form.topic);
    formData.append('meeting_type', form.meeting_type);
    formData.append('location', form.location);
    formData.append('user_id', form.user_id);
    formData.append('job_application_id', form.job_application_id);
    try {
        const resp = await api.recruiterScheduleInterview(formData)
        console.log(resp);

        if (resp.status == 200) {
            useFxn.toast('Interview Scheduled', 'success')
        }
        closeInterviewModal.value.click()
    } catch (error) {
        console.log(error);
        useFxn.toast('Sorry, Something Went Wrong, cannot create meeting', 'error')

    }
    finally {
        form.isSaving = false;
    }

}

</script>

<style scoped>
.interview-type-chooser {
    padding-block: 6px;
    display: flex;
    justify-content: center;
    border: 1px solid var(--bs-border-color) !important;
    cursor: pointer
}
</style>

<style>
.datepicker-floating-label .dp__input {
    border: none !important;
    padding: 0px !important;
    background: transparent !important;

}
</style>
