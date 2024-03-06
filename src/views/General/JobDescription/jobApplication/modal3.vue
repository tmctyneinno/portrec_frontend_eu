<template>
    <div class="modal fade show d-block" style="background-color: rgba(0, 0, 0, 0.502);" tabindex="-1"
        data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId">
        <div class="modal-dialog modal-dialog-scrollable  " role="document">
            <div class="modal-content px-1 px-lg-2">
                <div class="modal-header">
                    <modalHeaderVue />
                </div>
                <div class="modal-body py-1">
                    <progressBarVue />
                    <div class="fw-bold text-muted fs-5">Quiz</div>
                    <div class="small text-muted lh-1">
                        The following is required to be invited for interview
                    </div>
                    <!-- {{ store.currentJob.questions }} -->
                    <div class="row gy-3 mt-1">
                        <div class="col-12">
                            <label class="fw-bold small">
                                How many years of work experience do you have with Google Analytics?
                            </label>
                            <input type="text" class="form-control rounded-0">
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
                                <button @click="switchModal(-1)" type="button"
                                    class="btn btn-outline-dark rounded-0 w-100">Back</button>
                            </div>
                            <div class="col-6">
                                <button @click="switchModal(+1)" type="button"
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

const store = useJobApplicationStore()

function switchModal(num: number) {
    // validate form first!
    store.switchModal(num)
}
</script>
