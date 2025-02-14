<template>
    <div class="row g-3 p-lg-3 bg-light-subtle rounded-3 m-0 pb-5">
        <div class="col-12">
            <div class="row g-3">
                <div class="col-12">
                    <div class="fw-bold text-capitalize">{{ useFxn.greet() }}, Admin</div>
                    <span class="text-muted">Here is your job listings statistic
                        <!-- report from -->
                        <!-- <span class="fw-bold">{{ dateRange ? date_display(dateRange) : '' }}</span>. -->
                    </span>
                    <!-- <span class="float-start float-lg-end">
                        <VueDatePicker class="fw-bold" disable-year-selec :format="date_display" range multi-calendars
                            :clearable="false" :max-date="new Date()" :enable-time-picker="false" auto-apply
                            v-model="dateRange">
                        </VueDatePicker>
                    </span> -->
                </div>
            </div>
        </div>


        <div class="col-lg-4">
            <div class="card colored-card card-color1 shadow-sm">
                <div class="card-body">
                    <div class="big-number">0</div>
                    <div class=" hover-tiltY cursor-pointer">New candidates to review
                        <span class="float-end ">
                            <i class="bi bi-chevron-right  "></i>
                        </span>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card colored-card card-color2 shadow-sm">
                <div class="card-body">
                    <div class="big-number">0</div>
                    <div class=" hover-tiltY cursor-pointer">Schedule for today
                        <span class="float-end">
                            <i class="bi bi-chevron-right"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card colored-card card-color3 shadow-sm">
                <div class="card-body">
                    <div class="big-number">0</div>
                    <div class=" hover-tiltY cursor-pointer">Messages received
                        <span class="float-end">
                            <i class="bi bi-chevron-right"></i>
                        </span>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-lg-8">
            <div class="card shadow-sm border-0">
                <div class=" card-header  bg-transparent fw-bold border-0">
                    Job statistics <br>
                    <small class="text-muted">Showing Job statistic for this week
                        <!-- from {{ dateRange ? date_display(dateRange) : '' }} -->
                    </small>
                </div>
                <div class="card-body">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1"
                                type="button" role="tab" aria-controls="tab1" aria-selected="true">
                                Overview
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2"
                                type="button" role="tab" aria-controls="tab2" aria-selected="false">
                                Jobs View
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3"
                                type="button" role="tab" aria-controls="tab3" aria-selected="false">
                                Jobs Applied
                            </button>
                        </li>
                    </ul>

                    <div class="tab-content" style="min-height: 300px;">
                        <!-- TAB1 -->
                        <div class="tab-pane active py-4" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                            <div class="row g-2">
                                <div class="col-lg-8">
                                    <div class="card h-100 p-0">
                                        <div id="chart" v-if="chartOptionsForJobsThisWeek">
                                            <apexchart type="bar" :options="chartOptionsForJobsThisWeek"
                                                :series="chartOptionsForJobsThisWeek.series">
                                            </apexchart>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="row g-3">
                                        <div class="col-12">
                                            <div class="card info-card-tab1 ">
                                                <div class="card-header bg-transparent fw-bold border-0">
                                                    Jobs Posted
                                                    <span class="float-end float-icon-card color1"
                                                        title="you need to post atleast 5 jobs per-week">
                                                        <i class="bi bi-card-checklist"></i>
                                                    </span>
                                                </div>
                                                <div class="card-body pt-0">
                                                    <div class="big-number">
                                                        {{ jobsThisWeek.numberPosted }}
                                                    </div>
                                                    <div class="text-muted small">This week
                                                        <!-- <span class=" fw-bold"
                                                            :class="jobsThisWeek.numberPosted >= maxNumOfJobsPerweek ? 'text-success' : 'text-danger'">
                                                            {{ ((jobsThisWeek.numberPosted / maxNumOfJobsPerweek) * 100)
                                                            }}
                                                            %
                                                            <i v-if="jobsThisWeek.numberPosted >= maxNumOfJobsPerweek"
                                                                class="bi bi-arrow-up"></i>
                                                            <i v-else class="bi bi-arrow-down"></i>
                                                        </span> -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="card info-card-tab1 ">
                                                <div class="card-header bg-transparent fw-bold border-0">
                                                    Jobs Applied
                                                    <span class="float-end float-icon-card color2">
                                                        <i class="bi bi-journal-text"></i>
                                                    </span>
                                                </div>
                                                <div class="card-body pt-0">
                                                    <div class="big-number">{{ jobsThisWeek.numberApplied }}</div>
                                                    <div class="text-muted small">This week

                                                        <!-- <span class=" fw-bold"
                                                            :class="jobsThisWeek.numberApplied >= maxNumOfJobsPerweek ? 'text-success' : 'text-danger'">
                                                            {{ ((jobsThisWeek.numberApplied / maxNumOfJobsPerweek) *
                                                                100)
                                                            }}
                                                            %
                                                            <i v-if="jobsThisWeek.numberApplied >= maxNumOfJobsPerweek"
                                                                class="bi bi-arrow-up"></i>
                                                            <i v-else class="bi bi-arrow-down"></i>
                                                        </span> -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <!-- TAB2 -->
                        <div class="tab-pane p-3 py-4" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                            Jobs View
                        </div>

                        <!-- TAB3 -->
                        <div class="tab-pane p-3 py-4" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                            Jobs Applied

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="row g-3">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header border-0 bg-transparent fw-bold">
                            Jobs Open
                        </div>
                        <div class="card-body pt-0">
                            <div class="fw-bold" style="font-size: 2.6rem;">{{ totalJobsOpen }}
                                <span class=" fs-6 text-muted fw-lighter">
                                    {{ totalJobsOpen == 1 ? 'job' : 'jobs' }} opened
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card h-100">
                        <div class="card-header border-0 bg-transparent fw-bold">
                            Applicants Summary
                        </div>
                        <div class="card-body pt-0">
                            <div class="fw-bold" style="font-size: 2.6rem;"> {{ totalApplications }}
                                <span class=" fs-6 text-muted fw-lighter">
                                    {{ totalApplications == 1 ? 'applicaton' : 'applicatons' }}
                                </span>
                            </div>

                            <apexchart v-if="(companyProfile.data?.jobs ?? []).length" type="pie"
                                :options="jobAndApplicationsChartOptions" :series="jobAndApplicationsChartSeries">
                            </apexchart>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header fw-bold py-3 bg-transparent ">Recent Applications History</div>
                <div class="card-body min-vh-100">
                </div>
            </div>
        </div> -->
    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { useDateFormat } from '@vueuse/core';
