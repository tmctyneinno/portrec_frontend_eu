<template>
    <div class="sidebar">
        <div class="logo-span p-4 ext-center">
            <img src="/images/site_logo.png" width="140" alt="site_logo">
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
                <router-link class="nav-link " :to="`/${prop.userType}/settings`">
                    <i class="bi bi-gear"></i> &nbsp;
                    Settings
                </router-link>
            </li>

            <!-- <li class="nav-item">
                <router-link class="nav-link" :to="`/${prop.userType}/help-center`">
                    <i class="bi bi-question-circle"></i> &nbsp;
                    Help Center
                </router-link>
            </li> -->

        </ul>

        <div class="bottom">
            <div class="row justify-content-center g-2">
                <div class="dropdown col-11">
                    <div v-if="profileStore.data" class="profile-card dropdown-toggle" cid="triggerId"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div class="avatar" :style="{ 'background-image': `url(${profileStore.avatar})` }"></div>
                        <div class="details">
                            <p class="name m-0 xsmall fw-bolder">
                                {{ profileStore.data?.name ?? '' }}
                            </p>
                            <p class="email m-0 xsmall">
                                {{ profileStore.data?.email ?? '' }}
                            </p>
                        </div>
                        <i class="ms-2 bi bi-chevron-down"></i>
                    </div>

                    <div class="dropdown-menu dropdown-menu-end border-0" aria-labelledby="triggerId">
                        <a @click="logout" class="dropdown-item text-danger bg-transparent" href="#">
                            <i class="bi bi-box-arrow-right"></i> Logout
                        </a>

                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { userMenu, recruiterMenu } from '@/stores/sideBarMenus'
import { useProfileStore } from '@/stores/profileStore';
// import { useRouter } from 'vue-router';

const profileStore = useProfileStore()
const prop = defineProps(['userType'])
// const router = useRouter()

// ############# load menu according to usertype in prop ##################
const menu = computed(() => {
    const menuObject: any = {
        user: userMenu,
        recruiter: recruiterMenu,
    };

    return menuObject[prop.userType];
});

function logout() {
    profileStore.logout()
    // router.replace({ path: '/login' })
    window.location.reload()
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
    font-weight: 600;
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
    padding-bottom: 20px;
    background-color: #F8F8FD;
}

@media (max-width: 767px) {
    .sidebar {
        display: none;
    }
}


.profile-card {
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 8px;
    background-color: #fff;
    cursor: pointer;
}

.profile-card:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* background-color: var(--theme-color-soft); */
}

.profile-card .avatar {
    width: 32px;
    height: 32px;
    background-color: #d6d6d6;
    border-radius: 50%;
    background-color: var(--theme-color-soft);
    border: 1px solid #e8e5e5;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    margin-right: 15px;
}

.profile-card .details {
    display: flex;
    flex-direction: column;
}
</style>
