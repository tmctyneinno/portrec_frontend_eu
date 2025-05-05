<template>
    <div class="row g-3 m-0 pb-5">
        <div class="col-12">
            <div class="row g-3">
                <div class="col-lg-8">
                    <div>
                        <div class="fw-bold text-capitalize fs-5">{{ currentJobTitle }}</div>
                        <div class="d-block mb-2 position-relative">
                            <div v-if="currentJob.company?.name" class="slide-info text-muted small text-capitalize">
                                <span class="text-muted xsmall">Posted by</span>
                                {{ currentJob.company?.name ?? '' }}
                                {{ `${currentJob.company?.country ?? ''}` }}
                                <i class="bi bi-dot"></i>
                                <i class="bi bi-briefcase ms-2"></i>
                                {{ currentJob.job_type?.name ?? '' }}
                            </div>
                            <!-- <div class="xsmall fst-italic text-success-emphasis">
                                Posted <span class="fw-bolder">{{ useFunctions.timeAgo(currentJob.created_at) }}</span>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1"
                        type="button" role="tab" aria-controls="tab1" aria-selected="true">Applicants</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button"
                        role="tab" aria-controls="tab2" aria-selected="false">Job Details</button>
                </li>
                <!-- <li class="nav-item" role="presentation">
                    <button class="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3" type="button"
                        role="tab" aria-controls="tab3" aria-selected="false">Analytics</button>
                </li> -->
            </ul>

            <div class="tab-content">
                <div class="tab-pane active py-2" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                    <div class="col-12">
                        <div class="my-4 col-md-4">
                            <input v-model="searchTerm" type="text" class="form-control"
                                placeholder="search applicant..">
                        </div>
                        <EasyDataTable class="recruiter-applicants-table" :loading="loadingTable" show-index alternating
                            :headers="tableHeader" :items="items" buttons-pagination
                            v-model:server-options="serverOptions" :server-items-length="total" @click-row="">

                            <template #empty-message>
                                <span>No applicants</span>
                            </template>


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

                            <!-- <template #item-status="item">
                    <span class="category-tag text-white"
                        :style="`background-color: ${templateStore.applicationStatusColor(item.status)}`">
                        {{ item.status }}
                    </span>
                </template> -->

                            <!-- <template #item-action="item">
                    <button @click="goToApplicantsDetails(item)"
                        class="btn btn-sm btn-primary-outline  border-0 rounded-5  text-decoration-none btn-sm p-1 px-2 ">
                        <i class="bi bi-eye"></i>
                    </button>
                </template> -->

                        </EasyDataTable>
                    </div>
                </div>

                <div class="tab-pane  py-2" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                    <div class="container">
                        <JobDescriptionInfoSkeleton v-if="loadingDetails" />
                        <JobDescriptionInfoComponent :current-job="currentJob" v-else />
                    </div>
                </div>

                <div class="tab-pane  py-4" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                    <div class="container-flui">
                        <div>
                            <span class="fw-bold">Budget Spent So Far:</span> <span>50,021.31</span>
                        </div>
                        <div class="row g-3 mt-3">
                            <div class="col-md-8">
                                <div class="row g-2">
                                    <div v-for="({ title, icon, iconBg, largeNumber, smallTxt, percentage }, index) in analyticsFirstForCards"
                                        :key="index" class="col-md-3">
                                        <div class="card bg-light h-100 ">
                                            <div class="card-header bg-transparent fw-bold text-muted border-0 small">
                                                {{ title }}

                                                <i class="float-end  round-icon bi" :class="icon"
                                                    :style="{ backgroundColor: iconBg }"></i>
                                            </div>
                                            <div class="card-body">
                                                <span class="fs-5 fw-bold">
                                                    {{ useFxn.addCommas(largeNumber) }}
                                                </span>
                                                <span
                                                    :class="parseFloat(percentage) < 1 ? 'text-danger' : 'text-success'"
                                                    class="ms-1 small">{{ percentage }}%
                                                    <i v-if="parseFloat(percentage) >= 1"
                                                        class="bi bi-caret-up-fill"></i>
                                                    <i v-else class="bi bi-caret-down-fill"></i>
                                                </span>

                                                <div class="text-muted xsmall">
                                                    {{ smallTxt }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="card h-100">
                                            <div class="card-header fw-bold text-muted bg-transparent border-0">
                                                Job Listing View stats
                                                <span class="float-end">
                                                    <select class="form-select form-select-sm" name="" id="">
                                                        <option selected>Last 7 days</option>
                                                        <option selected>Last 30 days</option>
                                                        <option value="">Last month</option>
                                                        <option value="">Last year</option>
                                                    </select>
                                                </span>
                                            </div>
                                            <div class="card-body">
                                                <div id="chart ">
                                                    <apexchart type="line" :options="jobListingChartOptions"
                                                        :series="jobListingChartSeries">
                                                    </apexchart>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="row g-3">
                                    <div class="col-12">
                                        <div class="card bg-light h-100">
                                            <div class="card-header fw-bold text-muted bg-transparent border-0">
                                                Traffic Channel</div>
                                            <div class="card-body">
                                                <div id="chart ">
                                                    <apexchart type="donut" :options="trafficChannelChartOptions"
                                                        :series="trafficChannelChartSeries">
                                                    </apexchart>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="card h-100">
                                            <div class="card-header fw-bold text-muted bg-transparent border-0">
                                                Visitors by country
                                            </div>
                                            <div class="card-body">
                                                <!-- Some borders are removed -->
                                                <ul class="list-group list-group-flush">
                                                    <li v-for="({ country, number }, index) in visitorsByCountry"
                                                        :key="index" class="list-group-item">
                                                        <i class="bi bi-square-fill text-muted fs-5"></i>
                                                        {{ country }}
                                                        <span class="float-end fw-bold">
                                                            {{ useFxn.addCommas(number) }}
                                                        </span>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'
import { useRecruiterCommonStore } from '../RecruiterCommonStore';
import api from '@/stores/Helpers/axios';
import type { ServerOptions } from 'vue3-easy-data-table';
import { useRoute, useRouter } from 'vue-router';
import JobDescriptionInfoComponent from '@/views/General/JobDescription/JobDescriptionInfoComponent.vue';
import JobDescriptionInfoSkeleton from '@/components/skeletonLoaders/jobDescriptionInfoSkeleton.vue';
import useFunctions from '@/stores/Helpers/useFunctions';

const recruiterCommonStore = useRecruiterCommonStore()

onMounted(async () => {
    if (!route.query?.dd) router.back()
    else {
        currentJobTitle.value = route.query.job
        await getJobApplicants()
        currentJobQuery(route.query.dd)
    }

})


const route = useRoute()
const router = useRouter()
const currentJob = ref<any>([])
const currentJobTitle = ref<any>('')
const loadingDetails = ref<boolean>(false)

async function currentJobQuery(id: any) {
    loadingDetails.value = true
    try {
        const resp = await api.jobDetails(id)
        if (resp.status == 200)
            currentJob.value = resp?.data?.body ?? []
    } catch (error) {
        console.log(error);
    }
    finally {
        loadingDetails.value = false
    }
}


const dateRange = ref();

const date_display = (date: Date[]) => {
    const dateMe1 = useDateFormat(date[0], 'MMM D, YYYY')
    const dateMe2 = useDateFormat(date[1], 'MMM D, YYYY')
    return `${dateMe1.value} - ${dateMe2.value}`;
}


// table

const searchTerm = ref("");
const total = ref(0)
const items = ref([])
const loadingTable = ref(true)
const serverOptions = ref<ServerOptions | any>({
    page: 1,
    rowsPerPage: 15,
    // sortType: 'desc',
    // sortBy: ''
});

async function getJobApplicants() {
    loadingTable.value = true

    try {
        const obj = {
            page: serverOptions.value.page,
            rowsPerPage: serverOptions.value.rowsPerPage,
            search: searchTerm.value,
            job_opening_id: route.query.dd,
        }
        const resp: any = await api.recruiterJobApplicationsList(obj)
        const data = resp.data.body
        total.value = resp.total
        items.value = data.data
        loadingTable.value = false
        // console.log(resp, 'applications');
    } catch (error) {
        console.log(error);

    }

}

watch(() => recruiterCommonStore.jobPosting.jobListUpdated, () => {
    getJobApplicants()
})

watch(serverOptions, () => { getJobApplicants(); }, { deep: true });
watch(dateRange, () => { serverOptions.value.page = 1; getJobApplicants(); }, { deep: true });

const searchOnInput = useFxn.debounce(getJobApplicants, 300);
watch(searchTerm, () => { serverOptions.value.page = 1; searchOnInput(); }, { deep: true });





// const itemsSelected = ref([]);
const tableHeader = ref([
    { text: "Full Name", value: "user.name", sortable: true, },
    // { text: "Score", value: "score", sortable: true },
    { text: "Hiring Stage", value: "status", sortable: true },
    { text: "Applied Date", value: "created_at", sortable: true },
    { text: "Job Role", value: "job.title", sortable: true },
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
                    getJobApplicants()
                }
            } catch (error) {
                // 
            }
        }


    })

}






