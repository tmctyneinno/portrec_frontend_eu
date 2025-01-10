<template>
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <div v-if="isVerifying" class="d-flex justify-content-center min-vh-50 align-items-center">
                <div class="text-center">
                    <div class="spinner-border text-success " style="width: 5rem; height: 5rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="text-center text-muted fs-5 fw-bold">
                        Verifying Payment..
                    </div>
                </div>
            </div>
            <div v-else>
                <div v-if="verificationError" class="d-flex justify-content-center min-vh-50 align-items-center">
                    <div class="text-center">
                        <i class="bi bi-x-circle text-danger" style="font-size: 5rem;"></i>
                        <div class="text-center text-danger-emphasis fs-5 fw-bold">
                            Sorry Something went wrong, could not verify Payment. Pls contact admin
                        </div>
                    </div>
                </div>
                <div v-else class="d-flex justify-content-center min-vh-50 align-items-center">
                    <div class="text-center">
                        <i class="bi bi-check-circle text-success" style="font-size: 5rem;"></i>
                        <div class="text-center text-success-emphasis fs-5 fw-bold">
                            Verification Successful.
                        </div>
                        <router-link class="theme-color fw-bold" to="/user/dashboard">Go to dashboard</router-link>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import api from '@/stores/Helpers/axios'
import { useRoute } from 'vue-router';

const isVerifying = ref<boolean>(true)
const verifyData = ref<any>(null)
const verificationError = ref<boolean>(false)
const routeString = ref<string>('')

const route = useRoute()


onMounted(() => {
    routeString.value = `?status=${route.query.status}&tx_ref=${route.query.tx_ref}&transaction_id=${route.query.transaction_id}`
    verifyPayment()
})

async function verifyPayment() {
    try {
        const resp = await api.recruiterVerifyPayment(routeString.value)
        if (resp.status == 200) {
            verifyData.value = resp.data
            isVerifying.value = false
        }

    } catch (error) {
        verificationError.value = true
    }
}










</script>

<style lang="css" scoped></style>
