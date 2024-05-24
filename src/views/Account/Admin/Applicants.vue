<template>
    <List v-if="adminCommonStore.applicants.showing == 'list'" />
    <Details v-else />
</template>

<script lang="ts" setup>
import List from './ApplicantsList.vue'
import Details from './ApplicantsDetails.vue'
import { useAdminCommonStore } from './AdminCommonStore';
import { useProfileStore } from '@/stores/profileStore';
import { onMounted, } from 'vue';


const adminCommonStore = useAdminCommonStore()

const profileStore = useProfileStore()
onMounted(() => {
    adminCommonStore.applicants.showing = 'list'
    console.log(profileStore.data);
})




</script>
