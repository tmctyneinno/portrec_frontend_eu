<template>
    <div>
        <side-bar userType="recruiter" />
        <top-nav userType="recruiter" />

        <div class="children-pages">
            <div class="container p-3">
                <router-view></router-view>
            </div>
        </div>
    </div>

    <jobPosttingModal />
</template>

<script lang="ts" setup>
import sideBar from '@/components/Accounts/sideBar.vue'
import topNav from '@/components/Accounts/topNav.vue'
import { useProfileStore } from '@/stores/profileStore';
import { onMounted } from 'vue';
import jobPosttingModal from './JobPosting/jobPostingModal.vue'
import { useRecruiterCommonStore } from './RecruiterCommonStore';

const profileStore = useProfileStore()
const recruiterStore = useRecruiterCommonStore()

onMounted(async () => {
    await profileStore.getProfile('recruiter')
    await recruiterStore.loadJobPostingDropdowns()
    console.log(recruiterStore.jobPostingDropdowns);

})

</script>

<style scoped>
.children-pages {
    padding-top: 70px;
    padding-bottom: 100px;
    /* background-color: #f4f2ee87; */
}

@media (min-width: 767px) {
    .children-pages {
        margin-left: 250px;
    }
}
</style>