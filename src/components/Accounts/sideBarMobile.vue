<template>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
            <div class="offcanvas-title" id="offcanvasNavbarLabel">
                <img src="@/assets/images/site_logo.png" width="140" alt="site_logo">
            </div>

            <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="nav nav-pills flex-column">
                <li class="nav-item" v-for="i in menu" :key="i">
                    <router-link class="nav-link " :to="{ name: i.routeName }">
                        <i :class="i.icon"></i> &nbsp;
                        {{ i.title }}
                    </router-link>
                </li>

                <hr>
                <li class="nav-item">
                    <router-link class="nav-link  " to="/user/settings">
                        <i class="bi bi-gear"></i> &nbsp;
                        Settings
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/user/help_center">
                        <i class="bi bi-question-circle"></i> &nbsp;
                        Help Center
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script  lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { userMenu } from '@/stores/sideBarMenus'
import { useRoute } from 'vue-router';


const route = useRoute()

const prop = defineProps(['userType'])
const menu = computed(() => {
    let array: any[] = [];
    if (prop.userType == 'user')
        array = userMenu

    return array;
})


const btnX = ref<any>(null)

watch(() => route.path, () => {
    btnX.value.click()
})



</script>

<style scoped>
.offcanvas {
    width: 300px;
    background-color: #F8F8FD;
    overflow-y: auto;
}

.offcanvas ul {
    list-style: none;
    padding: 0;
}

.offcanvas li {
    padding: 2px 0px;
    border-bottom: 1px solid #ccc;
}

.offcanvas a {
    color: #333;
    border-radius: 0px;
}

.offcanvas a:hover {
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
