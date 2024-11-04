<template>

    <modal_template>

        <template #title>
            <div class="fw-bold text-muted fs-5">Submit your resume</div>
            <div class="xsmall text-muted lh-1 mb-2">
                Be sure to include an updated resume
            </div>
        </template>

        <template #form>
            <div class="row g-2">
                <div class="col-12 cursor-pointer" v-for="resume in resumesList" @click="chooseResume(resume.id)">
                    <div class="card file-card overflow-hidden">
                        <div class="row g-2">
                            <div class="pdf-grid col-1 bg-primary fw-bold  text-white">
                                <i class="bi bi-file-earmark-text"></i>
                            </div>
                            <div class="col-10">
                                <div class="ps-2 py-1 ms-0">
                                    <div class="fw-bold text-muted">{{ resume.resume_name }}</div>
                                    <div class="text-muted2 xsmall">added: {{ timeAgo(resume.created_at) }}</div>
                                </div>
                            </div>
                            <div class="col-1 d-flex align-items-center ">
                                <i v-if="resume.isChosen" class="bi bi-circle-fill"></i>
                                <i v-else class="bi bi-circle"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <!-- <div class="col-12 d-flex justify-content-end ">
                            <small class="text-muted cursor-pointer">show more resume <i class="bi bi-chevron-down"></i>
                            </small>
                        </div> -->

            <div class="row g-2">
                <div class="col-12 col-md-6">
                    <div class="resume-attach" v-bind="getRootProps()">
                        <i class="bi bi-paperclip fs-5"></i>
                        <div class="text-muted small fw-bold">Attach Resume/CV</div>
                        <input v-bind="getInputProps()" />
                    </div>
                </div>
                <div v-if="store.applyData.resume" class="col-12 col-md-6">
                    <div class="alert small alert-success bg-transparent border-0" role="alert">
                        {{ useFxn.truncateStr(store.applyData.resume_name, 18) }} <i
                            class="bi bi-check-circle-fill"></i>
                    </div>
                </div>
            </div>

        </template>

        <template #buttons>
            <div class="row">
                <div class="col-6">
                    <button @click="store.switchModal(-1)" type="button"
                        class="btn btn-outline-dark rounded-0 w-100">Back</button>
                </div>
                <div class="col-6">
                    <button :disabled="!store.applyData.resume" @click="switchOrSkipModal" type="button"
                        class="btn btn-primary rounded-0 w-100">Next</button>
                </div>
            </div>
        </template>

    </modal_template>
</template>

<script lang="ts" setup>
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
//@ts-ignore
import { useDropzone } from "vue3-dropzone";
import useFxn from "@/stores/Helpers/useFunctions";
import modal_template from './modal_template.vue';
import { useProfileStore } from '@/stores/profileStore';
import { ref, onMounted } from 'vue';
import { useTimeAgo } from '@vueuse/core';

const profileStore = useProfileStore()

const store = useJobApplicationStore()


// resumes selection
const resumesList = ref<any>([])

onMounted(() => {
    resumesList.value = profileStore?.data?.resume ?? []
    if (resumesList.value.length) {
        // @ts-ignore
        resumesList.value.sort((a: any, b: any) => new Date(b.created_at) - new Date(a.created_at));
        chooseResume(resumesList.value[0].id)

    }
})

const timeAgo = (date: Date) => {
    const parsed = useTimeAgo(new Date(date))
    return parsed;
}

function resetResumeSelection() {
    resumesList.value.forEach((resume: { isChosen: number; }) => resume.isChosen = 0);
}

function chooseResume(id: string) {
    resetResumeSelection()
    const resume = resumesList.value.find((x: { id: string; }) => x.id == id)
    if (resume) resume.isChosen = 1
    store.applyData.resume = id
    console.log(resume)
}




const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptFiles: any[], rejectReasons: any) => {

        if (!useFxn.isExtension(acceptFiles[0].name, ['pdf', 'doc', 'docx'])) {
            useFxn.toast('Please upload a vaild document', 'warning');
            return;
        }

        store.applyData.resume = acceptFiles[0]
        store.applyData.resume_name = acceptFiles[0].name

        resetResumeSelection()
        resumesList.value.push({
            resume_name: acceptFiles[0].name,
            isChosen: 1,
            id: resumesList.value.length + 1,
            created_at: new Date()
        })

        // @ts-ignore
        resumesList.value.sort((a: any, b: any) => new Date(b.created_at) - new Date(a.created_at));


        // console.log(rejectReasons);
    },
});

function switchOrSkipModal() {
    if (!store.currentJob.questions.length) store.switchModal(+2)
    else store.switchModal(+1)
}

</script>

<style scoped>
.pdf-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-block: 10px; */

}

.resume-attach {
    border-style: dashed;
    border-radius: 5px;
    border-color: var(--theme-color);
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: var(--bs-light);
    padding: 3px 10px;
    cursor: pointer;
}

.resume-attach:hover {
    background-color: #cccccc4d !important;
}

.file-card:hover {
    background-color: #cccccc1d;
}
</style>