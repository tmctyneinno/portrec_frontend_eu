

<template>
    <div class="modal fade" id="editAbout" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
        aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">About Me</h6>
                    <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="col-12">

                        <div class="mb-">
                            <textarea class="form-control form-control-sm rounded-0" rows="5"></textarea>
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
                    <button type="button" class="btn btn-primary w-100">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const btnX = ref<any>(null)

watch(() => route.path, () => {
    btnX.value.click();
})

</script>


<style lang="css" scoped></style>
