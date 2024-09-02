<template>
    <div class="fw-bold mb-3">Current Stage:</div>
    <div class="row g-1">
        <div class="col" v-for="(stage, index) in hiringProgressList" :key="index">
            <div class="stage-box" :class="{ 'active': applicants.details?.status == stage.label }">{{ stage.label }}
            </div>
        </div>
    </div>
    <hr class="faint my-4">

    <div class="fw-bold mt-4">Move to Next Stage:</div>

    <div class="row g-3 mt-1">
        <div class="col-md-6">
            <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc" :teleport="true"
                v-model="hiringProgress" class="text-capitalize job-chooser " :clearable="false"
                :options="hiringProgressList"></v-select>
        </div>
        <div class="col-md-6">
            <primaryButtonOutline @click="changeStage" :btnClass="'w-100'">
                Click to Update
            </primaryButtonOutline>
        </div>
    </div>



</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRecruiterCommonStore } from './RecruiterCommonStore';
import useFxn from '@/stores/Helpers/useFunctions';
import { ref, watchEffect } from 'vue';
import api from '@/stores/Helpers/axios'

const recruiterCommonStore = useRecruiterCommonStore()
const { applicants } = storeToRefs(recruiterCommonStore);

const hiringProgress = ref<any>('')
const hiringProgressLoading = ref<boolean>(false)

const hiringProgressList = ref([
    { label: 'In-Review', val: 'IN_REVIEW' },
    { label: 'Shortlisted', val: 'SHORTLISTED' },
    { label: 'Offered', val: 'OFFERED' },
    { label: 'Interviewing', val: 'INTERVIEWING' },
    { label: 'Unsuitable', val: 'UNSUITABLE' },
])


watchEffect(() => {
    if (applicants.value.details?.status) {
        hiringProgress.value = hiringProgressList.value.find((x: any) => x.label == applicants.value.details.status)
    }
})

function changeStage() {
    useFxn.confirm("update stage for this application?", 'Proceed').then(async (resp) => {
        if (resp.value == true) {
            hiringProgressLoading.value = true;
            try {
                const obj = {
                    job_application_id: applicants.value.details.id,
                    status: hiringProgress.value.val
                }
                await api.recruiterUpdateJobApplicationStatus(obj)
                recruiterCommonStore.loadApplicantDetails()
            } catch (error) {
                // 
            }
        }
    })
}

</script>

<style lang="css" scoped>
.stage-box {
    background-color: #E9EBFD;
    padding: 3px;
    width: 100%;
    text-align: center;
    font-size: 11px;
    font-style: italic;
}

.active {
    background-color: var(--theme-color);
    color: #fff;
}
</style>
