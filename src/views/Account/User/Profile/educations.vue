<template>
    <div class="col-12">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                Educations
                <span class="float-end" data-bs-toggle="modal" data-bs-target="#addEducationModal">
                    <span class="profile-edit-btn small rounded-1">
                        <i class="bi bi-plus-lg"></i>
                    </span>
                </span>
            </div>
            <div class="card-body small">

                <p v-if="!educationsArray().length" class="text-muted2">
                    Add institutions attended
                </p>
                <!-- Some borders are removed -->
                <ul v-else class="list-group list-group-flush">
                    <li v-for="(edu, index ) in educationsArray()" :key="index"
                        class="list-group-item border-1 rounded-1 mb-3 p-lg-3">
                        <div class="row g-3">
                            <!-- <div class="col-lg-2">
                                <img src="" alt="_img" class="">
                            </div> -->
                            <div class="col">
                                <div class="fw-bold mb-2">{{ edu.institution }}
                                    <span @click="editingStore.educationToEdit = edu" class="float-end"
                                        data-bs-toggle="modal" data-bs-target="#editEducationModal">
                                        <span class="profile-edit-btn rounded-1">
                                            <i class="bi bi-pencil-fill"></i>
                                        </span>
                                    </span>

                                </div>
                                <div class="text-muted mb-2">
                                    {{ qualificationName(edu.qualification_id) }}
                                    <div v-if="edu.start_date">
                                        {{ useFxn.dateDisplay(new Date(edu.start_date), 'm,y') }} -
                                        {{ edu.end_date ? useFxn.dateDisplay(new Date(edu.end_date), 'm,y') : 'present'
                                        }}
                                    </div>
                                    <!-- <div v-if="edu.start_date">
                                        {{ new Date(edu.start_date).getFullYear() }} -
                                        {{ edu.end_date ? new Date(edu.end_date).getFullYear() : 'present' }}
                                    </div> -->
                                </div>
                                <div>
                                    {{ edu.description }}
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
import useFxn from '@/stores/Helpers/useFunctions'
import { useJobsStore } from '@/stores/jobsStore';

const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()
const jobsStore = useJobsStore()

const educationsArray = () => profileStore.data?.education ?? [];

const qualificationName = (id: any) => jobsStore.qualifications.find((x: { id: any; }) => x.id == id)?.name ?? '';

</script>

<style lang="css" scoped></style>
