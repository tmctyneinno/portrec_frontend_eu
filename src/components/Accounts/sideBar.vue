<template>
    <div class="sidebar">
        <div class="logo-span p-4 ext-center">
            <img src="@/assets/images/site_logo.png" width="140" alt="site_logo">
        </div>

        <ul class="nav nav-pills flex-column mt-3">
            <li class="nav-item" v-for="i in menu" :key="i">
                <router-link class="nav-link" :to="{ name: i.routeName }">
                    <i :class="i.icon"></i> &nbsp;
                    {{ i.title }}
                </router-link>
            </li>

            <hr>
            <li class="nav-item">
                <router-link class="nav-link " to="/user/settings">
                    <i class="bi bi-gear"></i> &nbsp;
                    Settings
                </router-link>
            </li>

            <li class="nav-item">
                <router-link class="nav-link " to="/user/help_center">
                    <i class="bi bi-question-circle"></i> &nbsp;
                    Help Center
                </router-link>
            </li>

        </ul>

        <div v-if="profileStore.data" class="bottom">
            <div class="row justify-content-center align-items-center">
                <div class="col-lg-2">
                    <div class="img-circle"></div>
                </div>
                <div class="col-lg-8 small">
                    <div class="fw-bold text-capitalize">{{ profileStore.data ? profileStore.data.name : '' }}</div>
                    <div class="fw-lighter">
                        {{ profileStore.data ? profileStore.data.email : '' }}
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="bottom bg-secondary-subtle">
            <span class="text-center small">You are offline, please reload page</span>
        </div>
    </div>
</template>

<script  lang="ts" setup>
import { computed } from 'vue';
import { userMenu, recruiterMenu, adminMenu } from '@/stores/sideBarMenus'
import { useProfileStore } from '@/stores/profileStore';

const profileStore = useProfileStore()
const prop = defineProps(['userType'])

// load menu according to usertype in prop
const menu = computed(() => {
    const userType = prop.userType;
    const menuMap: any = {
        user: userMenu,
        recruiter: recruiterMenu,
        admin: adminMenu,
    };

    return menuMap[userType];
});


</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px !important;
    background-color: #fff;
    border-right: 1px solid #cccccc44;
    background-color: #F8F8FD;
    overflow-y: auto;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar li {
    padding: 3px 15px;
    border-bottom: 1px solid #ccc;
}

.sidebar a {
    color: #333;
    border-radius: 0px;
}

.sidebar a:hover {
    color: #000;
    text-decoration: none;
}

.nav-item {
    border: none !important;
}


.active {
    background-color: #E9EBFD !important;
    color: var(--theme-color) !important;
    border-left: 2px solid var(--theme-color);
}

.bottom {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1030;
    /* background-color: var(--bs-danger); */
    width: 250px;
    padding: 10px;
}

.bottom .img-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: rgb(187, 205, 205);
}


@media (max-width: 767px) {
    .sidebar {
        display: none;
    }
}
</style>
