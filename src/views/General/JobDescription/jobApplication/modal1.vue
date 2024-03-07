<template>
    <div class="modal fade show d-block" style="background-color: rgba(0, 0, 0, 0.502);" tabindex="-1"
        data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId">
        <div class="modal-dialog " role="document">
            <div class="modal-content px-1 px-lg-2">
                <div class="modal-header">
                    <modalHeaderVue />
                </div>
                <div class="modal-body py-1">
                    <div class="fw-bold text-muted fs-5">Submit your application</div>
                    <div class="small text-muted lh-1 mb-2">
                        The following will only be shared with
                        {{ store.currentJob.company ?
                            store.currentJob.company.name : `this Company` }}
                    </div>
                    <progressBarVue />
                    <div class="row g-3 mt-1">
                        <div class="col-12">
                            <label class="fw-bold small">Full name</label>
                            <input :disabled="disableFields" v-model="store.applyData.fullname" type="text"
                                class="form-control rounded-0" placeholder="Enter your fullname">
                        </div>
                        <div class="col-12 col-lg-7">
                            <label class="fw-bold small">Email address</label>
                            <input :disabled="disableFields" v-model="store.applyData.email" type="text"
                                class="form-control rounded-0" placeholder="Enter your email address">
                        </div>
                        <div class="col-12 col-lg-5">
                            <label class="fw-bold small">Phone number</label>
                            <input :disabled="disableFields" v-model="store.applyData.phone" type="text"
                                class="form-control rounded-0" placeholder="Enter your phone number">
                        </div>
                        <div class="col-12 small text-muted">
                            By sending the request you can confirm that you accept our
                            <span class="theme-color">Terms of Service</span> and
                            <span class="theme-color"> Privacy Policy </span>
                        </div>
                    </div>
                    <div class="col-12 my-3">
                        <button
                            :disabled="!(store.applyData.fullname && store.applyData.email && store.applyData.phone)"
                            @click="store.switchModal(+1)" type="button"
                            class="btn btn-primary w-100 rounded-0">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
import modalHeaderVue from './modalHeader.vue';
import progressBarVue from './progressBar.vue'

const store = useJobApplicationStore()
const disableFields = ref(false)
onMounted(() => {
    const profile = store.myProfile?.data;
    if (profile) {
        store.applyData.fullname = profile.name
        store.applyData.email = profile.email
        store.applyData.phone = profile.phone
        store.applyData.isAuthUser = true
        disableFields.value = true
    }
})

</script>