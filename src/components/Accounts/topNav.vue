<template>
    <div>
        <nav class="navbar fixed-top navbar-expand-sm navbar-light bg-white shadow-sm border-0">
            <div class="container">
                <span class="navbar-brand fw-bold d-none d-md-block">{{
                    route.meta.name }}</span>
                <!-- <span class="d-none d-md-block" v-else>Company (<strong>Nomad</strong>)</span> -->
                <span class="d-md-none xsmall">
                    <img src="/images/site_logo.png" width="100" alt="site_logo">
                    <!-- <span class="mx-2 text-muted2">|</span> {{ route.meta.name }} -->
                </span>
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="d-none d-md-block ">
                    <router-link v-if="route.meta.auth === 'user'" to="/"
                        class="btn btn-outline-secondary rounded-0 me-5 btn-sm">
                        Back to homepage
                    </router-link>

                    <primaryButton @click="openJobPostingModal" v-else :btnClass="'me-5 btn-sm'">
                        <i class="bi bi-plus-lg"></i> Post a Job
                    </primaryButton>

                    <span class="position-relative me-3 cursor-pointer bell dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="bi bi-bell "></i>
                        <span v-if="profileStore.notifications.length"
                            class="position-absolute top-0 start-100 translate-middle p-1 mt-2 bg-danger border border-light rounded-circle">
                            <span class="visually-hidden"></span>
                        </span>

                        <div class="dropdown-menu dropdown-menu-end">
                            <ul v-if="profileStore.notifications.length" class="list-group list-group-flush">
                                <li @click="visitLinkFromNotification(not)" v-for="not in profileStore.notifications"
                                    :key="not.id" class="dropdown-item list-group-item xsmall">
                                    <div class="fw-bold">{{ not.title }}</div>
                                    <div class="fw-lighter truncate text-wrap">
                                        {{ not.message }}
                                    </div>
                                </li>
                            </ul>
                            <div v-else class="p-3 text-center xsmall">
                                No New Notifications
                            </div>
                        </div>

                    </span>
                </div>
            </div>
        </nav>
        <sideBarMobile :userType="prop.userType" />
    </div>
</template>


<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import sideBarMobile from './sideBarMobile.vue';
import { computed } from 'vue';
import { useRecruiterCommonStore } from '@/views/Account/Recruiter/RecruiterCommonStore';
import { useProfileStore } from '@/stores/profileStore';

const recruiterCommonStore = useRecruiterCommonStore()
const route: any = useRoute()
const router = useRouter()

const profileStore = useProfileStore()

const prop = defineProps(['userType'])


async function visitLinkFromNotification(not: any) {
    updateNotifications(not.id)
    if (prop.userType == 'user') {
        if (not.notification_type == 'JOB') {
            router.push({ name: 'user-Applied_Jobs' })
        }
    }

}

function updateNotifications(id: any) {
    profileStore.readNotification(id)
    profileStore.getNotifications(prop.userType)
}



// const pageTitle = computed(() => {
//     const routeArray = route?.name.split('-') ?? [];
//     return routeArray.length ? routeArray[1].split('_') : ''
// })

function openJobPostingModal() {
    recruiterCommonStore.resetJobPostingForm()
    recruiterCommonStore.jobPosting.modal = !recruiterCommonStore.jobPosting.modal
}
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
    width: 230px !important;
}

.dropdown-item:active {
    background-color: transparent;
}
</style>
