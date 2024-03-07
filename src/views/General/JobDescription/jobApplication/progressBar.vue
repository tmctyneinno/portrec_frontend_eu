<script lang="ts" setup>
import { computed } from 'vue'
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
const store = useJobApplicationStore()

const percent = computed(() => {
    const cent = (store.currentModal / 4) * 100
    return cent
})
</script>

<template>
    <div class="progress" style="height: 4px;">
        <div class="progress-bar progress-bar-striped progress-bar-animated"
            :class="{ 'bg-success': percent == 100, 'bg-warning': percent < 100, }" role="progressbar"
            :style="{ 'width': percent + '%' }" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100">
        </div>
    </div>
</template>