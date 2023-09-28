<script lang="ts" setup>
import { useApplicationStore } from './applicationStore';
const applicationStore = useApplicationStore()
</script>
<template>
    <div>
        <h4 class="modal-title fw-bold" id="modalTitleId">{{ applicationStore.job.title }}</h4>
        <span class="text-muted small">
            {{ applicationStore.job.company }}
            <i class="bi bi-dot"></i>
            {{ applicationStore.job.location }}
            <i class="bi bi-dot"></i>
            {{ applicationStore.job.typee }}
        </span>
    </div>
    <button @click="applicationStore.modalOpen = false" type="button" class="btn-close small" aria-label="Close"></button>
</template>