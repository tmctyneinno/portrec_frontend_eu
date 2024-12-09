<template>
    <div>

        <button ref="openInterviewModal" class="btn d-none" data-bs-toggle="modal"
            data-bs-target="#scheduleIterviewModal">
        </button>

        <div class="modal  fade" id="scheduleIterviewModal" tabindex="-1" data-bs-backdrop="static"
            data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollabl modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header border-0">

                        <h5 class="modal-title fw-bold text-center">Shedule Interview</h5>
                        <button ref="closeInterviewModal" type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <form class="row g-2" @submit.prevent>
                            <div class="col-md-6">
                                <div class="form-label">Duration <span class="text-danger">*</span></div>
                                <select class="form-select" v-model="form.duration">
                                    <option v-for="duration in durations" :key="duration.value" :value="duration.value">
                                        {{ duration.label }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-md-6">
                                <div class="form-label">Interviewer's phone number <span class="text-danger">*</span>
                                </div>
                                <input v-model="form.interviewer_no" placeholder="080..." type="text"
                                    class="form-control " v-maska data-maska="#" data-maska-tokens="#:[0-9]:repeated"
                                    data-maska-reversed />
                            </div>

                            <div class="col-md-6">
                                <div class="form-label">Date <span class="text-danger">*</span>
                                </div>
                                <VueDatePicker v-model="form.interview_date" :format="useFxn.dateDisplay"
                                    :teleport="true" hide-input-icon :clearable="false" :enable-time-picker="false"
                                    auto-apply>
                                </VueDatePicker>
                            </div>

                            <div class="col-md-6">
                                <div class="form-label">Time <span class="text-danger">*</span>
                                </div>
                                <VueDatePicker v-model="form.interview_time" :teleport="true" hide-input-icon
                                    time-picker :clearable="false" :format="'hh:mm a'" :is24="false">
                                </VueDatePicker>
                            </div>

                            <div class="col-12">
                                <div class="form-label">Interview Type <span class="text-danger">*</span>
                                </div>
                                <div class="row g-2 justify-content-center">
                                    <div v-for="intv in interviewTypes" class="col">
                                        <button @click="form.interview_type = intv.value"
                                            class="btn btn-outline-secondary w-100"
                                            :class="{ 'btn-primary text-white': form.interview_type == intv.value }">
                                            <i :class="intv.icon"></i> {{ intv.name }}
                                        </button>
                                    </div>

                                </div>
                            </div>

                            <div class="col-12">
                                <div class="form-label">Additional message to candidate <span
                                        class="text-danger">*</span>
                                </div>
                                <div class="small text-muted">
                                    Enter information, dress code and information they need to have ready using comma
                                </div>
                                <textarea class="form-control" style="height: 100px;"></textarea>
                            </div>
                        </form>

                    </div>

                    <div class="modal-footer border-0">
                        <!-- <button ref="closeInterviewModal" type="button" class="btn btn-light " data-bs-dismiss="modal"
                            aria-label="Close">Cancel</button> -->

                        <primaryButtonLoading v-if="form.isSaving" :btnText="'Creating schedule'" />

                        <primaryButton v-else>
                            Create interview schedule
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

const { interview } = storeToRefs(recruiterCommonStore)

// modal
const openInterviewModal = ref<any>(null)
const closeInterviewModal = ref<any>(null)

const form = reactive({
    isSaving: false,
    interview_date: new Date(),
    interview_time: null,
    interviewer_no: null,
    duration: 10,
    interview_type: 'video'
})

const durations = ref<{ value: number, label: string }[]>([
    { value: 10, label: '10 mins' },
    { value: 15, label: '15 mins' },
    { value: 30, label: '30 mins' },
    { value: 45, label: '45 mins' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1 hour, 45 mins' },
    { value: 120, label: '2hours' },
])

const interviewTypes = ref<{ name: string, value: string, icon: string }[]>([
    { name: 'Video', value: 'video', icon: 'bi bi-camera-video' },
    { name: 'Call', value: 'call', icon: 'bi bi-telephone' },
    { name: 'In person', value: 'in_person', icon: 'bi bi-geo-alt' }
])






watch(() => interview.value.scheduleModal, () => {
    openInterviewModal.value.click()
});

watch(() => route, () => {
    closeInterviewModal.value.click()
}, { deep: true })




// actions ###############################



async function updateFormToApi(obj: any) {
    // form.value.isSaving = true;
    // try {
    //     const resp = await api.recruiterJobPostingUpdate(jobPosting.value.editingId, obj)
    //     if (resp.status == 201) {
    //         useFxn.toast('Job updated', 'success')
    //         jobPosting.value.jobListUpdated = !jobPosting.value.jobListUpdated
    //     }
    // } catch (error) {
    //     console.log(error);
    //     useFxn.toast('Sorry, Something Went Wrong', 'error')
    // }
    // finally {
    //     jobPosting.value.modal = !jobPosting.value.modal
    //     form.value.isSaving = false;
    // }

}

</script>

<style scoped></style>

<style>
.job-chooser .vs__search {
    line-height: 1.7rem !important;
    border-radius: 0px !important;
    border: 0px !important;
}
</style>
