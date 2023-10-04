<template>
    <div class="modal fade show d-block" style="background-color: rgba(0, 0, 0, 0.502);" tabindex="-1"
        data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId">
        <div class="modal-dialog modal-dialog-centered  " role="document">
            <div class="modal-content px-1 px-lg-3">
                <div class="modal-header">
                    <modalHeaderVue />
                </div>
                <div class="modal-body">
                    <h5 class="fw-bold">Quiz</h5>
                    <div class="small text-muted">
                        The following is required to be invited for interview
                    </div>

                    <div class="row gy-3 mt-1">

                        <div class="col-12">
                            <label class="fw-bold small">
                                How many years of work experience do you have with Google Analytics?
                            </label>
                            <input type="text" class="form-control rounded-0">
                        </div>
                        <div class="col-12">
                            <label class="fw-bold small">
                                How many years of work experience do you have using facebook AD?
                            </label>
                            <input type="text" class="form-control rounded-0">
                        </div>
                        <div class="col-12">
                            <label class="fw-bold small">
                                How many years of work experience do you have with JavaScript?
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
                                    class="btn btn-primary-outline rounded-0 w-100">Back</button>
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
import { useApplicationStore } from './applicationStore';
import modalHeaderVue from './modalHeader.vue';
const applicationStore = useApplicationStore()

function switchModal(num: number) {
    // validate form first!
    applicationStore.switchModal(num)
}
</script>

<style  scoped></style>
./applicationStore