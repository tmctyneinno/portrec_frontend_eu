<template>
    <div class="sidebar">
        <div class="logo-span p-4 ext-center">
            <img src="@/assets/images/site_logo.png" width="140" alt="site_logo">
        </div>

        <ul class="nav nav-pills flex-column">
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
    </div>
</template>

<script  lang="ts" setup>
import { computed } from 'vue';
import { userMenu } from '@/stores/sideBarMenus'
const menu = computed(() => {
    let array: any[] = [];
    if (prop.userType == 'user')
        array = userMenu

    return array;
})

const prop = defineProps(['userType'])

</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
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
    padding: 5px 15px;
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
    border-left: 1px solid var(--theme-color);
}

@media (max-width: 767px) {
    .sidebar {
        display: none;
    }
}
</style>
