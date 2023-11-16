

<template>
    <div class="col-12">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                About me
                <span @click="saveAboutMeToStore" class="float-end" data-bs-toggle="modal" data-bs-target="#editAboutModal">
                    <span class="profile-edit-btn small rounded-1">
                        <i class="bi bi-pencil-square"></i> Change
                    </span>
                </span>
            </div>
            <div class="card-body small">
                <p v-if="profileStore.data && profileStore.data.about_me">
                    <span v-html="profileStore.data.about_me"></span>
                </p>
                <p v-else class="text-muted2">
                    Pls add information about yourself
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { useEditingProfileStore } from './editingProfileStore';


const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()

function saveAboutMeToStore() {
    editingStore.aboutMe.isEdit = editingStore.aboutMe.isEdit == 1 ? 2 : 1
    editingStore.aboutMe.text = profileStore.data.about_me
}
</script>
