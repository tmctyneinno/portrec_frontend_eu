<template>
    <div class="row g-3 m-0 pb-5">
        <div class="col-12">
            <div class="col-lg-12">
                <div>
                    <div class="fw-bold text-capitalize fs-5">Find the Right Talent for Your Project</div>
                    <div class="text-muted small">Find the perfect professional from our pool of experts. Browse by
                        category, skill, or experience level to connect with the right fit for your needs.
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12">
            Search box....
        </div>
        <div class="col-12 bg-light-subtle min-vh-100 p-3">
            <div class="row g-3">
                <userProfileCard v-for="user in userProfiles" :user-profile="user" />
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { useDateFormat } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'
import { useRecruiterCommonStore } from './RecruiterCommonStore';
import api from '@/stores/Helpers/axios';
import type { ServerOptions } from 'vue3-easy-data-table';
import userProfileCard from '@/components/userProfileCard.vue';


const recruiterCommonStore = useRecruiterCommonStore()

const profileStore = useProfileStore()
onMounted(() => {
    console.log(profileStore.data);
    // getJobsList()
})



const userProfiles = ref([
    {
        id: 1,
        name: 'Mary Jones',
        title: 'Remote freelance designer',
        status: 'recommended',
        skills: ['illustration', 'design', 'design systems',],
        experience: 3,
        star: 4,
        location: 'remote',
        avalaiblity: 'remote',

    },
    {
        id: 1,
        name: 'Samuel Cooner',
        title: 'Remote Software Enginner',
        status: 'promoted',
        skills: ['illustration', 'design', 'design systems'],
        experience: 7,
        star: 3,
        location: 'remote',
        avalaiblity: 'remote',

    }
])









</script>

<style lang="css" scoped></style>
