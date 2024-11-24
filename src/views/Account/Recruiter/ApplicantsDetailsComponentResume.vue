<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRecruiterCommonStore } from './RecruiterCommonStore';
import { computed } from 'vue';

const recruiterCommonStore = useRecruiterCommonStore()
const { applicants } = storeToRefs(recruiterCommonStore);

const userResume = computed(() => {
    return applicants.value.details?.resume?.resume_url ?? null
})
</script>

<template>
    <div>
        <div class="d-flex justify-content-center mt-5">
            <a :href="userResume" target="_blank" class="btn btn-primary-outline" download>
                <i class="bi bi-file-earmark"></i> Download Resume
            </a>
        </div>
        <!-- <img src="/images/resume_sample.png" alt="resume"> -->

    </div>
</template>

<style lang="css" scoped></style>
