<template>
    <div>

        <button ref="openInterviewModal" class="btn d-none" data-bs-toggle="modal"
            data-bs-target="#scheduleInterviewModal">
        </button>

        <div class="modal  fade" id="scheduleInterviewModal" tabindex="-1" data-bs-backdrop="static"
            data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header border-0">

                        <h5 class="modal-title fw-bold text-center">{{ form.topic }}</h5>
                        <button ref="closeInterviewModal" type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <form class="row g-3" @submit.prevent>
                            <div class="col-md-6 col-lg-4">
                                <div class="form-label">Duration <span class="text-danger">*</span></div>
                                <select class="form-select" id="duration" aria-label="">
                                    <option v-for="duration in durationsDropdown" :key="duration.value"
                                        :value="duration.value">
                                        {{ duration.label }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-md-6 col-lg-4">
                                <div class="form-label">Date<span class="text-danger">*</span></div>
                                <VueDatePicker placeholder="" v-model="form.selected_date" :format="useFxn.dateDisplay"
                                    :teleport="true" hide-input-icon :clearable="false" :enable-time-picker="false"
                                    :is24="false" auto-apply id="interview_date">
                                </VueDatePicker>

                            </div>

                            <div class="col-md-6 col-lg-4">
                                <div class="form-label">Time<span class="text-danger">*</span></div>
                                <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                                    v-model="form.selected_time" class="text-capitalize time-chooser" :clearable="false"
                                    :searchable="false" :options="timeDropdown"></v-select>
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
                                <div class="form-label">Address <span class="text-danger">*</span></div>
                                <input v-model="form.location" type="text" class="form-control" id="interview_address"
                                    placeholder="" />

                            </div>

                            <div class="col-12">
                                <div class="form-label">Additional message to candidate: </div>
                                <textarea v-model="form.message" class="form-control" placeholder=""
                                    id="floatingTextarea2" style="height: 60px"></textarea>
                            </div>
                        </form>

                    </div>

                    <div class="modal-footer border-0">
                        <!-- <button ref="closeInterviewModal" type="button" class="btn btn-light " data-bs-dismiss="modal"
                            aria-label="Close">Cancel</button> -->
                        <div v-if="form.fieldError" class="small text-danger me-3">{{ form.fieldError }}</div>

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
    selected_date: Date,
    selected_time: { value: string, label: string },
    duration: string,
    message: string,
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
    selected_date: new Date(),
    selected_time: { value: '12:00', label: '12PM' },
    duration: '10',
    message: '',
    topic: '',
    meeting_type: 'online',
    location: '',
    user_id: '',
    job_application_id: '',
    isSaving: false,
    fieldError: ''
})

const durationsDropdown = ref<{ value: string, label: string }[]>([
    { value: '10', label: '10 mins' },
    { value: '15', label: '15 mins' },
    { value: '30', label: '30 mins' },
    { value: '40', label: '40 mins' },
])

const timeDropdown = ref(useFxn.generateTimeOptions(8, 17));


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

    // combine date & time
    const [hours, minutes] = form.selected_time.value.split(':').map(Number);
    const start_time = new Date(form.selected_date)
    start_time.setHours(hours, minutes, 0, 0);


    const formData = new FormData();
    formData.append('type', form.type);
    formData.append('start_time', start_time.toISOString());
    formData.append('duration', form.duration);
    formData.append('message', form.message);
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
.time-chooser .vs__search {
    border: 0px !important;
}


.v-select,
.v-select * {
    line-height: 1.67rem !important;
}
</style>
