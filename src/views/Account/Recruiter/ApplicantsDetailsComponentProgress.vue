<template>
    <div class="fw-bold mb-3">Current Stage:</div>
    <div class="row g-0">
        <div class="col" v-for="(stage, index) in hiringProgressList" :key="index" @click="updateStage(stage.val)">
            <div class="stage-box hover-tiltY" :class="{ 'active': currentStage == stage.label }">{{
                stage.label }}
            </div>
        </div>
    </div>


    <hr class="faint my-4">
    <div class="card bg-light border-0">
        <div class="card-body " style="min-height: 100px;">
            <span class="fst-italic text-muted" v-if="getStageDescription()">
                {{ getStageDescription() }}
            </span>
        </div>
    </div>
    <div class="mt-3">
        <button @click="moveToNextStep" class="btn btn-light bg-secondary-subtle theme-color">Move to Next Step</button>
    </div>

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
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRecruiterCommonStore } from './RecruiterCommonStore';
import useFxn from '@/stores/Helpers/useFunctions';
import api from '@/stores/Helpers/axios'
import type { JobStatusInterface } from '@/stores/interfaces';

const recruiterCommonStore = useRecruiterCommonStore()
const { applicants, hiringProgressList } = storeToRefs(recruiterCommonStore);

const currentStage = computed(() => {
    return applicants.value.details?.status
})


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

function moveToNextStep() {
    if (!currentStage.value) return;
    const currentIndex = hiringProgressList.value.findIndex(item => item.label === currentStage.value);
    if (currentIndex === -1 || currentIndex >= hiringProgressList.value.length - 1) {
        console.warn("Applicant is already at the final stage or status not found.");
        return;
    }
    const nextStage = hiringProgressList.value[currentIndex + 1];
    updateStage(nextStage.val);
}


function getStageDescription() {
    if (currentStage.value) {
        const stage = hiringProgressList.value.find(item => item.label === currentStage.value);
        return stage?.desc ?? '';
    }
    return null
}


// 

</script>

<style lang="css" scoped>
.stage-box {
    background-color: #E9EBFD;
    padding: 3px;
    padding-block: 5px;
    width: 100%;
    text-align: center;
    font-size: 11px;
    font-style: italic;
    cursor: pointer;
    clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);
}

.stage-box:hover {
    border-bottom: 1px solid var(--theme-color);
}

.active {
    background-color: var(--theme-color);
    color: #fff;
}
</style>
