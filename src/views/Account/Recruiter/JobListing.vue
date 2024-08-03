<template>
    <div class="row g-3 m-0 pb-5">
        <div class="col-12">
            <div class="row g-3">
                <div class="col-12">
                    <div class="d-lg-flex justify-content-between">
                        <div class="fw-bold text-capitalize fs-5">Job Listing <br>
                            <small class="text-muted">Showing Job with deadline from
                                {{ dateRange ? date_display(dateRange) : '' }}</small>
                        </div>

                        <span class="float-start float-lg-end">
                            <label class="small">Filter by deadline</label>
                            <VueDatePicker class="fw-bold" disable-year-select :format="date_display" range
                                multi-calendars :clearable="false" :enable-time-picker="false" auto-apply
                                v-model="dateRange">
                            </VueDatePicker>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <EasyDataTable :loading="itemsLoading" alternating :headers="tableHeader" :items="items"
                :search-value="searchTerm" buttons-pagination v-model:server-options="serverOptions"
                :server-items-length="total">

                <template #header="header">
                    <span class="fw-bold text-muted">{{ header.text }}</span>
                </template>

                <template #item-created_at="item">
                    {{ useFxn.dateDisplay(item.created_at) }}
                </template>

                <template #item-deadline="item">
                    {{ useFxn.dateDisplay(item.deadline) }}
                </template>



                <template #item-action="item">
                    <button @click="editJob(item)"
                        class="btn btn-sm btn-primary-outline  text-decoration-none btn-sm p-1 px-2 me-3 ">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button @click="deleteJob(item.id)"
                        class="btn btn-sm btn-outline-danger  text-decoration-none btn-sm p-1 px-2 ">
                        <i class="bi bi-trash3"></i>
                    </button>
                </template>

            </EasyDataTable>
        </div>



    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { useDateFormat } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'
import { useRecruiterCommonStore } from './RecruiterCommonStore';
import api from '@/stores/Helpers/axios';
import type { ServerOptions } from 'vue3-easy-data-table';

const recruiterCommonStore = useRecruiterCommonStore()

const profileStore = useProfileStore()
onMounted(() => {
    console.log(profileStore.data);
    setDateRange()
    getJobsList()
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
    console.log(resp, 'jobs recruuterrrrr');

}

watch(() => recruiterCommonStore.jobPosting.jobListUpdated, () => {
    getJobsList()
})

watch(serverOptions, (value: any) => { getJobsList(); }, { deep: true });
watch(dateRange, (value: any) => { getJobsList(); }, { deep: true });




const searchTerm = ref("");
// const itemsSelected = ref([]);
const tableHeader = ref([
    { text: "Title", value: "title", sortable: true, },
    // { text: "Status", value: "status", sortable: true },
    { text: "Date Posted", value: "created_at", sortable: true },
    { text: "Due Date", value: "deadline", sortable: true },
    { text: "Job Type", value: "job_type.name", sortable: true },
    { text: "Applicants", value: "total_applied", sortable: true },
    // { text: "Score", value: "score", sortable: true },
    { text: "", value: "action" },
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

</script>

<style lang="css" scoped></style>
