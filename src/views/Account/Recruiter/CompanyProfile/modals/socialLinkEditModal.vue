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
                    </h5>
                    <button ref="modalClose" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="form-label">Twitter</div>
                            <input class="form-control rounded-0" type="text">
                        </div>
                        <div class="col-12">
                            <div class="form-label">Facebook</div>
                            <input class="form-control rounded-0" type="text">
                        </div>
                        <div class="col-12">
                            <div class="form-label">Linkedin</div>
                            <input class="form-control rounded-0" type="text">
                        </div>
                        <div class="col-12">
                            <div class="form-label">Email</div>
                            <input class="form-control rounded-0" type="text">
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-primary rounded-0 w-100">Save</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRecruiterCommonStore } from '../../RecruiterCommonStore';
import { useRoute } from 'vue-router';

const recruiterCommonStore = useRecruiterCommonStore()
const modalOpen = ref<any>(null)
const modalClose = ref<any>(null)
const route = useRoute()

watch(() => recruiterCommonStore.companyProfile.socialLinksEditModal, () => {
    modalOpen.value.click()
})

watch(() => route.fullPath, () => {
    modalClose.value.click()
})

</script>

<style lang="css" scoped></style>
