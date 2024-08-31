<template>
    <div class="row g-3 m-0 pb-5">
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
                    <label class="small">Filter by deadline</label>
                    <!-- disable-year-select -->
                    <VueDatePicker class="fw-bold" :format="date_display" range multi-calendars :clearable="false"
                        :enable-time-picker="false" auto-apply v-model="dateRange">
                    </VueDatePicker>
                </div>

                <div class="col-md-4" v-if="items.length">
                    <input v-model="searchTerm" type="text" class="form-control rounded-0" placeholder="search title..">
                </div>
            </div>
        </div>

        <div class="col-12">
            <EasyDataTable show-index :loading="itemsLoading" alternating :headers="tableHeader" :items="items"
                buttons-pagination v-model:server-options="serverOptions" :server-items-length="total">

                <template #header="header">
                    <span class="fw-bold text-muted">{{ header.text == '#' ? 'S/N' : header.text }}</span>
                </template>

                <template #item-created_at="item">
                    {{ useFxn.dateDisplay(item.created_at) }}
                </template>

                <template #item-deadline="item">
                    {{ useFxn.dateDisplay(item.deadline) }}
                </template>



                <template #item-action="item">
                    <button @click="editJob(item)"
                        class="btn btn-sm btn-primary-outline border-0 rounded-5  text-decoration-none btn-sm p-1 px-2 me-3 ">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button @click="deleteJob(item.id)"
                        class="btn btn-sm btn-outline-danger border-0 rounded-5  text-decoration-none btn-sm p-1 px-2 ">
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
    const dateMe1 = useDateFormat(date[0], 'MMM D, YYYY')
    const dateMe2 = useDateFormat(date[1], 'MMM D, YYYY')
    return `${dateMe1.value} - ${dateMe2.value}`;
}

function setDateRange() {
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 14));
    dateRange.value = [startDate, endDate];
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

</script>

<style lang="css" scoped></style>
