
<template>
    <div>
        <nav class="navbar fixed-top navbar-expand-sm navbar-light bg-white shadow-sm border-0">
            <div class="container">
                <span class="navbar-brand fw-bold d-none d-md-block">{{ route.name?.split('_')[1] ?? '' }}</span>
                <span class="d-md-none xsmall">
                    <img src="@/assets/images/site_logo.png" width="100" alt="site_logo">
                    <span class="mx-2 text-muted2">|</span> {{ route.name?.split('_')[1] ?? '' }}
                </span>
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="d-none d-md-block ">
                    <!-- <router-link to="/" class="btn btn-outline-secondary rounded-0 me-5 btn-sm">Back to
                        homepage</router-link> -->

                    <span class="position-relative me-3 cursor-pointer bell dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="bi bi-bell "></i>
                        <span
                            class="position-absolute top-0 start-100 translate-middle p-1 mt-2 bg-danger border border-light rounded-circle">
                            <span class="visually-hidden"></span>
                        </span>

                        <div class="dropdown-menu dropdown-menu-end">
                            <ul class="list-group list-group-flush  ">
                                <li class=" dropdown-item list-group-item">Item</li>
                                <li class=" dropdown-item list-group-item">Item</li>
                                <li class=" dropdown-item list-group-item">Item</li>

                            </ul>
                        </div>
                    </span>
                </div>
            </div>
        </nav>
        <sideBarMobile :userType="userType" />
    </div>
</template>


<script lang="ts" setup>
import { useRoute } from 'vue-router'
import sideBarMobile from './sideBarMobile.vue';

const route: any = useRoute()

defineProps(['userType'])
</script>

<style scoped>
.navbar {
    border-bottom: 1px solid #ccc;
    padding-block: 13px;
    padding-inline: 13px;
}

@media (min-width: 767px) {
    .navbar {
        margin-left: 250px;
    }
}

.btn-outline-secondary {
    color: var(--theme-color);
    font-weight: bolder;
    border-color: #ccc;
}

.btn-outline-secondary:hover {
    background-color: #f7f5f5 !important;
}

.bell {
    padding-left: 6px;
    padding-top: 6px;
}

.dropdown-toggle::after {
    content: none !important;
}

.dropdown-menu {
    border-radius: 0px;
}
</style>
