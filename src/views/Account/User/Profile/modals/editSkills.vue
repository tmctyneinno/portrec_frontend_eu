

<template>
    <div class="modal fade" id="editSkillsModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Add/Edit Skills</h6>
                    <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body pt-0 ">
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="card shadow-sm border-0  rounded-0">
                                <div class="card-body xsmall ">
                                    <span v-for="i in 8" :key="i" class="skills-tag">my_skill_{{ i }}
                                        <i class="bi bi-x-lg theme-color cursor-pointer ms-3"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <label class="small">Add New Skill: </label>
                            <input type="text" class="form-control rounded-0">
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>
                        <div class="col-12">
                            <button type="button" class="btn btn-primary w-100 rounded-0">Save</button>
                        </div>
                    </div>
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


<style lang="css" scoped>
.skills-tag {
    background-color: var(--bs-light);
    padding: 5px 8px;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 10px;
}
</style>
