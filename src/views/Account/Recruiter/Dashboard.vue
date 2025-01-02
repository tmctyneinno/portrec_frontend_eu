<template>
    <div class="row g-3 p-lg-3 bg-light-subtle rounded-3 m-0 pb-5">
        <div class="col-12">
            <div class="row g-3">
                <div class="col-12">
                    <div class="fw-bold text-capitalize">{{ useFxn.greet() }}, Admin</div>
                    <span class="text-muted">Here is your job listings statistic report from
                        <span class="fw-bold">{{ dateRange ? date_display(dateRange) : '' }}</span>.
                    </span>
                    <span class="float-start float-lg-end">
                        <VueDatePicker class="fw-bold" disable-year-select :format="date_display" range multi-calendars
                            :clearable="false" :max-date="new Date()" :enable-time-picker="false" auto-apply
                            v-model="dateRange">
                        </VueDatePicker>
                    </span>
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
                    <small class="text-muted">Showing Job statistic from
                        {{ dateRange ? date_display(dateRange) : '' }}</small>
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
                                        <div id="chart">
                                            <apexchart type="bar" :options="chartOptions_1"
                                                :series="chartOptions_1.series">
                                            </apexchart>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="row g-3">
                                        <div class="col-12">
                                            <div class="card info-card-tab1 ">
                                                <div class="card-header bg-transparent fw-bold border-0">
                                                    Job Views
                                                    <span class="float-end float-icon-card color1">
                                                        <i class="bi bi-eye"></i>
                                                    </span>
                                                </div>
                                                <div class="card-body pt-0">
                                                    <div class="big-number">0</div>
                                                    <div class="text-muted small">This week

                                                        <span class="text-success fw-bold">
                                                            0% <i class="bi bi-arrow-up"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="card info-card-tab1 ">
                                                <div class="card-header bg-transparent fw-bold border-0">
                                                    Job Applied
                                                    <span class="float-end float-icon-card color2">
                                                        <i class="bi bi-journal-text"></i>
                                                    </span>
                                                </div>
                                                <div class="card-body pt-0">
                                                    <div class="big-number">0</div>
                                                    <div class="text-muted small">This week

                                                        <span class="text-danger fw-bold">
                                                            0.0% <i class="bi bi-arrow-down"></i>
                                                        </span>
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
                            <div class="fw-bold" style="font-size: 2.6rem;">0
                                <span class=" fs-6 text-muted fw-lighter">Jobs Opened</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <div class="card-header border-0 bg-transparent fw-bold">
                            Applicants Summary
                        </div>
                        <div class="card-body pt-0">
                            <div class="fw-bold" style="font-size: 2.6rem;">0
                                <span class=" fs-6 text-muted fw-lighter">Applicants</span>
                            </div>

                            <apexchart type="bar" :options="chartOptions_2" :series="chartOptions_2.series">
                            </apexchart>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header fw-bold py-3 bg-transparent ">Recent Applications History</div>
                <div class="card-body min-vh-100">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { useDateFormat } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'

const profileStore = useProfileStore()
onMounted(() => {
    console.log(profileStore.data);
    setDateRange()
    console.log(dateRange.value);

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


// chart
const chartOptions_1 = {
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
        categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    },
    colors: ['#FFB836', '#7B61FF'],
    series: [{
        name: 'Job Viewed',
        data: [44, 55, 41, 67, 22, 43, 30]
    }, {
        name: 'Job Applied',
        data: [13, 23, 20, 8, 13, 27, 70]
    }],
    legend: {
        show: true
    },
    tooltip: {
        enabled: false,
    },
}

// chart
const chartOptions_2 = {
    chart: {
        type: 'bar',
        stacked: true,
    },
    plotOptions: {
        bar: {
            horizontal: true,
            dataLabels: {
                total: {
                    enabled: false,
                    offsetX: 0,
                    style: {
                        fontSize: '13px',
                        fontWeight: 900
                    }
                }
            }
        },
    },
    dataLabels: {
        enabled: false
    },
    states: {
        hover: {
            enabled: false,
        }
    },
    xaxis: {
        categories: ['Mon']
    },
    colors: ['#7B61FF'],
    series: [{
        name: 'Marine Sprite',
        data: [44, 55, 41, 37, 22, 43, 21]
    },],
    legend: {
        show: false
    },
    tooltip: {
        enabled: true,
    },
}

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
