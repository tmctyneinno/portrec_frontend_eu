<template>
    <!-- Modal trigger button -->
    <button ref="modalOpen" type="button" class="btn  d-none" data-bs-toggle="modal" data-bs-target="#topInfoEditModal">
    </button>

    <div class="modal fade" id="topInfoEditModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title">
                        Company Information
                        <div class="xsmall text-muted2">Company's basic information</div>
                    </h5>
                    <button ref="modalClose" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="form-label">Name <span class="text-danger">*</span> </div>
                            <input v-model="form.name" type="text" class="form-control rounded-0">
                        </div>

                        <div class="col-12">
                            <div class="form-label">Website</div>
                            <input v-model="form.website" type="text" class="form-control rounded-0">
                        </div>

                        <div class="col-12">
                            <div class="form-label">Address</div>
                            <input v-model="form.address" type="text" class="form-control rounded-0">
                        </div>
                        <div class="col-md-6">
                            <div class="form-label">Date Founded</div>
                            <VueDatePicker :format="useFxn.dateDisplay" :teleport="true" hide-input-icon
                                :clearable="false" :enable-time-picker="false" auto-apply v-model="form.date_founded">
                            </VueDatePicker>
                        </div>

                        <div class="col-md-6">
                            <div class="form-label">Number of Employees</div>
                            <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc" :teleport="true"
                                v-model="form.company_size" label="name" class="text-capitalize job-chooser "
                                :clearable="false" :options="company.resources.employees"></v-select>
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
import { reactive, ref, watch, watchEffect } from 'vue';
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

interface TopInfo {
    name: string,
    date_founded: Date,
    website: string,
    address: string,
    company_size: any
}

const form = reactive<TopInfo>({
    name: '',
    date_founded: new Date(),
    website: '',
    address: '',
    company_size: null
})
const isSaving = ref(false)

async function save() {
    if (!form.name) {
        useFxn.toast('Name is required!', 'warning')
        return
    }

    try {
        isSaving.value = true
        const obj = {
            name: form.name,
            date_founded: new Date(form.date_founded).toDateString(),
            website: form.website ?? null,
            address: form.address ?? null,
            company_size_id: form.company_size?.id ?? null
        }
        await api.recruiterUpdateCompany(obj)
        recruiterCommonStore.getCompanyInformation()
        useFxn.toast('Company information Updated', 'success')
        modalClose.value.click()
        isSaving.value = false
    } catch (error) {
        useFxn.toast('Sorry Something went wrong', 'error')
        modalClose.value.click()
        isSaving.value = false
        // console.log(error);

    }
}


function updateFields() {
    form.name = company.value.data.name
    form.address = company.value.data.address
    form.website = company.value.data.website
    const checker = company.value.data.company_size_id

    if (company.value.data.date_founded) form.date_founded = new Date(company.value.data.date_founded)
    if (checker) {
        const found = company.value.resources.employees.find((x: any) => x.id == checker)
        form.company_size = found
    }
}

watchEffect(() => {
    updateFields()
})

watch(() => company.value.topInfoEditModal, () => {
    modalOpen.value.click()
    updateFields()
})

watch(() => route.fullPath, () => {
    modalClose.value.click()
})

</script>

<style lang="css" scoped></style>
