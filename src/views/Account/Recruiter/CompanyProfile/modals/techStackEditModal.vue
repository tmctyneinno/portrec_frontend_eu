<template>
    <!-- Modal trigger button -->
    <button ref="modalOpen" type="button" class="btn  d-none" data-bs-toggle="modal"
        data-bs-target="#techStackEditModal">
    </button>

    <div class="modal fade" id="techStackEditModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title">
                        Tech Stack
                    </h5>
                    <button ref="modalClose" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <textarea v-model="tech_stack" class="form-control "
                                placeholder="state tech stack of your company" style="height: 100px;"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <primaryButton :className="'w-100'" v-if="!isSaving" @click="save">
                        Update
                    </primaryButton>
                    <primaryButtonLoading :className="'w-100'" v-else />
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';
import { useRecruiterCommonStore } from '../../RecruiterCommonStore';
import { useRoute } from 'vue-router';
import useFxn from '@/stores/Helpers/useFunctions';
import { storeToRefs } from 'pinia';
import api from '@/stores/Helpers/axios'

const recruiterCommonStore = useRecruiterCommonStore()
const { companyProfile: company } = storeToRefs(recruiterCommonStore)

const modalOpen = ref<any>(null)
const modalClose = ref<any>(null)
const route = useRoute()


const tech_stack = ref<any>(null)
const isSaving = ref(false)

async function save() {
    if (tech_stack.value) {
        try {
            isSaving.value = true
            await api.recruiterUpdateCompany({ tech_stack: tech_stack.value })
            recruiterCommonStore.getCompanyInformation()
            useFxn.toast('Tech Stack Updated', 'success')
            modalClose.value.click()
            isSaving.value = false
        } catch (error) {
            useFxn.toast('Sorry Something went wrong', 'error')
            modalClose.value.click()
            isSaving.value = false
            // console.log(error);

        }
    }
}

watchEffect(() => {
    tech_stack.value = company.value.data.tech_stack
})


watch(() => company.value.techStackEditModal, () => {
    modalOpen.value.click()
})

watch(() => route.fullPath, () => {
    modalClose.value.click()
})

</script>

<style lang="css" scoped></style>
