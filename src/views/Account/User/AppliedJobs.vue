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

                <li v-for="(tab, index) in tabs.menu" :key="index" class="nav-item" role="presentation">
                    <button @click="tabs.toShow = tab.id" class="nav-link" :class="{ 'active': tabs.toShow == tab.id }"
                        data-bs-toggle="tab" type="button" role="tab" aria-controls="one" aria-selected="true">
                        {{ tab.name }} ({{ tab.count }})
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
                <EasyDataTable show-index alternating :headers="tableHeader" :items="appliedHistory"
                    :search-value="searchTerm" buttons-pagination>

                    <template #header="header">
                        <span class="fw-bold text-muted">{{ header.text }}</span>
                    </template>

                    <template #item-date_applied="item">
                        {{ useFxn.dateDisplay(item.date_applied) }}
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
import { onMounted, ref, reactive } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'

const profileStore = useProfileStore()
onMounted(() => {
    setDateRange()
})

const dateRange = ref<any>('');

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

const tabs = reactive({
    toShow: 1,
    menu: [
        {
            id: 1,
            name: 'All',
            count: 45,
        },
        {
            id: 2,
            name: 'In Review',
            count: 34
        },
        {
            id: 3,
            name: 'Interviewing',
            count: 18
        },
        {
            id: 4,
            name: 'Assessment',
            count: 5
        },
        {
            id: 5,
            name: 'Offered',
            count: 2
        },
        {
            id: 6,
            name: 'Hired',
            count: 1
        },
    ]
})


// table
const searchTerm = ref("");
const tableHeader = ref([
    { text: "Company Name", value: "name", sortable: true, },
    { text: "Roles", value: "roles", sortable: true },
    { text: "Date Applied", value: "date_applied", sortable: true },
    { text: "Status", value: "status", sortable: true },
    { text: "", value: "action" },
]);

const appliedHistory = ref([{
    name: 'Nomad',
    roles: 'Social Media Assistant',
    date_applied: '2023-12-12',
    status: 'In-Review'
},
{
    name: 'Audacity',
    roles: 'Social Media Assistant',
    date_applied: '2023-12-12',
    status: 'Hired'
},
{
    name: 'Audacity',
    roles: 'Social Media Assistant',
    date_applied: '2023-12-12',
    status: 'Hired'
},
{
    name: 'Parker',
    roles: 'Social Media Assistant',
    date_applied: '2023-12-09',
    status: 'Offered'
}
])










</script>

<style lang="css" scoped></style>
