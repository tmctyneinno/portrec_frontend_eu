<template>
    <!-- Modal trigger button -->
    <button ref="modalOpen" type="button" class="btn  d-none" data-bs-toggle="modal"
        data-bs-target="#socialLinkEditModal">
    </button>

    <div class="modal fade" id="socialLinkEditModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered " role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title">
                        Social links
                        <div class="xsmall text-muted2">Company's social media handles</div>
                    </h5>
                    <button ref="modalClose" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="form-label">Twitter</div>
                            <input v-model="form.twitter" class="form-control " type="text" placeholder="@..">
                        </div>
                        <div class="col-md-6">
                            <div class="form-label">Facebook</div>
                            <input v-model="form.facebook" class="form-control " type="text" placeholder="@..">
                        </div>
                        <div class="col-md-6">
                            <div class="form-label">Instagram</div>
                            <input v-model="form.instagram" class="form-control " type="text" placeholder="@..">
                        </div>
                        <div class="col-md-6">
                            <div class="form-label">Linkedin</div>
                            <input v-model="form.linkedin" class="form-control " type="text" placeholder="@..">
                        </div>
                        <div class="col-12">
                            <div class="form-label">Company Email</div>
                            <input v-model="form.email" class="form-control " type="text">
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

const form = reactive({
    instagram: null,
    twitter: null,
    email: null,
    linkedin: null,
    facebook: null
})
const isSaving = ref(false)

async function save() {
    try {
        isSaving.value = true
        await api.recruiterUpdateCompany(form)
        recruiterCommonStore.getCompanyInformation()
        useFxn.toast('Social links Updated', 'success')
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
    form.instagram = company.value.data.instagram
    form.twitter = company.value.data.twitter
    form.email = company.value.data.email
    form.facebook = company.value.data.facebook
    form.linkedin = company.value.data.linkedin
}

watchEffect(() => {
    updateFields()
})

watch(() => company.value.socialLinksEditModal, () => {
    modalOpen.value.click()
    updateFields()
})

watch(() => route.fullPath, () => {
    modalClose.value.click()
})

</script>

<style lang="css" scoped></style>
