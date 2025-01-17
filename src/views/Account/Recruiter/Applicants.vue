<template>
    <List v-if="recruiterCommonStore.jobApplication.showing == 'list'" />
    <Details v-else />
</template>

<script lang="ts" setup>
import List from './UserProfile//ApplicantsList.vue'
import Details from './UserProfile/ApplicantsDetails.vue'
import { useRecruiterCommonStore } from './RecruiterCommonStore';

const recruiterCommonStore = useRecruiterCommonStore()
</script>
