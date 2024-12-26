<template>
    <div>
        <!-- Modal trigger button -->
        <button type="button" ref="subscriptionOptionsModalOpen" class=" d-none" data-bs-toggle="modal"
            data-bs-target="#subscriptionOptionsModal">
        </button>

        <div class="modal fade" id="subscriptionOptionsModal" tabindex="-1" data-bs-backdrop="static"
            data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h6 class="modal-title" id="modalTitleId">
                            <i data-bs-dismiss="modal" ref="subscriptionOptionsModalClose"
                                class="bi bi-arrow-left cursor-pointer me-3"></i>
                            Pay Online
                        </h6>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-warning border-0 py-1 rounded-0" role="alert">
                            How would you like to pay?
                        </div>


                        <ul class="list-group list-group-flush">
                            <li v-for="(option, index) in paymentOptions" :key="index"
                                class="list-group-item cursor-pointer" @click="selectedOption = option.value">
                                <i :class="option.icon" class="me-3"></i>
                                {{ option.title }}
                                <i v-if="selectedOption == option.value"
                                    class="bi bi-circle-fill float-end theme-color"></i>
                                <i v-else class="bi bi-circle float-end"></i>
                            </li>
                        </ul>

                    </div>
                    <div class="modal-footer border-0">
                        <primaryButton @click="openSelectedOption" className="w-100">
                            Make Payment
                        </primaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <CardPaymentModal />
    <BankTransferModal />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSubscriptionStore } from './subscriptionStore';
import { onBeforeRouteLeave } from 'vue-router';
import CardPaymentModal from './cardPaymentModal.vue';
import BankTransferModal from './bankTransferModal.vue';

const subscriptionStore = useSubscriptionStore()

const subscriptionOptionsModalOpen = ref<any>(null)
const subscriptionOptionsModalClose = ref<any>(null)


type PaymentOptionTypes = 'card' | 'transfer'
const paymentOptions = ref<{ icon: string, title: string, value: PaymentOptionTypes }[]>([
    { icon: `bi bi-credit-card`, title: 'Card', value: "card" },
    { icon: `bi bi-arrow-down-up`, title: 'Bank Transfer', value: "transfer" },
])
const selectedOption = ref<PaymentOptionTypes>('transfer')


function openSelectedOption() {
    if (selectedOption.value == 'card') subscriptionStore.modal.cardPayment = !subscriptionStore.modal.cardPayment
    else subscriptionStore.modal.bankTransfer = !subscriptionStore.modal.bankTransfer
    subscriptionStore.modal.options = !subscriptionStore.modal.options
}



watch(() => subscriptionStore.modal.options, () => {
    subscriptionOptionsModalOpen.value?.click()
})
onBeforeRouteLeave(() => {
    subscriptionOptionsModalClose.value?.click()
})
</script>