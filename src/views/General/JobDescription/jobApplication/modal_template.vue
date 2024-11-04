<template>
    <div class="modal fade show d-block" style="background-color: rgba(0, 0, 0, 0.502);" tabindex="-1"
        data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId">
        <div class="modal-dialog modal-dialog-scrollable " role="document">
            <div class="modal-content px-1 px-lg-2 animate__animated animate__slideInDown">
                <div class="modal-header">
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
                    </div>
                    <button @click="store.modalOpen = false" type="button" class="btn-close small"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body py-1">
                    <!-- slot: title -->
                    <slot name="title"></slot>

                    <div class="progress" style="height: 4px;">
                        <div class="progress-bar progress-bar-striped progress-bar-animated"
                            :class="{ 'bg-success': percent == 100, 'bg-warning': percent < 100, }" role="progressbar"
                            :style="{ 'width': percent + '%' }" :aria-valuenow="percent" aria-valuemin="0"
                            aria-valuemax="100">
                        </div>
                    </div>

                    <div class="row g-3 mt-0">
                        <!-- slot: form -->
                        <slot name="form"></slot>

                        <div class="col-12 small text-muted">
                            By sending the request you can confirm that you accept our
                            <span class="theme-color">Terms of Service</span> and
                            <span class="theme-color"> Privacy Policy </span>
                        </div>
                    </div>
                    <div class="col-12 my-3">
                        <!-- slot: buttons -->
                        <slot name="buttons"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, } from 'vue'
import { useJobApplicationStore } from '@/stores/jobApplicationStore';

const store = useJobApplicationStore()

const percent = computed(() => {
    const numberOfModals = 4
    const cent = (store.currentModal / numberOfModals) * 100
    return cent
})

</script>