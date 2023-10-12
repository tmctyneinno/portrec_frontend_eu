<template>
    <div class="row g-3 p-lg-3">
        <div class="col-12">
            <div class="row">
                <div class="col-lg-10">
                    <div class="fw-bold">Good morning, Jake</div>
                    <span class="text-muted">Here is what’s happening with your job search applications from July 19 - July
                        25.</span>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="row g-3">
                <div class="col-12">
                    <div class="card colored-card total-jobs-card">
                        <div class="card-body">
                            <div>Total Jobs Applied</div>
                            <div class="big-number">45</div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card colored-card interviewed-card">
                        <div class="card-body">
                            <div>Interviewed</div>
                            <div class="big-number">18</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="color-green card-header py-2 pt-3 bg-transparent fw-bold border-0">
                    Jobs Applied
                    Status</div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-lg-5 d-flex justify-content-lg-center align-items-center">
                            <div id="chart ">
                                <apexchart type="donut" :options="chartOptions" :series="chartOptions.series">
                                </apexchart>
                            </div>
                        </div>
                        <div class="col-lg-7 xsmall row justify-content-center align-items-center">
                            <div class="col-6 col-lg-12">
                                <i class="color-green bi bi-square-fill"></i>
                                <span class="fw-bold color-green mx-1">60%</span>
                                <span class="text-muted">Unsuitable</span>
                            </div>
                            <div class="col-6 col-lg-12">
                                <i class="color-faint bi bi-square-fill"></i>
                                <span class="fw-bold color-green mx-1">40%</span>
                                <span class="text-muted">Interviewed</span>
                            </div>
                        </div>


                    </div>
                    <div class="col-12  fw-bold theme-color mt-3 cursor-pointer">
                        View All Applications <i class="bi bi-arrow-right"></i>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="card">
                <div class="card-header py-2 fw-bold bg-transparent">Upcomming Interviews</div>
                <div class="card-header py-2  bg-transparent shadow-sm">
                    Today, 26 November
                    <span class="float-end">
                        <i class="bi bi-chevron-left"></i>
                        <i class="bi bi-chevron-right"></i>
                    </span>
                </div>
                <div class="card-body row gy-3">

                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="card-header fw-bold py-3 bg-transparent ">Recent Applications History</div>
                <div class="card-body min-vh-100"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { onMounted } from 'vue';

const profileStore = useProfileStore()

onMounted(() => {
    console.log(profileStore.data);

})





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
    colors: ['#1EB0B4', '#E9EBFD'],
    series: [40, 60],
    // labels: ['Apples', 'Oranges', 'Bananas', 'Grapes', 'Mangoes'],
    legend: {
        show: false
    },
    tooltip: {
        enabled: false,
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

</script>

<style lang="css" scoped>
.card {
    border-radius: 0px;
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

.color-faint {
    color: #E9EBFD;
}
</style>
