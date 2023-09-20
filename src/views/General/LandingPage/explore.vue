
<template>
    <div class="section-panel">
        <div class="container">
            <div class="col-12">
                <div class="row">
                    <div class="col-8">
                        <div class="section-title">Explore by <span class="theme-color fw-bold">category</span> </div>
                    </div>
                    <div class="col-4 d-flex justify-content-end align-items-center ">
                        <span class="hover-tiltX float-end theme-color cursor-pointer fw-bolder section-right">
                            show all jobs <i class="bi bi-arrow-right-short"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <div class="row g-4">
                    <div v-for="list in  dataList " :key="list" class="col-md-4 col-lg-3">
                        <div class="card explore-card p-3 py-lg-4 hover-tiltY">
                            <div class="card-icon theme-color"><i class="bi" :class="list.icon"></i> </div>
                            <h3 class="card-title fw-light my-2">{{ list.title }}</h3>
                            <div class="fw-bolder">{{ list.count }} jobs available <i class="bi bi-arrow-right"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>

const dataList: any = [
    {
        icon: 'bi-vector-pen',
        title: 'Design',
        count: 345,
    },
    {
        icon: 'bi-bar-chart',
        title: 'Sales',
        count: 762,
    },
    {
        icon: 'bi-megaphone',
        title: 'Marketing',
        count: 555,
    },
    {
        icon: 'bi-currency-exchange',
        title: 'Finance',
        count: 110,
    },
    {
        icon: 'bi-laptop',
        title: 'Technology',
        count: 440,
    },
    {
        icon: 'bi-code-slash',
        title: 'Engineering',
        count: 100,
    },
    {
        icon: 'bi-briefcase',
        title: 'Business',
        count: 888,
    },
    {
        icon: 'bi-people',
        title: 'Human Resource',
        count: 345,
    },
]

</script>

<style scoped>
.card-icon {
    font-size: 2.51rem;
}

.explore-card {
    border-radius: 0%;
    cursor: pointer;
}

.explore-card:hover {
    background-color: var(--theme-color);
    color: #fff;
}

.explore-card:hover .bi {
    color: #fff !important;
}


@media (max-width: 767px) {

    .explore-text,
    .explore-text .theme-color {
        font-size: 20px;
    }

    /* .card-icon {
        font-size: 1.7rem;
    } */

}
</style>