// ANALYTICS ##########################################

const analyticsFirstForCards: { title: string, icon: string, iconBg: string, largeNumber: string, percentage: string, smallTxt: string }[] = [
    { title: 'Total Views', icon: 'bi-eye', iconBg: '#873A70', largeNumber: '23564', percentage: '6.4', smallTxt: 'vs last day' },
    { title: 'Total Applied', icon: 'bi-briefcase', iconBg: '#7B61FF', largeNumber: '132', percentage: '0.4', smallTxt: 'vs last day' },
    { title: 'Impressions', icon: 'bi-activity', iconBg: '#444645', largeNumber: '1099', percentage: '0.4', smallTxt: 'vs last day' },
    { title: 'Clicks', icon: 'bi-hand-index-thumb', iconBg: '#E63468', largeNumber: '77', percentage: '0.4', smallTxt: 'vs last day' },
]



// chart1

const jobListingChartSeries = ref<any[]>([{
    name: 'Views',
    data: [4, 3, 10, 9, 9, 19, 22, 9, 12, 10, 11]
}])


const jobListingChartOptions = {
    chart: {
        height: 350,
        type: 'line',
        zoom: { enabled: false }
    },
    stroke: {
        width: 2,
        curve: 'smooth'
    },
    colors: ['#ff3400'],
    xaxis: {
        type: 'datetime',
        categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001',],
        tickAmount: 10,
        labels: {
            formatter: function (value: any, timestamp: any, opts: any) {
                return opts.dateFormatter(new Date(timestamp), 'dd MMM')
            }
        }
    },
    fill: {
        type: 'solid',
        // gradient: {
        //     shade: 'dark',
        //     gradientToColors: ['#FDD835', '#1EB0B4'],
        //     shadeIntensity: 1,
        //     type: 'horizontal',
        // },
    },

    // dataLabels: {
    //     enabled: false
    // },
    states: {
        hover: {
            enabled: false,
        }
    },
    legend: {
        show: false
    },
    tooltip: {
        enabled: true,
    },
}







// chart2
const trafficChannelChartSeries = ref<any[]>([48, 50, 38, 40])
const trafficChannelChartOptions = {
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
    colors: ['#873A70', '#E63468', '#FFB836', '#7B61FF'],
    labels: ['Direct', 'Social', 'Organic', 'Other'],
    legend: {
        show: true
    },
    tooltip: {
        enabled: true,
    },
    // responsive: [{
    //     breakpoint: 3000,
    //     options: {
    //         chart: {
    //             width: 170
    //         },
    //     }
    // },
    // {
    //     breakpoint: 480,
    //     options: {
    //         chart: {
    //             width: 100
    //         },
    //     }
    // }]
}



const visitorsByCountry: { country: string, number: number }[] = [
    { country: 'USA', number: 3200 },
    { country: 'France', number: 234 },
    { country: 'Italy', number: 2987 },
    { country: 'Germany', number: 2987 },
    { country: 'Japan', number: 4758 },
    { country: 'Netherlands', number: 4758 },
]

</script>

<style lang="css" scoped>
.round-icon {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 9px;
}
</style>
