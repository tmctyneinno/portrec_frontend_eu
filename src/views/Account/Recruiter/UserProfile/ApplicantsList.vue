<template>
    <div class="row g-3 m-0 pb-5">
        <div class="col-12">
            <div class="row g-3">
                <div class="col-lg-8">
                    <div>
                        <span class="fw-bold text-capitalize fs-5">Total Applicants</span> <span
                            class="badge rounded-pill text-bg-secondary">{{ items.length }}</span>
                    </div>
                    <div class="small text-muted">Showing applications for your company, you can also filter by Jobs
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="form-label">Filter by Job</div>

                    <v-select :loading="jobsLoading" append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                        :teleport="true" v-model="selectedJob" class="text-capitalize job-chooser" :clearable="true"
                        :options="jobOpeningsList" :reduce="(x: any) => x.id" label="label"></v-select>
                </div>

                <div class="col-md-4">
                    <input v-model="searchTerm" type="text" class="form-control" placeholder="search title..">
                </div>
            </div>
        </div>

        <div class="col-12">
            <EasyDataTable class="recruiter-applicants-table" :loading="itemsLoading" show-index alternating
                :headers="tableHeader" :items="items" buttons-pagination v-model:server-options="serverOptions"
                :server-items-length="total" @click-row="goToApplicantsDetails">

                <template #header="header">
                    <span class="fw-bold text-muted">{{ header.text == '#' ? 'S/N' : header.text }}</span>
                </template>

                <template #item-score="item">
                    <i v-if="item.score < 3" class="bi bi-star text-dark"></i>
                    <i v-else class="bi bi-star-fill text-warning"></i>
                    {{ item.score }}

                </template>

                <template #item-created_at="item">
                    {{ useFxn.dateDisplay(item.created_at) }}
                </template>

                <template #item-status="item">
                    <span class="category-tag text-white"
                        :style="`background-color: ${templateStore.applicationStatusColor(item.status)}`">
                        {{ item.status }}
                    </span>
                </template>

                <template #item-action="item">
                    <button @click="goToApplicantsDetails(item)"
                        class="btn btn-sm btn-primary-outline  border-0 rounded-5  text-decoration-none btn-sm p-1 px-2 ">
                        <i class="bi bi-eye"></i>
                    </button>
                </template>

            </EasyDataTable>
        </div>



    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { onMounted, ref, watch } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'
import { useRecruiterCommonStore } from '../RecruiterCommonStore';
import type { ServerOptions } from 'vue3-easy-data-table';
import api from '@/stores/Helpers/axios';
import { useTemplateStore } from '@/stores/templateStore';

const recruiterCommonStore = useRecruiterCommonStore()
const templateStore = useTemplateStore()

const profileStore = useProfileStore()
onMounted(async () => {
    console.log(profileStore.data);
    await getJobsForSelect()
    getApplicationsList()
})


const jobOpeningsList = ref([])
const selectedJob = ref(null)
const jobsLoading = ref(true)
async function getJobsForSelect() {
    try {
        const { data } = await api.recruiterJobsSelect()
        jobOpeningsList.value = data
        jobsLoading.value = false
    }
    catch {
        // 
    }
}



// table

const searchTerm = ref("");
const total = ref(0)
const items = ref([])
const itemsLoading = ref(true)
const serverOptions = ref<ServerOptions | any>({
    page: 1,
    rowsPerPage: 15,
    // sortType: 'desc',
    // sortBy: ''
});


// table
// const itemsSelected = ref([]);
const tableHeader = ref([
    { text: "Full Name", value: "user.name", sortable: true, },
    // { text: "Score", value: "score", sortable: true },
    { text: "Hiring Stage", value: "status", sortable: true },
    { text: "Applied Date", value: "created_at", sortable: true },
    { text: "Job Role", value: "job.title", sortable: true },
    { text: "", value: "action" },
]);



async function getApplicationsList() {
    itemsLoading.value = true

    try {
        const obj = {
            page: serverOptions.value.page,
            rowsPerPage: serverOptions.value.rowsPerPage,
            search: searchTerm.value,
            job_opening_id: selectedJob.value,
        }
        const resp: any = await api.recruiterJobApplicationsList(obj)
        const data = resp.data.body
        total.value = resp.total
        items.value = data.data
        itemsLoading.value = false
        // console.log(resp, 'applications');
    } catch (error) {
        console.log(error);

    }
}


watch(() => recruiterCommonStore.jobPosting.jobListUpdated, () => {
    getApplicationsList()
})

watch(serverOptions, () => { getApplicationsList(); }, { deep: true });
watch(() => selectedJob.value, () => { getApplicationsList(); }, { deep: true });

const searchOnInput = useFxn.debounce(getApplicationsList, 300);
watch(searchTerm, () => { serverOptions.value.page = 1; searchOnInput(); }, { deep: true });


const classAccordingToStage = (stage: string) => {
    let classname = ''
    switch (stage) {
        case 'In-Review':
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

function goToApplicantsDetails(item: any) {
    recruiterCommonStore.jobApplication.currentIdShowing = item.id;
    recruiterCommonStore.jobApplication.showing = 'details'
    recruiterCommonStore.getJobApplication()
}

</script>

<style lang="css" scoped>
.yellow-tag {
    background: #f4deed;
    border: none !important;
    color: #6b0d4f !important;
}

.yellow-tag {
    background: #d1d10938;
    border: none !important;
    color: #616106 !important;
}

.action-btn {
    color: var(--theme-color) !important;
    border: 1px solid var(--theme-color) !important;
    background-color: var(--bs-light);
}
</style>

<style>
.recruiter-applicants-table .vue3-easy-data-table__body td {
    cursor: pointer;
}
</style>
