
<template>
    <div>
        <nav class="navbar fixed-top navbar-expand-sm navbar-light bg-white shadow-sm border-0">
            <div class="container">
                <span class="navbar-brand fw-bold">{{ route.name ? route.name.split('_')[1] : '' }}</span>
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="d-none d-md-block">
                    <button class="btn btn-outline-secondary rounded-0 me-5 btn-sm">Back to homepage</button>
                    <span class="me-5 cursor-pointer">
                        <i class="bi bi-bell"></i>
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
}

.btn-outline-secondary:hover {
    background-color: #f7f5f5 !important;
}
</style>
