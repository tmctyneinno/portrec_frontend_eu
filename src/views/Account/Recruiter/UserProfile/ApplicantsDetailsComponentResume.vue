<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRecruiterCommonStore } from '../RecruiterCommonStore';
import { computed } from 'vue';
// import { VuePDF, usePDF } from '@tato30/vue-pdf'
// import '@tato30/vue-pdf/style.css'

const recruiterCommonStore = useRecruiterCommonStore()
const { jobApplication } = storeToRefs(recruiterCommonStore);

const userResume = computed(() => {
    return jobApplication.value.details?.resume?.resume_url ?? ''
    // return `https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf`
})

// const { pdf } = usePDF({
//     url: userResume.value,
//     enableXfa: true,
// })


</script>

<template>
    <div class="card" v-if="userResume">
        <iframe :src="userResume + '#toolbar=0&navpanes=0&scrollbar=0'"
            style="width: 100%; height: 100vh; border: none;"></iframe>
        <a :href="userResume" download class="btn btn-dark mt-3 float-end w-100" target="_blank">Download Resume</a>
    </div>
    <div v-else class="text-center text-muted">
        Resume not found
    </div>
    <!-- <div class="d-flex justify-content-center overflow-hidden">
        <VuePDF text-layer annotation-layer :pdf="pdf" />
    </div> -->
</template>

<style lang="css" scoped></style>
