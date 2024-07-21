<template>
    <List v-if="recruiterCommonStore.applicants.showing == 'list'" />
    <Details v-else />
</template>

<script lang="ts" setup>
import List from './ApplicantsList.vue'
import Details from './ApplicantsDetails.vue'
import { useRecruiterCommonStore } from './RecruiterCommonStore';
import { useProfileStore } from '@/stores/profileStore';
import { onMounted, } from 'vue';


const recruiterCommonStore = useRecruiterCommonStore()

const profileStore = useProfileStore()
onMounted(() => {
    recruiterCommonStore.applicants.showing = 'list'
    console.log(profileStore.data);
})




</script>
