<template>
    <div>

        <button ref="openInterviewModal" class="btn d-none" data-bs-toggle="modal"
            data-bs-target="#scheduleInterviewModal">
        </button>

        <div class="modal  fade" id="scheduleInterviewModal" tabindex="-1" data-bs-backdrop="static"
            data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollabl modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header border-0">

                        <h5 class="modal-title fw-bold text-center">Shedule Interview</h5>
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

                            <div class="col-md-6 col-lg-4">
                                <div class="form-floating">
                                    <input v-model="form.interviewer_no" placeholder="" type="text"
                                        class="form-control " v-maska data-maska="#"
                                        data-maska-tokens="#:[0-9]:repeated" data-maska-reversed id="interviewer_no" />
                                    <label for="interviewer_no">Interviewer's phone number <span
                                            class="text-danger">*</span></label>
                                </div>

                            </div>

                            <div class="col-md-6 col-lg-5">
                                <div class="form-floating">
                                    <VueDatePicker placeholder="" class="form-control datepicker-floating-label"
                                        v-model="form.interview_date" :format="useFxn.dateTimeDisplay" :teleport="true"
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
                                <div class="form-label">Interview Type <span class="text-danger">*</span>
                                </div>
                                <div class="row g-0 justify-content-center">
                                    <div v-for="intv in interviewTypes" class="col">
                                        <div @click="form.interview_type = intv.value" class="interview-type-chooser"
                                            :class="{ 'bg-secondary text-white': form.interview_type == intv.value }">
                                            <i :class="intv.icon"></i>&nbsp;{{ intv.name }}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col-lg-7" v-if="form.interview_type == 'in_person'">
                                <div class="form-floating">
                                    <input type="text" class="form-control" id="interview_address" placeholder="" />
                                    <label for="interview_address">Address <span class="text-danger">*</span></label>
                                </div>

                            </div>

                            <div class="col-lg-5" v-if="form.interview_type == 'in_person'">
                                <div class="form-floating">
                                    <input type="text" class="form-control" id="interview_state" placeholder="" />
                                    <label for="interview_state">State <span class="text-danger">*</span></label>
                                </div>

                            </div>

                            <div class="col-12">
                                <div class="form-floating">
                                    <textarea class="form-control" placeholder="" id="floatingTextarea2"
                                        style="height: 100px"></textarea>
                                    <label for="floatingTextarea2">Additional message to candidate <span
                                            class="text-danger">*</span></label>
                                </div>
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
    interview_type: 'video',
    type: 2
})

const durations = ref<{ value: number, label: string }[]>([
    { value: 10, label: '10 mins' },
    { value: 15, label: '15 mins' },
    { value: 30, label: '30 mins' },
    { value: 40, label: '40 mins' },
])

const interviewTypes = ref<{ name: string, value: string, icon: string }[]>([
    { name: 'Video', value: 'video', icon: 'bi bi-camera-video' },
    // { name: 'Call', value: 'call', icon: 'bi bi-telephone' },
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

<style scoped>
.interview-type-chooser {
    padding-block: 10px;
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
