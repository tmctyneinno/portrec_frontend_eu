<template>
    <div class="modal fade show d-block" style="background-color: rgba(0, 0, 0, 0.502);" tabindex="-1"
        data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId">
        <div class="modal-dialog modal-dialog-centere " role="document">
            <div class="modal-content px-1 px-lg-3">
                <div class="modal-header">
                    <modalHeaderVue />
                </div>
                <div class="modal-body">
                    <h5 class="fw-bold">Submit your resume</h5>
                    <div class="small text-muted">
                        Be sure to include an updated resume
                    </div>

                    <div class="row gy-3 mt-1">
                        <div class="col-12">
                            <div class="card overflow-hidden">
                                <div class="row g-0">
                                    <div class="pdf-grid col-2 bg-primary fw-bold  text-white small">PDF</div>
                                    <div class="col-8">
                                        <div class="ps-2 py-1 ms-0">
                                            <div class="fw-bold text-muted">BOMA AGINA-OBU.pdf</div>
                                            <small class="text-muted">Last used on 7/25/2022</small>
                                        </div>
                                    </div>
                                    <div class="col-1 d-flex align-items-center cursor-pointer">
                                        <i class="bi bi-download"></i>
                                    </div>
                                    <div class="col-1 d-flex align-items-center cursor-pointer">
                                        <i class="bi bi-circle-fill"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="card overflow-hidden">
                                <div class="row g-0">
                                    <div class="pdf-grid col-2 bg-primary fw-bold  text-white small">PDF</div>
                                    <div class="col-8">
                                        <div class="ps-2 py-1 ms-0">
                                            <div class="fw-bold text-muted">BOMA AGINA-OBU.pdf</div>
                                            <small class="text-muted">Last used on 7/25/2022</small>
                                        </div>
                                    </div>
                                    <div class="col-1 d-flex align-items-center cursor-pointer">
                                        <i class="bi bi-download"></i>
                                    </div>
                                    <div class="col-1 d-flex align-items-center cursor-pointer">
                                        <i class="bi bi-circle"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 d-flex justify-content-end ">
                            <small class="text-muted cursor-pointer">show more resume <i class="bi bi-chevron-down"></i>
                            </small>
                        </div>

                        <div class="col-12 col-lg-6">
                            <div class="resume-attach">
                                <i class="bi bi-paperclip fs-5"></i>
                                <div class="text-muted small fw-bold">Attach Resume/CV</div>
                            </div>
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
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
import modalHeaderVue from './modalHeader.vue';
const applicationStore = useJobApplicationStore()

function switchModal(num: number) {
    // validate form first!
    applicationStore.switchModal(num)
}
</script>

<style  scoped>
.pdf-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-block: 10px; */

}

.resume-attach {
    border-style: dashed;
    border-radius: 10px;
    border-color: var(--theme-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--bs-light);
    padding: 8px 10px;
    cursor: pointer;
}
</style>