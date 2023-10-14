<template>
    <div>
        <side-bar userType="user" />
        <top-nav userType="user" />

        <div class="children-pages">
            <div class="container p-3">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import sideBar from '@/components/Accounts/sideBar.vue'
import topNav from '@/components/Accounts/topNav.vue'
import { useProfileStore } from '@/stores/profileStore';
import { onMounted } from 'vue';
import api from '@/stores/Helpers/axios'

const profileStore = useProfileStore()

onMounted(() => {
    getUserProfile()
})

async function getUserProfile() {
    let { data } = await api.userProfile()
    if (data.status === 201) {
        profileStore.data = data.body
        profileStore.avatar = data.body.profile_pic ? data.body.profile_pic.image : ''
        console.log(profileStore.data);

    }
}
</script>

<style  scoped>
.children-pages {
    padding-top: 70px;
    padding-bottom: 100px;
}

@media (min-width: 767px) {
    .children-pages {
        margin-left: 250px;
    }
}
</style>