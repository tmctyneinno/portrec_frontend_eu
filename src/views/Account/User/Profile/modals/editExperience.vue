

<template>
    <div class="modal fade" id="editExperienceModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Edit Experience</h6>
                    <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="small">Company * </label>
                            <input type="text" class="form-control rounded-0">
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>
                        <div class="col-md-6">
                            <label class="small">Location * </label>
                            <input type="text" class="form-control rounded-0">
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>
                        <div class="col-md-6">
                            <label class="small">Title * </label>
                            <input type="text" class="form-control rounded-0">
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>
                        <div class="col-md-6">
                            <label class="small">Type * </label>
                            <v-select class="rounded-0" :clearable="false"
                                :options="['Full Time', 'Remote', 'Internship', 'Part Time', 'Contract']"></v-select>
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>

                        <div class="col-12">
                            <label class="small">Description * </label>
                            <textarea class="form-control rounded-0" name="" id="" rows="2"></textarea>
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>

                        <div class="col-md-6">
                            <label class="small">Start * </label>
                            <input class="form-control rounded-0" type="date" name="" id="">
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>
                        <div class="col-md-6">
                            <label class="small">End </label>
                            <input class="form-control rounded-0" type="date" name="" id="">
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>


                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-primary w-100 rounded-0">Save</button>
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

