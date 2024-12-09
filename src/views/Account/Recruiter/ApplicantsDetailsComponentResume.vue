<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRecruiterCommonStore } from './RecruiterCommonStore';
import { computed } from 'vue';
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import '@tato30/vue-pdf/style.css'

const recruiterCommonStore = useRecruiterCommonStore()
const { applicants } = storeToRefs(recruiterCommonStore);

const userResume = computed(() => {
    // return applicants.value.details?.resumeBase64 ?? null
    // return applicants.value.details?.resume?.resume_url ?? null
    return `https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf`
})
const { pdf } = usePDF({
    url: userResume.value,
    enableXfa: true,
})


</script>

<template>
    <div class="d-flex justify-content-center overflow-hidden">
        <VuePDF text-layer annotation-layer :pdf="pdf" />
    </div>
</template>

<style lang="css" scoped></style>
