<template>
    <div class="row g-3 m-0 pb-5">
        <div class="col-12">
            <div class="row g-3">
                <div class="col-12">
                    <div class="d-lg-flex justify-content-between">
                        <div class="fw-bold text-capitalize fs-5">Job Listing <br>
                            <small class="text-muted">Showing Job statistic from
                                {{ dateRange ? date_display(dateRange) : '' }}</small>
                        </div>

                        <span class="float-start float-lg-end">
                            <VueDatePicker class="fw-bold" disable-year-select :format="date_display" range
                                multi-calendars :clearable="false" :max-date="new Date()" :enable-time-picker="false"
                                auto-apply v-model="dateRange">
                            </VueDatePicker>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <EasyDataTable v-model:items-selected="itemsSelected" alternating :headers="tableHeader"
                :items="appliedHistory" :search-value="searchTerm" buttons-pagination>

                <template #header="header">
                    <span class="fw-bold text-muted">{{ header.text }}</span>
                </template>

                <template #item-score="item">
                    <i v-if="item.score < 3" class="bi bi-star text-dark"></i>
                    <i v-else class="bi bi-star-fill text-warning"></i>
                    {{ item.score }}

                </template>

                <template #item-date_applied="item">
                    {{ useFxn.dateDisplay(item.date_applied) }}
                </template>

                <template #item-stage="item">
                    <span :class="classAccordingToStage(item.stage) + '-tag'" class="category-tag">
                        {{ item.stage }}
                    </span>
                </template>

                <template #item-action="item">
                    <button class="btn btn-link action-btn text-decoration-none btn-sm p-1 px-2 ">
                        ...
                    </button>
                </template>

            </EasyDataTable>
        </div>



    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { useDateFormat } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'
import { useAdminCommonStore } from './AdminCommonStore';

const adminCommonStore = useAdminCommonStore()

const profileStore = useProfileStore()
onMounted(() => {
    console.log(profileStore.data);
    setDateRange()
})

const dateRange = ref();

const date_display = (date: Date[]) => {
    const dateMe1 = useDateFormat(date[0], 'MMM D')
    const dateMe2 = useDateFormat(date[1], 'MMM D')
    return `${dateMe1.value} - ${dateMe2.value}`;
}

function setDateRange() {
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
    dateRange.value = [startDate, endDate];
}




// table
const searchTerm = ref("");
const itemsSelected = ref([]);
const tableHeader = ref([
    { text: "Roles", value: "name", sortable: true, },
    { text: "Status", value: "status", sortable: true },
    { text: "Date Posted", value: "stage", sortable: true },
    { text: "Due Date", value: "date_applied", sortable: true },
    { text: "Job Type", value: "role", sortable: true },
    { text: "Applicants", value: "role", sortable: true },
    { text: "Score", value: "score", sortable: true },
    { text: "", value: "action" },
]);

const appliedHistory = ref([{
    id: 1,
    name: 'Social Media Assistant',
    score: 0.5,
    status: 'open',
    stage: 'Inreview',
    date_applied: '2023-12-12',
    role: 'Designer',
},
{
    id: 2,
    name: 'Social Media Assistant',
    score: 1.23,
    status: 'open',
    stage: 'Inreview',
    date_applied: '2023-12-12',
    role: 'JavaScript Dev'
},
{
    id: 3,
    name: 'Social Media Assistant',
    score: 4.5,
    status: 'open',
    stage: 'Shortlisted',
    date_applied: '2023-12-12',
    role: 'Golang Dev'
},
{
    id: 4,
    name: 'Social Media Assistant',
    score: 4.5,
    status: 'open',
    stage: 'Shortlisted',
    date_applied: '2023-12-12',
    role: 'Golang Dev'
},
{
    id: 5,
    name: 'Social Media Assistant',
    score: 4.5,
    stage: 'Shortlisted',
    date_applied: '2023-12-12',
    role: 'Golang Dev'
},
{
    id: 6,
    name: 'Social Media Assistant',
    score: 4.5,
    stage: 'Shortlisted',
    date_applied: '2023-12-12',
    role: 'Golang Dev'
},



])


const classAccordingToStage = (stage: string) => {
    let classname = ''
    switch (stage) {
        case 'Inreview':
            classname = 'yellow'
            break;
        case 'Shortlisted':
            classname = 'purple'
            break;
        default:
            classname = 'black'
            break;
    }

    return classname;
}

function goToApplicantsDetails(id: string) {
    adminCommonStore.applicants.currentIdShowing = id;
    adminCommonStore.applicants.showing = 'details'
}

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
    color: var(--theme-color) !important;
    border: 1px solid var(--theme-color) !important;
    background-color: var(--bs-light);
}
</style>
