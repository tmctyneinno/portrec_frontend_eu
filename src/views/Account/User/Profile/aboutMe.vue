

<template>
    <div class="col-12">
        <div class="card rounded-0">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                About me
                <span class="float-end" data-bs-toggle="modal" data-bs-target="#editAboutModal">
                    <span class="profile-edit-btn click-ripple">
                        <i class="bi bi-pencil-square"></i>
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

const profileStore = useProfileStore()

</script>

<style lang="css" scoped></style>
