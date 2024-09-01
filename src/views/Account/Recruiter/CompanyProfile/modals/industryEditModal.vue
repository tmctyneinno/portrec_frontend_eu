<template>
    <!-- Modal trigger button -->
    <button ref="modalOpen" type="button" class="btn  d-none" data-bs-toggle="modal"
        data-bs-target="#industryEditModal">
    </button>

    <div class="modal fade" id="industryEditModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title">
                        Update Industry
                        <div class="xsmall text-muted2">The Industry your comapny belongs to.</div>
                    </h5>
                    <button ref="modalClose" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc" :teleport="true"
                                v-model="industry" label="name" class="text-capitalize job-chooser " :clearable="false"
                                :options="company.resources.industry"></v-select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <primaryButton :btnClass="'w-100'" v-if="!isSaving" @click="save">
                        Update
                    </primaryButton>
                    <primaryButtonLoading :btnClass="'w-100'" v-else />
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

const industry = ref<any>(null)
const isSaving = ref(false)

async function save() {
    if (industry.value) {
        try {
            isSaving.value = true
            await api.recruiterUpdateCompany({ industry_id: industry.value.id })
            recruiterCommonStore.getCompanyInformation()
            useFxn.toast('Industry Updated', 'success')
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


function updateFields() {
    const checker = company.value.data.industry_id
    if (checker) {
        const found = company.value.resources.industry.find((x: any) => x.id == checker)
        industry.value = found
    }
}


watch(() => company.value.industryEditModal, () => {
    modalOpen.value.click()
    updateFields()
})

watch(() => route.fullPath, () => {
    modalClose.value.click()
})

</script>

<style lang="css" scoped></style>