import { computed, onMounted, ref, watch } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'
import { useRecruiterCommonStore } from './RecruiterCommonStore';
import { storeToRefs } from 'pinia';
import useFunctions from '@/stores/Helpers/useFunctions';



const recruiterCommonStore = useRecruiterCommonStore()
const { companyProfile } = storeToRefs(recruiterCommonStore)

const profileStore = useProfileStore()
onMounted(() => {
    console.log(profileStore.data);
    setDateRange()
    getCompanyInformation()
})

async function getCompanyInformation() {
    await recruiterCommonStore.getCompanyInformation()
    updateGraphOnJobApplications()

    jobAndApplicationsChartSeries.value = [(companyProfile.value?.data?.jobs ?? []).length, totalApplications.value]

}

watch(() => recruiterCommonStore.jobPosting.jobListUpdated, () => {
    getCompanyInformation()
})


const maxNumOfJobsPerweek = ref<number>(5)

const totalJobsOpen = computed(() => {
    return (companyProfile.value?.data?.jobs ?? []).filter((x: { deadline: string | Date }) => {
        const deadlineDate = new Date(x.deadline);
        return !isNaN(deadlineDate.getTime()) && deadlineDate >= new Date();
    }).length;
});


const jobsThisWeek = computed(() => {
    const jobsWithinTheWeek = (companyProfile.value?.data?.jobs ?? []).filter((x: { created_at: string | Date }) => {
        const created = new Date(x.created_at);
        if (isNaN(created.getTime())) return false;

        const today = new Date();
        today.setHours(23, 59, 59, 999); // Include all of today

        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as the start of the week
        firstDayOfWeek.setHours(0, 0, 0, 0);


        return created >= firstDayOfWeek && created <= today;

    })
    return {
        list: jobsWithinTheWeek,
        numberPosted: jobsWithinTheWeek.length,
        numberApplied: useFunctions.arrayPropSum(jobsWithinTheWeek, 'total_applied')
    }
});


