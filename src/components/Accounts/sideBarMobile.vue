<template>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
            <div class="offcanvas-title" id="offcanvasNavbarLabel">
                <img src="/images/site_logo.png" width="140" alt="site_logo">
            </div>

            <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="nav nav-pills flex-column">
                <li class="nav-item" v-for="(menu, index) in menus" :key="index">
                    <router-link class="nav-link" :to="{ name: menu.routeName }">
                        <i :class="menu.icon"></i> &nbsp;
                        {{ menu.title }}
                    </router-link>
                </li>

                <hr>
                <li class="nav-item">
                    <router-link class="nav-link" :to="`/${prop.userType}/settings`">
                        <i class="bi bi-gear"></i> &nbsp; Settings
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" :to="`/${prop.userType}/billings`">
                        <i class="bi bi-wallet2"></i> &nbsp; Billings
                    </router-link>
                </li>

                <!-- <li class="nav-item">
                    <router-link class="nav-link" to="/user/help_center">
                        <i class="bi bi-question-circle"></i> &nbsp;
                        Help Center
                    </router-link>
                </li> -->
            </ul>
        </div>
        <div class="offcanvas-footer">
            <hr class="mt-0">
            <div class="">
                <div class=" d-flex justify-content-center">
                    <div class="col-9">
                        <div v-if="profileStore.data" class="row gx-5 justify-content-center align-items-cente xsmall">
                            <div class="col-2">
                                <div class="img-circle" :style="{ 'background-image': `url(${profileStore.avatar})` }">
                                </div>
                            </div>
                            <div class="col-8">
                                <div class="fw-bold text-capitalize">{{ profileStore.data ? profileStore.data.name : ''
                                    }}
                                </div>
                                <div class="fw-lighter">
                                    {{ profileStore.data ? profileStore.data.email : '' }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center text-center  my-3">
                    <div class="col-8">
                        <div class="card rounded-0 theme-color2">
                            <div @click="logout" class="card-body p-1 cursor-pointer">
                                <i class="bi bi-box-arrow-right"></i> Logout
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { userMenu, recruiterMenu } from '@/stores/sideBarMenus'
import { useRoute, useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profileStore';


const profileStore = useProfileStore()
const route = useRoute()
const router = useRouter()

const prop = defineProps(['userType'])
const menus = computed(() => (prop.userType === 'recruiter' ? recruiterMenu : userMenu))





function logout() {
    profileStore.logout()
    // router.replace({ path: '/login' })
    window.location.reload()
}




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
    font-weight: 600;
}

.offcanvas a:hover {
    color: #000;
    text-decoration: none;
}

.nav-item {
    border: none !important;
}


.img-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--theme-color-soft);
    border: 1px solid #e8e5e5;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
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
