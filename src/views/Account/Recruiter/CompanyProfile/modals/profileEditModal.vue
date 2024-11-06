<template>
    <!-- Modal trigger button -->
    <button ref="modalOpen" type="button" class="btn  d-none" data-bs-toggle="modal" data-bs-target="#profileEditModal">
    </button>

    <div class="modal fade" id="profileEditModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title">
                        Company Profile
                        <div class="xsmall text-muted2">Describe your company</div>
                    </h5>
                    <button ref="modalClose" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <textarea v-model="description" class="form-control " style="height: 200px;"></textarea>
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



const description = ref<any>(null)
const isSaving = ref(false)

async function save() {
    if (description.value) {
        try {
            isSaving.value = true
            await api.recruiterUpdateCompany({ description: description.value })
            recruiterCommonStore.getCompanyInformation()
            useFxn.toast('Description Updated', 'success')
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
    description.value = company.value.data.description
}

watchEffect(() => {
    updateFields()
})

watch(() => company.value.profileEditModal, () => {
    modalOpen.value.click()
    updateFields()
})

watch(() => route.fullPath, () => {
    modalClose.value.click()
})

</script>

<style lang="css" scoped></style>
