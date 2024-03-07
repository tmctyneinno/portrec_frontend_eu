<template>
    <div class="modal fade show d-block" style="background-color: rgba(0, 0, 0, 0.502);" tabindex="-1"
        data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId">
        <div class="modal-dialog modal-dialog-scrollable  " role="document">
            <div class="modal-content px-1 px-lg-2">
                <div class="modal-header">
                    <modalHeaderVue />
                </div>
                <div class="modal-body py-1">
                    <div class="fw-bold text-muted fs-5">Quiz</div>
                    <div class="small text-muted lh-1 mb-2">
                        The following is required to be invited for interview
                    </div>
                    <progressBarVue />
                    <div class="row g-3 mt-1">
                        <div class="col-12" v-for="qst in store.currentJob.questions" :key="qst.id">
                            <label class="fw-bold small">
                                {{ qst.questions }}
                            </label>
                            <input v-model="qst.answer_text" :id="'question_' + qst.id" type="text"
                                class="form-control rounded-0" placeholder="type answer here..">
                        </div>



                        <div class="col-12 small text-muted">
                            By sending the request you can confirm that you accept our
                            <span class="theme-color">Terms of Service</span> and
                            <span class="theme-color"> Privacy Policy </span>
                        </div>
                    </div>


                    <div class="my-3 col-12 ">
                        <div class="row">
                            <div class="col-6">
                                <button @click="store.switchModal(-1)" type="button"
                                    class="btn btn-outline-dark rounded-0 w-100">Back</button>
                            </div>
                            <div class="col-6">
                                <button :disabled="hasNotFullyAnswered" @click="store.switchModal(+1)" type="button"
                                    class="btn btn-primary rounded-0 w-100">Next</button>
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
import { computed } from 'vue'

const store = useJobApplicationStore()

const hasNotFullyAnswered = computed(() => {
    const quiz = store.currentJob.questions
    // eslint-disable-next-line no-prototype-builtins
    return quiz.some((obj: any) => !obj.hasOwnProperty('answer_text') || obj.answer_text === "");
})

</script>
