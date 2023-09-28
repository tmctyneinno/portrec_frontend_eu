<template>
    <div class="modal fade show d-block" style="background-color: rgba(0, 0, 0, 0.502);" tabindex="-1"
        data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId">
        <div class="modal-dialog modal-dialog-centered  " role="document">
            <div class="modal-content px-1 px-lg-3">
                <div class="modal-header">
                    <modalHeaderVue />
                </div>
                <div class="modal-body">
                    <h5 class="fw-bold">Additional information</h5>
                    <div class="small text-muted">
                        The following is required to be invited for interview
                    </div>

                    <div class="row gy-3 mt-1">

                        <div class="col-12">
                            <label class="fw-bold small">
                                Portfolio URL
                            </label>
                            <input type="text" class="form-control rounded-0" placeholder="Link to your portforlio URL">
                        </div>

                        <div class="col-12">
                            <label class="fw-bold small">
                                Cover Letter
                            </label>
                            <textarea rows="5" class="form-control rounded-0"
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
                                <button @click="switchModal(-1)" type="button" class="btn btn-secondary rounded-0 w-100">
                                    <i class="bi bi-chevron-left"></i>
                                </button>
                            </div>
                            <div class="col-10">
                                <button @click="switchModal(1)" type="button" class="btn btn-primary rounded-0 w-100">
                                    Submit Application
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