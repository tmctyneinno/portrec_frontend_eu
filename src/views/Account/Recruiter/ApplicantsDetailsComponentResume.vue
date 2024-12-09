<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRecruiterCommonStore } from './RecruiterCommonStore';
import { computed } from 'vue';
import PDFViewer from 'pdf-viewer-vue'

const recruiterCommonStore = useRecruiterCommonStore()
const { applicants } = storeToRefs(recruiterCommonStore);

const userResume = computed(() => {
    // return applicants.value.details?.resumeBase64 ?? null
    // return applicants.value.details?.resume?.resume_url ?? null
    return `https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf`
})

function handleDownload() {

}
</script>

<template>
    <div>
        <PDFViewer :source="userResume" style="width: 100%; height: 100vh;" @download="handleDownload" />
    </div>
</template>

<style lang="css" scoped></style>
