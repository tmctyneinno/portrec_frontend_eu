<template>
    <div class="modal fade show d-block" style="background-color: rgba(0, 0, 0, 0.502);" tabindex="-1"
        data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId">
        <div class="modal-dialog modal-dialog-centered  " role="document">
            <div class="modal-content px-1 px-lg-2">
                <div class="modal-header">
                    <modalHeaderVue />
                </div>
                <div class="modal-body py-1">
                    <div class="fw-bold text-muted fs-5">Additional information</div>
                    <div class="small text-muted lh-1 mb-2">
                        The following is required to be invited for interview
                    </div>
                    <progressBarVue />

                    <div class="row gy-3 mt-1">
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


                        <div class="col-12 small text-muted">
                            By sending the request you can confirm that you accept our
                            <span class="theme-color">Terms of Service</span> and
                            <span class="theme-color"> Privacy Policy </span>
                        </div>
                    </div>


                    <div class="my-3 col-12 ">
                        <div class="row">
                            <div class="col-2">
                                <button @click="store.switchModal(-1)" type="button"
                                    class="btn btn-secondary rounded-0 w-100">
                                    <i class="bi bi-chevron-left"></i>
                                </button>
                            </div>
                            <div class="col-10">
                                <button v-if="!isApplying" @click="applyForJob"
                                    :disabled="!store.applyData.cover_letter" type="button"
                                    class="btn btn-primary rounded-0 w-100">
                                    Submit Application
                                </button>
                                <button v-else class="btn btn-primary rounded-0 w-100" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm" role="status"
                                        aria-hidden="true"></span>
                                    Submitting...
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
import modalHeaderVue from './modalHeader.vue';
import progressBarVue from './progressBar.vue'
import api from '@/stores/Helpers/axios'
import { ref } from 'vue';


const store = useJobApplicationStore()
const isApplying = ref<boolean>(false)

async function applyForJob() {
    // collate form

    const newForm = new FormData();

    // function collateAnswers() {
    //     const quizData = store.currentJob.questions.map((x: any, index: any) => ({
    //         question: `answers[${index}][question_id]`,
    //         answer: `answers[${index}][answer]`,
    //         question_value: x.id,
    //         answer_value: x.answer_text
    //     }))

    //     store.applyData.answers = quizData;
    // }


    isApplying.value = true
    try {
        // const resp = store.applyData.isAuthUser ? api.apply(form) : api.applyGuest(form)
        // console.log(resp);
        // isApplying.value = false

    } catch (error) {
        // 
    }
}

</script>
