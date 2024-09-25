<template>
    <div class="row g-3 p-lg-3">
        <div class="col-12">
            <div class="row">
                <div class="col-12">
                    <div class=" text-capitalize fs-5">Keep it Up, {{ profileStore.data?.name ?? '' }}</div>
                    <span class="text-muted">Here is job applications status from
                        <span class="fw-bold">{{ dateRange ? date_display(dateRange) : '' }}</span>.
                    </span>
                    <span class="float-start float-lg-end" style="width: 300px;">
                        <VueDatePicker class="fw-bold" :format="date_display" range multi-calendars :clearable="false"
                            :enable-time-picker="false" auto-apply v-model="dateRange">
                        </VueDatePicker>
                    </span>
                </div>
            </div>
        </div>

        <div class="col-12">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">

                <li v-for="(tab, index) in tabs.menu" :key="index" class="nav-item " role="presentation">
                    <button @click="tabs.showing = tab.id" class="nav-link"
                        :class="{ 'active': tabs.showing == tab.id }" data-bs-toggle="tab" type="button" role="tab"
                        aria-controls="one" aria-selected="true">
                        {{ tab.name }}
                        <span class="badge rounded-pill text-bg-light">
                            {{ getApplicationsCount(tab.id) }}
                        </span>

                    </button>
                </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content pt-4">
                <div class="col-12 my-3">
                    <div class="row g-3">
                        <div class="col-md-9">
                            <h5 class="fw-bold">
                                Application History
                            </h5>
                        </div>
                        <div class=" col-md-4 col-lg-3 float-end">
                            <h5 class="fw-bold">
                                <input class="float-end form-control rounded-0" placeholder="search here..."
                                    v-model="searchTerm" type="text">
                            </h5>
                        </div>
                    </div>
                </div>
                <EasyDataTable :loading="isLoadingApplications" show-index alternating :headers="tableHeader"
                    :items="appliedHistory" :search-value="searchTerm" buttons-pagination>

                    <template #header="header">
                        <span class="fw-bold text-muted">{{ header.text == '#' ? 'S/N' : header.text }}</span>
                    </template>

                    <template #item-created_at="item">
                        {{ useFxn.dateDisplay(item.created_at) }}
                    </template>

                    <template #item-status="item">
                        <span class="category-tag">
                            {{ item.status }}
                        </span>
                    </template>

                    <template #item-action="item">
                        <button class="btn btn-link border-0 text-decoration-none text-black">
                            <div class="btn-group">
                                <span class="cursor-pointer" id="triggerId" data-bs-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </span>

                                <div class="dropdown-menu dropdown-menu-start" aria-labelledby="triggerId">
                                    <a class="dropdown-item" href="#">Action- {{ item.id }}</a>
                                </div>
                            </div>
                        </button>
                    </template>

                </EasyDataTable>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { useDateFormat } from '@vueuse/core';
import { onMounted, ref, reactive, watch, computed } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'
import api from '@/stores/Helpers/axios'
import type { JobStatusInterface } from '@/stores/interfaces';


const profileStore = useProfileStore()

onMounted(() => {
    setDateRange()
    getApplicationsList()
})


const dateRange = ref<any>([]);
const isLoadingApplications = ref<boolean>(false);

const date_display = (date: Date[]) => {
    const dateMe1 = useDateFormat(date[0], 'MMM D, YYYY')
    const dateMe2 = useDateFormat(date[1], 'MMM D, YYYY')
    return `${dateMe1.value} - ${dateMe2.value}`;
}

function setDateRange() {
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
    dateRange.value = [startDate, endDate];
}


const applications = reactive({
    "ALL": [],
    "IN_REVIEW": [],
    "SHORTLISTED": [],
    "OFFERED": [],
    "INTERVIEWING": [],
    "REJECTED": []
})


async function getApplicationsList() {
    isLoadingApplications.value = true;
    try {
        const obj = {
            start_date: dateRange.value[0],
            end_date: dateRange.value[1]
        }
        const { data } = await api.userApplicationList(obj)
        applications.ALL = data.ALL;
        applications.IN_REVIEW = data.IN_REVIEW;
        applications.SHORTLISTED = data.SHORTLISTED;
        applications.OFFERED = data.OFFERED;
        applications.INTERVIEWING = data.INTERVIEWING;
        applications.REJECTED = data.REJECTED;

        isLoadingApplications.value = false

    } catch (error) {

    }
}


watch(() => dateRange.value, () => {
    getApplicationsList()
})

const tabs = reactive<{ showing: JobStatusInterface, menu: { id: JobStatusInterface, name: string }[] }>({
    showing: 'ALL',
    menu: [
        {
            id: 'ALL',
            name: 'All',
        },
        {
            id: 'IN_REVIEW',
            name: 'In Review',
        },
        {
            id: 'INTERVIEWING',
            name: 'Interviewing',
        },
        {
            id: 'REJECTED',
            name: 'Rejected',
        },
        {
            id: 'OFFERED',
            name: 'Offered'
        },
        {
            id: 'SHORTLISTED',
            name: 'Shortlisted',
        },
    ]
})



const getApplicationsCount = (str: JobStatusInterface) => {
    return applications[str].length
}


// table
const searchTerm = ref("");
const tableHeader = ref([
    { text: "Company Name", value: "company.name", sortable: true, },
    { text: "Position", value: "job.title", sortable: true },
    { text: "Date Applied", value: "created_at", sortable: true },
    { text: "Status", value: "status", sortable: true },
    // { text: "", value: "action" },
]);

const appliedHistory = computed(() => {
    return applications[tabs.showing]
})

</script>

<style lang="css" scoped></style>
