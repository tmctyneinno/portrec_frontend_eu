

<template>
    <div class="col-12">
        <div class="card rounded-0">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                Additional Details
                <span class="float-end " data-bs-toggle="modal" data-bs-target="#editAdditionalDetailsModal">
                    <span class="profile-edit-btn click-ripple ">
                        <i class="bi bi-pencil-square"></i>
                    </span>
                </span>
            </div>
            <div class="card-body small py-0">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item border-0">
                        <div class="row">
                            <div class="col-2">
                                <i class="bi bi-envelope"></i>
                            </div>
                            <div class="col">
                                <div class="text-muted">Email</div>
                                <div>{{ profileStore.data ? profileStore.data.email : '__' }}</div>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item border-0">
                        <div class="row">
                            <div class="col-2">
                                <i class="bi bi-phone"></i>
                            </div>
                            <div class="col">
                                <div class="text-muted">Phone</div>
                                <div>{{ profileStore.data ? profileStore.data.phone : '__' }}</div>
                            </div>
                        </div>
                    </li>
                    <li v-if="languages" class="list-group-item border-0">
                        <div class="row">
                            <div class="col-2">
                                <i class="bi bi-translate"></i>
                            </div>
                            <div class="col mb-4">
                                <div class="text-muted">Languages</div>
                                <div>
                                    {{ languages }}
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
import { computed } from 'vue';

const profileStore = useProfileStore()

// const languages = computed(() => {
//     const languages = JSON.parse(profileStore.data?.languages ?? '[]');
//     return languages.toString();
// });

const languages = computed(() => profileStore.data?.languages ?? '');

</script>

