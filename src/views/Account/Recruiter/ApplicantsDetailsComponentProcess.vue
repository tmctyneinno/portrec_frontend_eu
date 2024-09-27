<template>
    <div class="fw-bold mb-3">Current Stage:</div>
    <div class="row g-1">
        <div class="col" v-for="(stage, index) in hiringProgressList" :key="index" @click="updateStage(stage.val)">
            <div class="stage-box hover-tiltY" :class="{ 'active': applicants.details?.status == stage.label }">{{
                stage.label }}
            </div>
        </div>
    </div>
    <hr class="faint my-4">

    <!-- <div class="fw-bold mt-4">Move to Next Stage:</div>

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
    </div> -->



</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRecruiterCommonStore } from './RecruiterCommonStore';
import useFxn from '@/stores/Helpers/useFunctions';
import api from '@/stores/Helpers/axios'
import type { JobStatusInterface } from '@/stores/interfaces';

const recruiterCommonStore = useRecruiterCommonStore()
const { applicants } = storeToRefs(recruiterCommonStore);

const hiringProgressList = ref<{ label: string, val: JobStatusInterface }[]>([
    { label: 'In-Review', val: 'IN_REVIEW' },
    { label: 'Shortlisted', val: 'SHORTLISTED' },
    { label: 'Offered', val: 'OFFERED' },
    { label: 'Interviewing', val: 'INTERVIEWING' },
    { label: 'Rejected', val: 'REJECTED' },
])

function updateStage(status: JobStatusInterface) {
    useFxn.confirm("update stage for this application?", 'Proceed').then(async (resp) => {
        if (resp.value == true) {
            recruiterCommonStore.applicants.detailsLoading = true
            try {
                const obj = {
                    job_application_id: applicants.value.details.id,
                    status: status
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
    cursor: pointer;
}

.stage-box:hover {
    border-bottom: 1px solid var(--theme-color);
}

.active {
    background-color: var(--theme-color);
    color: #fff;
}
</style>
