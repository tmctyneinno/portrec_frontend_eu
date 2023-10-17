

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
                            <input v-model="experience.company_name" type="text" class="form-control rounded-0">
                        </div>
                        <div class="col-md-6">
                            <label class="small">Location * </label>
                            <input v-model="experience.company_location" type="text" class="form-control rounded-0">
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>
                        <div class="col-md-6">
                            <label class="small">Title * </label>
                            <input v-model="experience.job_title" type="text" class="form-control rounded-0">
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>
                        <div class="col-md-6">
                            <label class="small">Type * </label>
                            <v-select v-model="experience.work_type_id" class="rounded-0" :clearable="false"
                                :options="jobTypesArray"></v-select>
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>

                        <div class="col-12">
                            <label class="small">Description * </label>
                            <textarea v-model="experience.description" class="form-control rounded-0" name="" id=""
                                rows="2"></textarea>
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>

                        <div class="col-md-6">
                            <label class="small">From * </label>
                            <VueDatePicker :format="dp_format" :teleport="true" hide-input-icon :clearable="false"
                                :max-date="new Date()" :enable-time-picker="false" auto-apply
                                v-model="experience.start_date">
                            </VueDatePicker>
                        </div>
                        <div class="col-md-6">
                            <label class="small">To {{ !experience.end_date ? '(present)' : '' }} </label>
                            <VueDatePicker :format="dp_format" :teleport="true" hide-input-icon
                                :min-date="experience.start_date" :enable-time-picker="false" auto-apply
                                v-model="experience.end_date">
                            </VueDatePicker>
                        </div>


                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button :disabled="isLoading" @click="deleteExperience" type="button"
                        class="btn btn-danger rounded-0">Delete
                        Experience</button>
                    <button @click="updateClick" :disabled="isLoading" type="button" class="btn btn-primary  rounded-0">Save
                        Changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch, ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore';
import { useEditingProfileStore } from '../editingProfileStore'
import { useJobsStore } from '@/stores/jobsStore';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';
import { useDateFormat } from '@vueuse/core';

const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()
const jobsStore = useJobsStore()
const isLoading = ref(false)

const route = useRoute()


const jobTypesArray = computed(() => {
    return jobsStore.types.map((x: any) => ({ id: x.id, label: x.name }))
})

const dp_format = (date: Date) => {
    const dateMe = useDateFormat(date, 'MMMM D, YYYY')
    return dateMe.value
}

const experience = reactive({
    company_name: editingStore.experienceToEdit.company_name,
    company_location: editingStore.experienceToEdit.company_location,
    start_date: new Date(editingStore.experienceToEdit.start_date),
    end_date: editingStore.experienceToEdit.end_date ? new Date(editingStore.experienceToEdit.end_date) : null,
    job_title: editingStore.experienceToEdit.job_title,
    work_type_id: editingStore.experienceToEdit.work_type_id,
    description: editingStore.experienceToEdit.description,
    job_function_id: editingStore.experienceToEdit.job_function_id,
})

watch(() => editingStore.experienceToEdit, () => {
    experience.company_name = editingStore.experienceToEdit.company_name;
    experience.company_location = editingStore.experienceToEdit.company_location;
    experience.start_date = new Date(editingStore.experienceToEdit.start_date);
    experience.end_date = editingStore.experienceToEdit.end_date ? new Date(editingStore.experienceToEdit.end_date) : null;
    experience.job_title = editingStore.experienceToEdit.job_title;
    experience.work_type_id = editingStore.experienceToEdit.work_type_id;
    experience.description = editingStore.experienceToEdit.description;
    experience.job_function_id = editingStore.experienceToEdit.job_function_id;
})


function deleteExperience() {
    useFxn.confirmDelete('Remove this Experience?', 'Yes, Remove')
        .then((result) => {
            if (result.isConfirmed) {
                isLoading.value = true
                userDeleteExperience()
            }
        })
}

async function userDeleteExperience() {
    try {
        await api.userExperienceDelete(editingStore.educationToEdit.id);
        useFxn.toast('Experience Deleted', 'success');
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

    if (!experience.company_location ||
        !experience.start_date ||
        !experience.job_title ||
        !experience.work_type_id ||
        !experience.company_name
    ) {
        useFxn.toastShort('Please complete all compulsory fields')
        return;

    }

    useFxn.confirm('Confirm update?', 'Update Education')
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
        company_name: experience.company_name,
        company_location: experience.company_location,
        start_date: editingStore.dateSubmitFormat(experience.start_date),
        end_date: editingStore.dateSubmitFormat(experience.end_date),
        job_title: experience.job_title,
        // @ts-ignore
        work_type_id: experience.work_type_id.id,
        description: experience.description,
        job_function_id: experience.job_function_id
    }
    try {
        let resp = await api.userExperience(obj, id)
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

