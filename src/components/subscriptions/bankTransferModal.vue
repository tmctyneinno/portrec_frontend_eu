<template>
    <div>
        <!-- Modal trigger button -->
        <button type="button" ref="subscriptionBankTransferModalOpen" class=" d-none" data-bs-toggle="modal"
            data-bs-target="#subscriptionBankTransferModal">
        </button>

        <div class="modal fade" id="subscriptionBankTransferModal" tabindex="-1" data-bs-backdrop="static"
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
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item border-0">
                                <div class="text-muted">Bank Name</div>
                                <div>EssyBank</div>
                            </li>
                            <li class="list-group-item border-0">
                                <div class="text-muted">Account Number</div>
                                <div>0113510138
                                    <i v-if="!copied" @click="copy('0113510138')"
                                        class="float-end bi bi-copy cursor-pointer"></i>
                                    <span v-else class="float-end text-success xsmall">copied</span>
                                </div>
                            </li>
                            <li class="list-group-item border-0">
                                <div class="text-muted">Amount</div>
                                <div> &#8358;4,000</div>
                            </li>
                        </ul>
                        <hr class="mb-1">
                        <div class="text-muted small">
                            This account is for transaction only and expires in
                            <span class="theme-color">30:00</span>
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <button class="btn btn-link text-decoration-none theme-color" data-bs-dismiss="modal"
                            ref="subscriptionBankTransferModalClose">
                            Cancel Payment
                        </button>
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
import { useClipboard } from '@vueuse/core';

const subscriptionStore = useSubscriptionStore()

const subscriptionBankTransferModalOpen = ref<any>(null)
const subscriptionBankTransferModalClose = ref<any>(null)
const { copy, copied } = useClipboard()


function backToOptions() {
    subscriptionBankTransferModalClose.value?.click()
    subscriptionStore.modal.options = !subscriptionStore.modal.options
}


watch(() => subscriptionStore.modal.bankTransfer, () => {
    subscriptionBankTransferModalOpen.value?.click()
})
onBeforeRouteLeave(() => {
    subscriptionBankTransferModalClose.value?.click()
})
</script>