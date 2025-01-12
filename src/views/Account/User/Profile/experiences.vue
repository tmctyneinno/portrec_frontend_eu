<template>
    <div class="col-12">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                Experiences
                <span class="float-end" data-bs-toggle="modal" data-bs-target="#addExperienceModal">
                    <span class="profile-edit-btn small rounded-1">
                        <i class="bi bi-plus-lg"></i>
                    </span>
                </span>
            </div>
            <div class="card-body small">

                <p v-if="!experienceArray.length" class="text-muted2">
                    Add experiences
                </p>

                <ul v-else class="list-group list-group-flush">
                    <li v-for="(exp, index) in experienceArray" :key="index"
                        class="list-group-item border-1 rounded-1 mb-3 p-lg-3">

                        <div class="row g-3">
                            <div class="col-lg-12">
                                <div class="fw-bold mb-2">{{ exp.job_title }}
                                    <span @click="editingStore.experienceToEdit = exp" class="float-end"
                                        data-bs-toggle="modal" data-bs-target="#editExperienceModal">
                                        <span class="profile-edit-btn  rounded-1">
                                            <i class="bi bi-pencil-fill"></i>
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
                                        {{ useFxn.dateDisplay(new Date(exp.start_date), 'MMM, YYYY') }} -
                                        {{ exp.end_date ? useFxn.dateDisplay(new Date(exp.end_date), 'MMMM, YYYY') :
                                            'present'
                                        }}
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
import useFxn from '@/stores/Helpers/useFunctions'
import { computed } from 'vue';

const profileStore = useProfileStore()
const jobsStore = useJobsStore()
const editingStore = useEditingProfileStore()


const experienceArray = computed(() => { return profileStore.data?.experience ?? [] });

const getWorkType = (id: any) => jobsStore.types.find((x: { id: any; }) => x.id === id)?.name ?? '';

</script>