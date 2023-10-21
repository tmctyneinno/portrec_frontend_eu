

<template>
    <div class="modal fade" id="editEducationModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Edit Education</h6>
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
                    <button :disabled="isLoading" @click="deleteEducation" type="button"
                        class="btn btn-danger rounded-0">Delete
                        Education</button>
                    <button @click="updateClick" :disabled="isLoading" type="button" class="btn btn-primary  rounded-0">Save
                        Changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch, ref, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore';
import { useEditingProfileStore } from '../editingProfileStore'
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';
import { useDateFormat } from '@vueuse/core';

const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()
const isLoading = ref(false)


const dp_format = (date: Date) => {
    const dateMe = useDateFormat(date, 'MMMM D, YYYY')
    return dateMe.value
}

const education = reactive<any>({
    institution: editingStore.educationToEdit.institution,
    qualification: editingStore.educationToEdit.qualification,
    start_date: new Date(editingStore.educationToEdit.start_date),
    end_date: editingStore.educationToEdit.end_date ? new Date(editingStore.educationToEdit.end_date) : null,
    description: editingStore.educationToEdit.description
})

watch(() => editingStore.educationToEdit, () => {
    education.institution = editingStore.educationToEdit.institution;
    education.qualification = editingStore.educationToEdit.qualification;
    education.start_date = new Date(editingStore.educationToEdit.start_date);
    education.end_date = editingStore.educationToEdit.end_date ? new Date(editingStore.educationToEdit.end_date) : null;
    education.description = editingStore.educationToEdit.description
})

const route = useRoute()

function deleteEducation() {
    if (!useFxn.isOnline()) {
        useFxn.toastShort('You are offline')
        return
    }
    useFxn.confirmDelete('Remove this History?', 'Yes, Remove')
        .then((result) => {
            if (result.isConfirmed) {
                isLoading.value = true
                userDeleteEducation()
            }
        })
}

async function userDeleteEducation() {
    try {
        await api.userEducationDelete(editingStore.educationToEdit.id);
        useFxn.toast('Education Deleted', 'success');
        profileStore.getUserProfile();
        btnX.value.click();


    } catch (error) {
        // 
    }
    finally {
        isLoading.value = false
    }
}


function updateClick() {
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

    useFxn.confirm('Confirm update?', 'Update History')
        .then((result) => {
            if (result.isConfirmed) {
                isLoading.value = true
                save()
            }
        })
}

async function save() {
    let id = editingStore.educationToEdit.id
    let obj = {
        institution: education.institution,
        qualification: education.qualification,
        start_date: editingStore.dateSubmitFormat(education.start_date),
        end_date: editingStore.dateSubmitFormat(education.end_date),
        description: education.description
    }
    try {
        let resp = await api.userEducation(obj, id)
        if (resp.status === 200) {
            useFxn.toast('Updated successfully', 'success')
            btnX.value.click();
            profileStore.getUserProfile()
        }
    } catch (error) {
        console.log(error);

    }
    finally {
        isLoading.value = false
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
