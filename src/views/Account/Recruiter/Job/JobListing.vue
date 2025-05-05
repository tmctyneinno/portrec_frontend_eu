<template>
    <div v-if="componentShowing == 'list'" class="row g-3 m-0 pb-5">
        <div class="col-12">
            <div class="row g-3">
                <div class="col-lg-8">
                    <div>
                        <div class="fw-bold text-capitalize fs-5">Job Listing</div>
                        <div class="text-muted small">Showing jobs with deadline from
                            <span class="fw-bolder">{{ dateRange ? date_display(dateRange) : '' }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <label class="small">Filter by Date Posted</label>
                    <CustomDateRangePicker v-model="dateRange" />
                </div>

                <div class="col-md-4">
                    <input v-model="searchTerm" type="text" class="form-control" placeholder="search title..">
                </div>
            </div>
        </div>

        <div class="col-12">
            <EasyDataTable class="job-listing-table" show-index :loading="itemsLoading" alternating
                :headers="tableHeader" :items="items" buttons-pagination v-model:server-options="serverOptions"
                :server-items-length="total">

                <template #header="header">
                    <span class="fw-bold text-muted">{{ header.text == '#' ? 'S/N' : header.text }}</span>
                </template>

                <template #item-title="item">
                    <a href="#" @click="goToJobDetails(item)" class="theme-color hover-bold">{{ item.title }}</a>
                </template>

                <template #item-created_at="item">
                    {{ useFxn.dateDisplay(item.created_at) }}
                </template>


                <template #item-deadline="item">
                    {{ useFxn.dateDisplay(item.deadline) }}
                </template>



                <template #item-action="item">
                    <span class="me-3">
                        <button v-if="item.total_applied == 0" @click="editJob(item)"
                            class="btn btn-sm btn-primary-outline border-0 rounded-5  text-decoration-none btn-sm p-1 px-2  ">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button v-else
                            class="btn btn-sm border-0 text-decoration-none text-muted2 btn-sm p-1 px-2 cursor-notallowed  ">
                            <i class="bi bi-pencil"></i>
                        </button>
                    </span>
                    <span>
                        <button v-if="item.total_applied == 0" @click="deleteJob(item.id)"
                            class="btn btn-sm btn-outline-danger border-0 rounded-5  text-decoration-none btn-sm p-1 px-2 ">
                            <i class="bi bi-trash3"></i>
                        </button>
                        <button v-else
                            class="btn btn-sm  border-0  text-decoration-none text-muted2 btn-sm p-1 px-2 cursor-notallowed ">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </span>
                </template>

            </EasyDataTable>
        </div>
    </div>
    <JobListingDetailsComponent v-else />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'
import { useRecruiterCommonStore } from '../RecruiterCommonStore';
import api from '@/stores/Helpers/axios';
import type { ServerOptions } from 'vue3-easy-data-table';
import CustomDateRangePicker from '@/components/plugins/CustomDateRangePicker.vue';
import { useRoute, useRouter } from 'vue-router';
import JobListingDetailsComponent from './JobListingDetails.vue';

const recruiterCommonStore = useRecruiterCommonStore()

onMounted(() => {
    if (dateRange.value.length) getJobsList()
})


const router = useRouter()
const route = useRoute()

const componentShowing = ref<'list' | 'details'>('list')

watchEffect(() => {
    componentShowing.value = route.query?.dd ? 'details' : 'list'
})


const dateRange = ref([]);


const date_display = (date: Date[]) => {
    if (!date || date.length < 2) return '';
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${formatter.format(date[0])} - ${formatter.format(date[1])}`;
};



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

async function getJobsList() {
    itemsLoading.value = true

    try {
        const obj = {
            page: serverOptions.value.page,
            rowsPerPage: serverOptions.value.rowsPerPage,
            search: searchTerm.value,
            start_date: dateRange.value[0],
            end_date: dateRange.value[1],
        }
        const resp: any = await api.recruiterJobsList(obj)
        const data = resp.data.body
        total.value = resp.total
        items.value = data.data
        itemsLoading.value = false
        // console.log(resp, 'jobs recruuterrrrr');
    } catch (error) {
        // 
    }

}

watch(() => recruiterCommonStore.jobPosting.jobListUpdated, () => {
    getJobsList()
})

watch(serverOptions, () => { getJobsList(); }, { deep: true });
watch(dateRange, () => { serverOptions.value.page = 1; getJobsList(); }, { deep: true });

const searchOnInput = useFxn.debounce(getJobsList, 300);
watch(searchTerm, () => { serverOptions.value.page = 1; searchOnInput(); }, { deep: true });


// const itemsSelected = ref([]);
const tableHeader = ref([
    { text: "Title", value: "title", sortable: true, },
    // { text: "Status", value: "status", sortable: true },
    { text: "Date Posted", value: "created_at", sortable: true },
    { text: "Due Date", value: "deadline", sortable: true },
    { text: "Job Type", value: "job_type.name", sortable: true },
    { text: "Applicants", value: "total_applied", sortable: true },
    // { text: "Score", value: "score", sortable: true },
    { text: "Edit/Delete", value: "action" },
]);


function editJob(job: any) {
    recruiterCommonStore.editJobOpening(job)
}

function deleteJob(id: any) {
    useFxn.confirm('Delete This Job Opening?', 'Yes, Delete').then(async (confirm) => {
        if (confirm.value) {
            try {
                const resp = await api.recruiterJobDelete(id)
                if (resp.status == 200) {
                    useFxn.toast('Job Opening Deleted', 'success')
                    getJobsList()
                }
            } catch (error) {
                // 
            }
        }


    })

}

function goToJobDetails(item: any) {
    router.push({ path: '', query: { job: item?.title ?? '', dd: item.id, tm: new Date().getTime(), } })
}

</script>

<style lang="css" scoped></style>

<!-- <style>
.job-listing-table .vue3-easy-data-table__body td {
    cursor: pointer;
}
</style> -->
