<template>
    <div class="modal fade show d-block" style="background-color: rgba(0, 0, 0, 0.502);" tabindex="-1"
        data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId">
        <div class="modal-dialog modal-dialog-centered   " role="document">
            <div class="modal-content px-1 px-lg-3">
                <div class="modal-header">
                    <modalHeaderVue />
                </div>
                <div class="modal-body">
                    <h5 class="fw-bold">Submit your application</h5>
                    <div class="small text-muted">
                        The following is required and will only be shared with {{ applicationStore.job.company }}
                    </div>
                    <div class="row gy-3 mt-1">
                        <div class="col-12">
                            <label class="fw-bold small">Full name</label>
                            <input type="text" class="form-control rounded-0" placeholder="Enter your fullname">
                        </div>
                        <div class="col-12">
                            <label class="fw-bold small">Email address</label>
                            <input type="text" class="form-control rounded-0" placeholder="Enter your email address">
                        </div>
                        <div class="col-12">
                            <label class="fw-bold small">Phone number</label>
                            <input type="text" class="form-control rounded-0" placeholder="Enter your phone number">
                        </div>
                        <div class="col-12 small text-muted">
                            By sending the request you can confirm that you accept our
                            <span class="theme-color">Terms of Service</span> and
                            <span class="theme-color"> Privacy Policy </span>
                        </div>
                    </div>
                    <div class="col-12 my-3">
                        <button @click="switchModal(1)" type="button" class="btn btn-primary w-100 rounded-0">Next</button>
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