<template>
    <modal_template>

        <template #title>
            <div class="fw-bold text-muted fs-5">Additional information</div>
            <div class="small text-muted lh-1 mb-2">
                The following is required to be invited for interview
            </div>
        </template>

        <template #form>
            <div class="col-12">
                <label class="fw-bold small"> Portfolio URL (optional) </label>
                <input v-model="store.applyData.portfolio_url" type="text" class="form-control rounded-0"
                    placeholder="Link to your portforlio URL">
            </div>

            <div class="col-12">
                <label class="fw-bold small"> Cover Letter</label>
                <textarea v-model="store.applyData.cover_letter" rows="5" class="form-control rounded-0"
                    placeholder="Add a cover letter or anything else you want to share"></textarea>
            </div>
        </template>

        <template #buttons>
            <div class="row">
                <div class="col-2">
                    <button @click="switchOrSkipModal" type="button" class="btn btn-secondary rounded-0 w-100">
                        <i class="bi bi-chevron-left"></i>
                    </button>
                </div>
                <div class="col-10">
                    <button v-if="!isApplying" @click="applyForJob" :disabled="!store.applyData.cover_letter"
                        type="button" class="btn btn-primary rounded-0 w-100">
                        Submit Application
                    </button>
                    <button v-else class="btn btn-primary rounded-0 w-100" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Submitting...
                    </button>

                </div>
            </div>
        </template>

    </modal_template>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
import modal_template from './modal_template.vue';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';

const store = useJobApplicationStore()
const isApplying = ref<boolean>(false)

async function applyForJob() {
    // collate form
    const newForm = new FormData();
    newForm.append('job_id', store.currentJob.id)
    newForm.append('name', store.applyData.fullname)
    newForm.append('cover_letter', store.applyData.cover_letter)
    newForm.append('resume', store.applyData.resume)

    if (!store.applyData.isAuthUser) {
        newForm.append('email', store.applyData.email)
        newForm.append('phone_number', store.applyData.phone)
    }

    store.currentJob.questions.forEach((item: { id: string; answer_text: string }, index: any) => {
        newForm.append(`answers[${index}][question_id]`, item.id)
        newForm.append(`answers[${index}][answer]`, item.answer_text)
    });

    // Display the key/value pairs
    // for (var pair of newForm.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    // }


    isApplying.value = true
    try {
        const resp = store.applyData.isAuthUser ? await api.applyJob(newForm) : await api.applyJobGuest(newForm)
        console.log(resp);
        isApplying.value = false
        useFxn.toast('Application sent!', 'success')
        store.modalOpen = false
        store.resetForm()

    } catch (error) {
        useFxn.toast('Sorry, Something went wrong', 'error')
        isApplying.value = false
        console.log(error);
    }
}


function switchOrSkipModal() {
    if (!store.currentJob.questions.length) store.switchModal(-2)
    else store.switchModal(-1)
}

</script>
