

<template>
    <div class="col-12">
        <div class="card rounded-0">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                Educations
                <span class="float-end" data-bs-toggle="modal" data-bs-target="#addEducationModal">
                    <span class="profile-edit-btn click-ripple">
                        <i class="bi bi-plus-lg"></i>
                    </span>
                </span>
            </div>
            <div class="card-body small">

                <p v-if="!isEducations" class="text-muted2">
                    Add institutions attended
                </p>
                <!-- Some borders are removed -->
                <ul v-else class="list-group list-group-flush">
                    <li v-for="(edu, index ) in profileStore.data.education" :key="index" class="list-group-item">
                        <div class="row g-3">
                            <!-- <div class="col-lg-2">
                                <img src="" alt="_img" class="">
                            </div> -->
                            <div class="col">
                                <div class="fw-bold mb-2">{{ edu.institution }}
                                    <span @click="editingStore.educationToEdit = edu" class="float-end"
                                        data-bs-toggle="modal" data-bs-target="#editEducationModal">
                                        <span class="profile-edit-btn click-ripple">
                                            <i class="bi bi-pencil-square"></i>
                                        </span>
                                    </span>

                                </div>
                                <div class="text-muted mb-2">
                                    {{ edu.qualification }}
                                    <div v-if="edu.start_date">
                                        {{ new Date(edu.start_date).getFullYear() }} -
                                        {{ edu.end_date ? new Date(edu.end_date).getFullYear() : 'present' }}
                                    </div>
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
import { computed } from 'vue';

const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()

const isEducations = computed(() => {
    let edu: boolean = false
    if (profileStore.data) {
        if (profileStore.data.education)
            edu = true;
    }
    return edu;
})
</script>

<style lang="css" scoped></style>
