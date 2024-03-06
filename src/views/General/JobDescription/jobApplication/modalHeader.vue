<script lang="ts" setup>
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
const store = useJobApplicationStore()
</script>

<template>
    <div style="width: 90%;">
        <div class="modal-title fw-bold fs-5">{{ store.currentJob.title }}</div>
        <span class="text-muted xsmall text-capitalize lh-1">
            {{ store.currentJob.company ? store.currentJob.company.name : 'Company' }}
            <i class="bi bi-dot"></i>
            {{ store.currentJob.company ? store.currentJob.company.city : 'Location' }},
            {{ store.currentJob.company ? store.currentJob.company.country : 'Country' }}
            <i class="bi bi-dot"></i>
            {{ store.currentJob.job_type ? store.currentJob.job_type.name : 'Full time' }}
        </span>

        <!-- <div>
            {{ store.myProfile.data }}
        </div> -->
    </div>
    <button @click="store.modalOpen = false" type="button" class="btn-close small" aria-label="Close"></button>
</template>