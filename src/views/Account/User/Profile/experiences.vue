

<template>
    <div class="col-12">
        <div class="card rounded-0">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                Experiences
                <span class="float-end" data-bs-toggle="modal" data-bs-target="#addExperienceModal">
                    <span class="profile-edit-btn click-ripple">
                        <i class="bi bi-plus-lg"></i>
                    </span>
                </span>
            </div>
            <div class="card-body small">

                <p v-if="!isExperiences" class="text-muted2">
                    Add experiences
                </p>

                <!-- Some borders are removed -->
                <ul class="list-group list-group-flush">
                    <li v-for="({ company_name, company_location, description, job_title, start_date, end_date, work_type_id }, index) in profileStore.data.experience"
                        :key="index" class="list-group-item">

                        <div class="row g-3">

                            <!-- <div class="col-lg-2">
                                <img src="" alt="_img" class="">
                            </div> -->
                            <div class="col-lg-12">
                                <div class="fw-bold mb-2">{{ job_title }}
                                    <span class="float-end" data-bs-toggle="modal" data-bs-target="#editExperienceModal">
                                        <span class="profile-edit-btn click-ripple">
                                            <i class="bi bi-pencil-square"></i>
                                        </span>
                                    </span>

                                </div>
                                <div class="text-muted mb-2">
                                    <span class="fw-bold">{{ company_name }}</span>
                                    <i class="bi bi-dot"></i>
                                    <span class="text-capitalize">
                                        {{ getWorkType(work_type_id) }}
                                    </span>
                                    <i class="bi bi-dot"></i>
                                    <span v-if="start_date && end_date">
                                        {{ new Date(start_date).getFullYear() }} - {{ new Date(end_date).getFullYear() }}
                                    </span>
                                    <div>
                                        {{ company_location }}
                                    </div>
                                </div>
                                <div>
                                    {{ description }}
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { useJobsStore } from '@/stores/jobsStore';
import { computed } from 'vue';


const profileStore = useProfileStore()
const jobsStore = useJobsStore()

const isExperiences = computed(() => {
    let exp: boolean = false
    if (profileStore.data) {
        if (profileStore.data.experience)
            exp = true;
    }
    return exp;
})

const getWorkType = (id: any) => {
    return jobsStore.types.find((x: any) => x.id == id).name;
}

</script>

<style lang="css" scoped></style>
