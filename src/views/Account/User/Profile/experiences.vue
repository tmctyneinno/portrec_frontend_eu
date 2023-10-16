

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

                <p v-if="experienceArray().length" class="text-muted2">
                    Add experiences
                </p>

                <!-- Some borders are removed -->
                <ul class="list-group list-group-flush">
                    <li v-for="(exp, index) in experienceArray()" :key="index" class="list-group-item">

                        <div class="row g-3">

                            <!-- <div class="col-lg-2">
                                <img src="" alt="_img" class="">
                            </div> -->
                            <div class="col-lg-12">
                                <div class="fw-bold mb-2">{{ exp.job_title }}
                                    <span @click="editingStore.experienceToEdit = exp" class="float-end"
                                        data-bs-toggle="modal" data-bs-target="#editExperienceModal">
                                        <span class="profile-edit-btn click-ripple">
                                            <i class="bi bi-pencil-square"></i>
                                        </span>
                                    </span>

                                </div>
                                <div class="text-muted mb-2">
                                    <span class="fw-bold">{{ exp.company_name }}</span>
                                    <i class="bi bi-dot"></i>
                                    <span class="text-capitalize">
                                        {{ getWorkType(exp.work_type_id) }}
                                    </span>
                                    <i class="bi bi-dot"></i>
                                    <span v-if="exp.start_date">
                                        {{ new Date(exp.start_date).getFullYear() }} -
                                        {{ exp.end_date ? new Date(exp.end_date).getFullYear() : 'present' }}
                                    </span>
                                    <div>
                                        {{ exp.company_location }}
                                    </div>
                                </div>
                                <div>
                                    {{ exp.description }}
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
import { useEditingProfileStore } from './editingProfileStore'
import { useJobsStore } from '@/stores/jobsStore';


const profileStore = useProfileStore()
const jobsStore = useJobsStore()
const editingStore = useEditingProfileStore()

const experienceArray = () => {
    let arr = []
    if (profileStore.data) {
        if (profileStore.data.experience) {
            arr = profileStore.data.experience;
        }
    }
    return arr;
}


// const isExperiences = computed(() => {
//     let exp: boolean = false
//     if (profileStore.data) {
//         if (profileStore.data.experience)
//             exp = true;
//     }
//     return exp;
// })

const getWorkType = (id: any) => {
    let jobType = jobsStore.types.find((x: any) => x.id == id)
    return jobType ? jobType.name : '';
}

</script>

<style lang="css" scoped></style>
