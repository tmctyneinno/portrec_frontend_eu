<template>
    <div class="row g-3 p-lg-3 bg-light m-0 pb-5">
        <div class="col-12 mb-3">
            <div class="row">
                <div class="col-12">
                    <div class="row g-2 justify-content-center align-items-center">
                        <div class="col-md-8">
                            <div class="fw-bold text-capitalize">{{ useFxn.greet() }}, {{ profileStore.data?.name ?? ''
                                }}</div>
                            <span class="text-muted">Here is what’s happening with your job search applications so far.
                                <!-- <span class="fw-bold">{{ dateRange ? date_display(dateRange) : '' }}</span>. -->
                            </span>
                        </div>
                        <div class="col-md-4">
                            <!-- <CustomDateRangePicker v-model="dateRange" /> -->
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="row g-3">
                <div class="col-12">
                    <div class="card colored-card total-jobs-card shadow-sm">
                        <div class="card-body">
                            <div>Total Jobs Applied</div>
                            <div class="big-number">{{ details.totalJobsApplied }}</div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card colored-card interviewed-card shadow-sm">
                        <div class="card-body">
                            <div>Jobs viewed</div>
                            <div class="big-number">{{ details.totalJobsViewed }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card shadow-sm">
                <div class="color-green card-header py-2 pt-3 bg-transparent fw-bold border-0">
                    Jobs Applied
                    Status</div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-lg-5 d-flex justify-content-lg-center align-items-center">
                            <div id="chart ">
                                <apexchart type="donut" :options="chartOptions" :series="chartSeries">
                                </apexchart>
                            </div>
                        </div>

                        <div class="col-lg-7 py-lg-5 xsmall row justify-content-center align-items-center">
                            <div class="col-6 col-lg-12 bg-succes">
                                <i class="color-rejected bi bi-square-fill"></i>
                                <span class="fw-bold color-rejected mx-1">{{ chartPercent.rejected }}%</span>
                                <span class="text-muted">Rejected</span>
                            </div>
                            <div class="col-6 col-lg-12">
                                <i class="color-green bi bi-square-fill"></i>
                                <span class="fw-bold color-green mx-1">{{ chartPercent.total }} %</span>
                                <span class="text-muted">In Review</span>
                            </div>
                        </div>


                    </div>
                    <div class="col-12 mt-3">
                        <router-link to="/user/applied-jobs"
                            class="fw-bold theme-color cursor-pointer float-lg-end hover-tiltY">View All Applications
                            <i class="bi bi-arrow-right"></i></router-link>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="card shadow-sm">
                <div class="card-header py-2 fw-bold bg-transparent border-0">Upcoming Interviews</div>
                <!-- <div class="card-header py-2  bg-transparent shadow-sm">
                    Today, 26 November
                    <span class="float-end">
                        <i class="bi bi-chevron-left"></i>
                        <i class="bi bi-chevron-right"></i>
                    </span>
                </div> -->
                <div class="card-body row gy-3">
                    <ComponentLoading v-if="details.isLoadingDetails" />
                    <div v-else>
                        <NoDataShow :text="'No Interviews'" icon="bi-calendar-x" />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header fw-bold py-3 bg-transparent border-0 ">Recent Applications History</div>
                <div class="card-body min-vh-100">
                    <EasyDataTable :loading="details.isLoadingDetails" show-index alternating
                        :headers="AppliedHistoryTableHeader" :items="details.recentApplicationHistory"
                        buttons-pagination>

                        <template #header="header">
                            <span class="fw-bold text-muted">{{ header.text == '#' ? 'S/N' : header.text }}</span>
                        </template>

                        <template #item-created_at="item">
                            {{ useFxn.dateDisplay(item.created_at) }}
                        </template>

                        <template #item-status="item">
                            <span class="category-tag text-white"
                                :style="{ backgroundColor: templateStore.applicationStatusColor(item.status) }">
                                {{ item.status }}
                            </span>
                        </template>
                    </EasyDataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { useDateFormat } from '@vueuse/core';
import { onMounted, reactive, ref } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'
import api from '@/stores/Helpers/axios'
import NoDataShow from '@/components/noDataShow.vue';
import ComponentLoading from '@/components/componentLoading.vue';
import CustomDateRangePicker from '@/components/CustomDateRangePicker.vue';
import { useTemplateStore } from '@/stores/templateStore';

const profileStore = useProfileStore()
const templateStore = useTemplateStore()



onMounted(() => {
    getDashboardInfo()
})

const details = reactive({
    isLoadingDetails: false,
    totalJobsApplied: 0,
    totalJobsViewed: 0,
    totalJobsRejected: 0,
    upcomingInterviews: [],
    recentApplicationHistory: [],
})

const AppliedHistoryTableHeader = ref([
    { text: "Company Name", value: "company.name", sortable: true, },
    { text: "Position", value: "job.title", sortable: true },
    { text: "Date Applied", value: "created_at", sortable: true },
    { text: "Status", value: "status", sortable: true },
    // { text: "", value: "action" },
]);



async function getDashboardInfo() {
    try {
        details.isLoadingDetails = true
        const { data } = await api.userDashboardInfo()
        details.totalJobsApplied = data.totalJobsApplied ?? 0
        details.totalJobsViewed = data.totalJobsViewed ?? 0
        details.totalJobsRejected = data.totalJobsRejected ?? 0
        details.upcomingInterviews = data.upcomingInterviews ?? []
        details.recentApplicationHistory = data.recentApplicationHistory ?? []
        updateChartSeries()
        details.isLoadingDetails = false
    } catch (error) {
        console.log(error);
        details.isLoadingDetails = false

    }
}


const dateRange = ref();

// chart
const chartOptions = {
    chart: {
        type: 'donut',
    },
    dataLabels: {
        enabled: false
    },
    states: {
        hover: {
            enabled: false,
        }
    },
    colors: ['#1EB0B4', '#9e1717'],
    labels: ['IN REVIEW', 'REJECTED'],
    legend: {
        show: false
    },
    tooltip: {
        enabled: true,
    },
    responsive: [{
        breakpoint: 3000,
        options: {
            chart: {
                width: 170
            },
        }
    },
    {
        breakpoint: 480,
        options: {
            chart: {
                width: 100
            },
        }
    }]
}

const chartSeries = ref<any[]>([0, 0])
const chartPercent = reactive({
    total: 0,
    rejected: 0,
})
function updateChartSeries() {
    const totalJobsApplied = details.totalJobsApplied
    const totalJobsRejected = details.totalJobsRejected
    const totalJobsNotRejected = totalJobsApplied - totalJobsRejected
    chartSeries.value = totalJobsApplied !== 0 ? [totalJobsNotRejected, totalJobsRejected] : [1]

    // update percentages
    chartPercent.total = totalJobsApplied !== 0 ? ((totalJobsNotRejected / totalJobsApplied) * 100) : 0
    chartPercent.rejected = totalJobsApplied !== 0 ? ((totalJobsRejected / totalJobsApplied) * 100) : 0
}

</script>

<style lang="css" scoped>
.card {
    /* border-radius: 0px; */
    border: none;
    height: 100%;
}


.colored-card {
    color: #fff;
    font-weight: bold;
}

.colored-card .big-number {
    font-size: 2.57rem;
    font-weight: 600;
}

.total-jobs-card {
    background-color: #4307C2;

}

.interviewed-card {
    background-color: #CE1DA7;
}

.color-green {
    color: #1EB0B4;
}

.color-rejected {
    color: #9e1717;
}
</style>
