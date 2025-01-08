<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRecruiterCommonStore } from './RecruiterCommonStore';
import useFxn from '@/stores/Helpers/useFunctions';
import { computed } from 'vue';

const recruiterCommonStore = useRecruiterCommonStore()
const { jobApplication } = storeToRefs(recruiterCommonStore);


const languages = computed(() => {
    const data = jobApplication.value.details?.user?.profile?.languages;
    if (!data) return '-';

    const formattedLanguages = data
        .replace(/\s/g, '') // Remove spaces
        .split(',') // Split into an array
        .map((string: any) => string.charAt(0).toUpperCase() + string.slice(1)) // Capitalize first letters
        .join(','); // Join back into a comma-separated string

    return formattedLanguages;
});

const skills = computed(() => {
    return jobApplication.value.details?.user?.skills ?? []
})


</script>

<template>
    <div class="fw-bold">Personal Info</div>
    <div class="row mt-1 g-3">
        <div class="col-md-6">
            <div class="text-muted">Full Name</div>
            <div>{{ jobApplication.details?.user?.name }}</div>
        </div>

        <div class="col-md-6">
            <div class="text-muted">Gender</div>
            <div>{{ jobApplication.details?.user?.profile?.gender_id ?? '-' }}</div>
        </div>

        <div class="col-md-6">
            <div class="text-muted">Date of Birth</div>
            <div>
                {{ useFxn.dateDisplay(jobApplication.details?.user?.profile?.dob) }} </div>
        </div>

        <div class="col-md-6">
            <div class="text-muted">Languages</div>
            <div>{{ languages }}</div>
        </div>

        <!-- <div class="col-md-6">
            <div class="text-muted">Address</div>
            <div>{{ applicants.details?.user?.profile?.address ?? '-' }}</div>
        </div> -->
    </div>

    <hr>


    <div class="fw-bold">Professional Info</div>

    <div class="row mt-1 g-3">
        <div class="col-12">
            <div class="text-muted">About Me</div>
            <div v-if="jobApplication.details?.user?.profile?.about_me"
                v-html="jobApplication.details?.user?.profile?.about_me"></div>
            <div v-else>-</div>
        </div>

        <div class="col-md-6">
            <div class="text-muted">Current Job</div>
            <div>Product Designer</div>
        </div>

        <div class="col-md-6">
            <div class="text-muted">Experience in Years</div>
            <div>{{ jobApplication.details?.user?.profile?.years_experience ?? '-' }}</div>
        </div>

        <div class="col-md-6">
            <div class="text-muted">Highest Qualification Held</div>
            <div>Bachelors in Engineering</div>
        </div>

        <div class="col-md-6">
            <div class="text-muted">Skill set</div>
            <span v-for="skill in skills" :key="skill.id" class="skills-tag">
                {{ skill.name }}
            </span>
            <!-- <span v-show="!userSkills.length" class="text-muted2">No skills added</span> -->
        </div>
    </div>


</template>

<style lang="css" scoped>
.skills-tag {
    background-color: var(--bs-light);
    color: var(--theme-color);
    padding: 5px 8px;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 10px;
}
</style>
