

<template>
    <div class="col-12">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                Additional Details
                <span class="float-end " data-bs-toggle="modal" data-bs-target="#editAdditionalDetailsModal">
                    <span class="profile-edit-btn small rounded-1">
                        Edit <i class="bi bi-pencil"></i>
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
                                <div>{{ profileStore.data?.email ?? '__' }}</div>
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
                                <div>{{ profileStore.data?.phone ?? '__' }}</div>
                            </div>
                        </div>
                    </li>
                    <li v-if="languages" class="list-group-item border-0">
                        <div class="row">
                            <div class="col-2">
                                <i class="bi bi-translate"></i>
                            </div>
                            <div class="col-10 mb-4">
                                <div class="text-muted">Languages</div>
                                <div>
                                    {{ languages }}.
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

const languages = computed(() => {
    const data = profileStore.data?.languages;
    if (!data) return '';

    const formattedLanguages = data
        .replace(/\s/g, '') // Remove spaces
        .split(',') // Split into an array
        .map((string: any) => string.charAt(0).toUpperCase() + string.slice(1)) // Capitalize first letters
        .join(','); // Join back into a comma-separated string

    return formattedLanguages;
});


</script>

