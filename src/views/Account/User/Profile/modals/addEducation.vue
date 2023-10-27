

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
                            <label class="cursor-pointer small">
                                <input v-model="isCurrentlyHere" class="form-check-input me-1" type="checkbox">
                                I currently school here
                            </label>
                        </div>
                        <div class="col-md-6" v-if="!isCurrentlyHere">
                            <label class="small">To * </label>
                            <VueDatePicker :format="dp_format" :teleport="true" hide-input-icon :clearable="false"
                                :max-date="new Date()" :min-date="education.start_date" :enable-time-picker="false"
                                auto-apply v-model="education.end_date">
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
import { useDateFormat } from '@vueuse/core';

const route = useRoute()
const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()

const isCurrentlyHere = ref(false)


const dp_format = (date: Date) => {
    const dateMe = useDateFormat(date, 'MMMM D, YYYY')
    return dateMe.value
}

const education = reactive<any>({
    institution: '',
    qualification: '',
    start_date: new Date(),
    end_date: new Date(),
    description: '',
})


const isSaving = ref(false)

function clickSave() {

    if (!useFxn.isOnline()) {
        useFxn.toastShort('You are offline')
        return
    }


    const requiredFields = ['start_date', 'qualification', 'institution'];

    for (const field of requiredFields) {
        if (!education[field]) {
            useFxn.toastShort(`Please complete field: ${field}`);
            return;
        }
    }

    isSaving.value = true
    save()
}

async function save() {

    let thisEndDate = isCurrentlyHere.value ? null : education.end_date;
    let obj = {
        institution: education.institution,
        qualification: education.qualification,
        start_date: editingStore.dateSubmitFormat(education.start_date),
        end_date: editingStore.dateSubmitFormat(thisEndDate),
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
