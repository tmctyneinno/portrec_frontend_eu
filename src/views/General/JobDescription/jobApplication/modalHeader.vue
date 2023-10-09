<script lang="ts" setup>
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
const store = useJobApplicationStore()
</script>
<template>
    <div>
        <h4 class="modal-title fw-bold" id="modalTitleId">{{ store.currentJob.title }}</h4>
        <span class="text-muted small text-capitalize">
            {{ store.currentJob.company ? store.currentJob.company.name : 'Company' }}
            <i class="bi bi-dot"></i>
            {{ store.currentJob.company ? store.currentJob.company.city : 'Location' }},
            {{ store.currentJob.company ? store.currentJob.company.country : 'Country' }}
            <i class="bi bi-dot"></i>
            {{ store.currentJob.job_type ? store.currentJob.job_type.name : 'Full time' }}
        </span>
    </div>
    <button @click="store.modalOpen = false" type="button" class="btn-close small" aria-label="Close"></button>
</template>