<template>
    <div class="sidebar">
        <div class="logo-span p-4 ext-center">
            <img src="@/assets/images/site_logo.png" width="140" alt="site_logo">
        </div>

        <ul class="nav nav-pills flex-column mt-2">
            <li class="nav-item" v-for="i in menu" :key="i">
                <router-link class="nav-link" :to="{ name: i.routeName }">
                    <i :class="i.icon"></i> &nbsp;
                    {{ i.title }}
                </router-link>
            </li>

            <hr class="my-2 mx-3">
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

        <div class="bottom ps-3">
            <div class="row justify-content-center g-2">
                <div class="col-9">
                    <div class="card text-center theme-color2">
                        <div @click="logout" class="card-body p-1 cursor-pointer">
                            <i class="bi bi-box-arrow-right"></i> Logout
                        </div>
                    </div>
                </div>
                <div class="col-9">
                    <div v-if="profileStore.data" class="row gx-5 justify-content-center align-items-cente xsmall">
                        <div class="col-lg-2">
                            <div class="img-circle" :style="{ 'background-image': `url(${profileStore.avatar})` }"></div>
                        </div>
                        <div class="col-lg-8">
                            <div class="fw-bold text-capitalize">{{ profileStore.data ? profileStore.data.name : '' }}</div>
                            <div class="fw-lighter">
                                {{ profileStore.data ? profileStore.data.email : '' }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script  lang="ts" setup>
import { computed } from 'vue';
import { userMenu, recruiterMenu, adminMenu } from '@/stores/sideBarMenus'
import { useProfileStore } from '@/stores/profileStore';
import { useRouter } from 'vue-router';

const profileStore = useProfileStore()
const prop = defineProps(['userType'])
const router = useRouter()

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

function logout() {
    profileStore.logout()
    router.replace({ path: '/login' })
}


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
    padding: 2px 15px;
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
    width: 249px;
    padding: 10px;
    background-color: #F8F8FD;
}

.bottom .img-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--theme-color-soft);
    border: 1px solid #e8e5e5;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}



@media (max-width: 767px) {
    .sidebar {
        display: none;
    }
}
</style>