const totalApplications = computed(() => {
    return useFunctions.arrayPropSum(companyProfile.value?.data?.jobs ?? [], 'total_applied')
})




const dateRange = ref();

const date_display = (date: Date[]) => {
    const dateMe1 = useDateFormat(date[0], 'MMM D YYYY')
    const dateMe2 = useDateFormat(date[1], 'MMM D YYYY')
    return `${dateMe1.value} - ${dateMe2.value}`;
}

function setDateRange() {
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
    dateRange.value = [startDate, endDate];
}


// chart ########################################################
const chartOptionsForJobsThisWeek = ref<any>(null)

const weekDaysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const jobsPostedThisWeekSpread = ref<number[]>([])
const applicationsThisWeekSpread = ref<number[]>([])

const groupThisWeekJobsByWeekday = () => {
    const grouped = Object.values(
        jobsThisWeek.value.list.reduce((acc: any, job: any) => {
            const date = new Date(job.created_at);
            const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });

            if (!acc[weekday]) {
                acc[weekday] = {
                    weekday,
                    total_applied: 0,
                    jobs: 0
                };
            }

            // Sum total_applied for jobs with the same weekday
            acc[weekday].total_applied += job.total_applied;

            // Count the number of jobs for that weekday
            acc[weekday].jobs += 1;

            return acc;
        }, {} as Record<string, { weekday: string; total_applied: number; jobs: number }>)
    );

    const spreadJobs = Array(7).fill(0);
    const spreadApplications = Array(7).fill(0);

    grouped.forEach((job: any) => {
        const index = weekDaysArray.indexOf(job.weekday);
        if (index !== -1) {
            spreadJobs[index] = job.jobs;
            spreadApplications[index] = job.total_applied;
        }
    });

    jobsPostedThisWeekSpread.value = spreadJobs
    applicationsThisWeekSpread.value = spreadApplications
};

function updateGraphOnJobApplications() {
    groupThisWeekJobsByWeekday()

    chartOptionsForJobsThisWeek.value = {
        chart: {
            type: 'bar',
            stacked: true,
        },
        dataLabels: {
            enabled: false
        },
        states: {
            hover: {
                enabled: false,
            }
        },
        zoom: {
            enabled: false
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        xaxis: {
            categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
        },
        yaxis: {
            min: 0,  // Set the minimum value
            max: 20 // Set the maximum value
        },
        colors: ['#FFB836', '#7B61FF'],
        series: [{
            name: 'Job Posted',
            data: jobsPostedThisWeekSpread.value
        }, {
            name: 'Job Applied',
            data: applicationsThisWeekSpread.value
        }],
        legend: {
            show: true
        },
        tooltip: {
            enabled: false,
        },
    }

}




// chart
const jobAndApplicationsChartOptions = {
    chart: {
        type: 'pie',
    },

    dataLabels: {
        enabled: false
    },
    states: {
        hover: {
            enabled: false,
        }
    },

    colors: ['#873A70', '#1EB0B4'],
    labels: ['Jobs', 'Applications'],

    legend: {
        show: true
    },
    tooltip: {
        enabled: true,
    },
    responsive: [{
        breakpoint: 1000,
        options: {
            chart: {
                width: 400
            },
        }
    },
    {
        breakpoint: 480,
        options: {
            chart: {
                width: 250
            },
        }
    }
    ]
}
const jobAndApplicationsChartSeries = ref<number[]>([])

</script>

<style lang="css" scoped>
.colored-card {
    color: #fff;
    font-weight: bold;
    border: none;
}

.colored-card .big-number {
    font-size: 2.57rem;
    font-weight: 600;
}

.card-color1 {
    background-color: #873A70;

}

.card-color2 {
    background-color: #4307C2;
}

.card-color3 {
    background-color: #1EB0B4;
}

.color-green {
    color: #1EB0B4;
}

.color-faint {
    color: #E9EBFD;
}

.info-card-tab1 .float-icon-card {
    /* background-color: #FFB836; */
    color: #ffffff;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 11px;
}

.info-card-tab1 .big-number {
    font-size: 1.6rem;
    font-weight: 600;
}

.info-card-tab1 .color1 {
    background-color: #FFB836;
}

.info-card-tab1 .color2 {
    background-color: #7B61FF;
}
</style>
