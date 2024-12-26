<template>
    <div>
        <!-- Modal trigger button -->
        <button type="button" ref="subscriptionCardPaymentModalOpen" class=" d-none" data-bs-toggle="modal"
            data-bs-target="#subscriptionCardPaymentModal">
        </button>

        <div class="modal fade" id="subscriptionCardPaymentModal" tabindex="-1" data-bs-backdrop="static"
            data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h6 class="modal-title" id="modalTitleId">
                            <i @click="backToOptions" class="bi bi-arrow-left cursor-pointer me-3"></i>
                            Pay Online
                        </h6>
                    </div>
                    <div class="modal-body">
                        <div class="fw-bold mb-2">Required <span class="text-danger">*</span> </div>
                        <div class="row g-3">
                            <div class="col-12">
                                <div class="form-label">Card Number <span class="text-danger">*</span></div>
                                <input type="text" class="form-control" placeholder="4523 4566 4676 4567">
                            </div>
                            <div class="col-12">
                                <div class="form-label">Cardholder's Name <span class="text-danger">*</span></div>
                                <input type="text" class="form-control" placeholder="Essy">
                            </div>

                            <div class="col-4">
                                <div class="form-label">Expires<span class="text-danger">*</span></div>
                                <input type="text" class="form-control" placeholder="MM">
                            </div>
                            <div class="col-4">
                                <div class="form-label">&nbsp;</div>
                                <input type="text" class="form-control" placeholder="YYYY">
                            </div>
                            <div class="col-4">
                                <div class="form-label">CVV<span class="text-danger">*</span></div>
                                <input type="text" class="form-control" placeholder="372">
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer border-0">
                        <button data-bs-dismiss="modal" ref="subscriptionCardPaymentModalClose"
                            class="btn btn-link text-decoration-none theme-color">
                            Cancel Payment</button>
                        <primaryButton>
                            Make Payment
                        </primaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSubscriptionStore } from './subscriptionStore';
import { onBeforeRouteLeave } from 'vue-router';

const subscriptionStore = useSubscriptionStore()

const subscriptionCardPaymentModalOpen = ref<any>(null)
const subscriptionCardPaymentModalClose = ref<any>(null)


function backToOptions() {
    subscriptionCardPaymentModalClose.value?.click()
    subscriptionStore.modal.options = !subscriptionStore.modal.options
}



watch(() => subscriptionStore.modal.cardPayment, () => {
    subscriptionCardPaymentModalOpen.value?.click()
})
onBeforeRouteLeave(() => {
    subscriptionCardPaymentModalClose.value?.click()
})
</script>