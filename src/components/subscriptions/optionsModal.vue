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
                            How many would you like to pay for?
                        </div>

                        <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                            v-model="subscriptionStore.userPaymentOptions.duration" class="custom-select-class"
                            placeholder="" :options="subscriptionStore.userPaymentOptions.durations"
                            :reduce="(val: any) => val.value" />


                    </div>
                    <div class="modal-footer border-0">
                        <primaryButtonLoading v-if="subscriptionStore.userPaymentOptions.isInitiating"
                            className="w-100" />
                        <primaryButton v-else @click="subscriptionStore.initiatePayment" className="w-100">
                            Make Payment
                        </primaryButton>


                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <CardPaymentModal />
    <BankTransferModal /> -->
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSubscriptionStore } from './subscriptionStore';
import { onBeforeRouteLeave } from 'vue-router';
import useFxn from '@/stores/Helpers/useFunctions';
// import CardPaymentModal from './cardPaymentModal.vue';
// import BankTransferModal from './bankTransferModal.vue';

const subscriptionStore = useSubscriptionStore()

const subscriptionOptionsModalOpen = ref<any>(null)
const subscriptionOptionsModalClose = ref<any>(null)


// type PaymentOptionTypes = 'card' | 'transfer'
// const paymentOptions = ref<{ icon: string, title: string, value: PaymentOptionTypes }[]>([
//     { icon: `bi bi-credit-card`, title: 'Card', value: "card" },
//     { icon: `bi bi-arrow-down-up`, title: 'Bank Transfer', value: "transfer" },
// ])
// const selectedOption = ref<PaymentOptionTypes>('card')


// function openSelectedOption() {
//     if (selectedOption.value == 'card') subscriptionStore.launchModal('cardPayment')
//     else subscriptionStore.launchModal('bankTransfer')
//     subscriptionStore.launchModal('options')
// }



watch(() => subscriptionStore.modal.options, () => {
    subscriptionOptionsModalOpen.value?.click()
})
onBeforeRouteLeave(() => {
    subscriptionOptionsModalClose.value?.click()
})
</script>

<style scoped>
.list-group-item:hover {
    background-color: #96929215;
}
</style>