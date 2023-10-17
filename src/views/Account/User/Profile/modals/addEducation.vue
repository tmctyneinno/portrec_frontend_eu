

<template>
    <div class="modal fade" id="addEducationModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Add Education</h6>
                    <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-12">
                            <label class="small">Institution * </label>
                            <textarea v-model="education.institution" class="form-control rounded-0" name="" id=""
                                rows="2"></textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="small">From * </label>
                            <VueDatePicker :format="dp_format" :teleport="true" hide-input-icon :clearable="false"
                                :max-date="new Date()" :enable-time-picker="false" auto-apply
                                v-model="education.start_date">
                            </VueDatePicker>
                        </div>
                        <div class="col-md-6">
                            <label class="small">To {{ !education.end_date ? '(present)' : '' }} </label>
                            <VueDatePicker :format="dp_format" :teleport="true" hide-input-icon
                                :min-date="education.start_date" :enable-time-picker="false" auto-apply
                                v-model="education.end_date">
                            </VueDatePicker>
                        </div>
                        <div class="col-12">
                            <label class="small">Qualification * </label>
                            <input v-model="education.qualification" type="text" class="form-control rounded-0">
                        </div>
                        <div class="col-12">
                            <label class="small">Description * </label>
                            <textarea v-model="education.description" class="form-control rounded-0" name="" id=""
                                rows="2"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button @click="clickSave" v-if="!isSaving" type="button"
                        class="btn btn-primary w-100 rounded-0">Save</button>
                    <button v-else class="btn btn-primary rounded-0 w-100" disabled>
                        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch, ref, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';
import { useEditingProfileStore } from '../editingProfileStore'

const route = useRoute()
const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()


const dp_format = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}


const education = reactive({
    institution: '',
    qualification: '',
    start_date: new Date(),
    end_date: null,
    description: '',
})


const isSaving = ref(false)

function clickSave() {
    if (!education.start_date ||
        !education.qualification ||
        !education.institution
    ) {
        useFxn.toastShort('Please complete all compulsory fields')
        return;
    }

    isSaving.value = true
    save()
}

async function save() {

    let obj = {
        institution: education.institution,
        qualification: education.qualification,
        start_date: editingStore.dateSubmitFormat(education.start_date),
        end_date: editingStore.dateSubmitFormat(education.end_date),
        description: education.description
    }

    try {
        let { data } = await api.userEducation(obj)
        if (data.status === 200) {
            useFxn.toast('Updated successfully', 'success')
            btnX.value.click();
            profileStore.getUserProfile()
            education.institution = education.description = education.qualification = ''
        }
    } catch (error) {
        // 
    }
    finally {
        isSaving.value = false
    }
}


const btnX = ref<any>(null)
watch(() => route.path, () => {
    btnX.value.click();
})

</script>


<style lang="css" scoped></style>

<style>
.dp__pointer {
    border-radius: 0px !important;
}
</style>
