

<template>
    <div class="modal fade" id="editExperienceModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Edit Experience</h6>
                    <button :disabled="isLoading" @click="deleteExperience" type="button"
                        class="btn bg-danger-subtle text-danger btn-sm rounded-0 m-0 ms-3 py-1 px-3">
                        <i class="bi bi-x-lg"></i> Delete
                    </button>
                    <!-- <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Company * </label>
                            <input v-model="experience.company_name" type="text" class="form-control rounded-0">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Location * </label>
                            <input v-model="experience.company_location" type="text" class="form-control rounded-0">
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Title * </label>
                            <input v-model="experience.job_title" type="text" class="form-control rounded-0">
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Type * </label>
                            <v-select v-model="experience.work_type_id"
                                class="rounded-0 text-capitalize profile-edit-select" :clearable="false"
                                :options="jobTypesArray"></v-select>
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>

                        <div class="col-12">
                            <label class="form-label">Description * </label>
                            <textarea v-model="experience.description" class="form-control rounded-0" name="" id=""
                                rows="4"></textarea>
                            <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">From * </label>
                            <VueDatePicker :format="useFxn.dateDisplay" :teleport="true" hide-input-icon :clearable="false"
                                :max-date="new Date()" :enable-time-picker="false" auto-apply
                                v-model="experience.start_date">
                            </VueDatePicker>
                            <label class="cursor-pointer small">
                                <input v-model="isCurrentlyHere" class="form-check-input me-1" type="checkbox">
                                I currently work here
                            </label>
                        </div>
                        <div class="col-md-6" v-if="!isCurrentlyHere">
                            <label class="form-label">To * </label>
                            <VueDatePicker :format="useFxn.dateDisplay" :teleport="true" hide-input-icon :clearable="false"
                                :max-date="new Date()" :min-date="experience.start_date" :enable-time-picker="false"
                                auto-apply v-model="experience.end_date">
                            </VueDatePicker>
                        </div>


                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button ref="btnX" data-bs-dismiss="modal" class="btn btn-light rounded-0 ">
                        Cancel
                    </button>
                    <!-- <button :disabled="isLoading" @click="deleteExperience" type="button"
                        class="btn btn-danger rounded-0">Delete
                        Experience</button> -->
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

const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()
const jobsStore = useJobsStore()
const isLoading = ref(false)

const route = useRoute()

const jobTypesArray = computed(() => {
    return jobsStore.types.map((x: any) => ({ id: x.id, label: x.name }))
})


const experience = reactive<any>({
    company_name: editingStore.experienceToEdit.company_name,
    company_location: editingStore.experienceToEdit.company_location,
    start_date: new Date(editingStore.experienceToEdit.start_date),
    end_date: new Date(editingStore.experienceToEdit.end_date ?? new Date()),
    job_title: editingStore.experienceToEdit.job_title,
    work_type_id: jobTypesArray.value.find((x: any) => x.id == editingStore.experienceToEdit.work_type_id),
    description: editingStore.experienceToEdit.description,
    job_function_id: editingStore.experienceToEdit.job_function_id,
})

watch(() => editingStore.experienceToEdit, () => {
    experience.company_name = editingStore.experienceToEdit.company_name;
    experience.company_location = editingStore.experienceToEdit.company_location;
    experience.start_date = new Date(editingStore.experienceToEdit.start_date);
    experience.end_date = new Date(editingStore.experienceToEdit.end_date ?? new Date());
    experience.job_title = editingStore.experienceToEdit.job_title;
    experience.work_type_id = jobTypesArray.value.find((x: any) => x.id == editingStore.experienceToEdit.work_type_id);
    experience.description = editingStore.experienceToEdit.description;
    experience.job_function_id = editingStore.experienceToEdit.job_function_id;
})

const isCurrentlyHere = ref(false)

watch(() => editingStore.experienceToEdit.end_date, () => {
    isCurrentlyHere.value = editingStore.experienceToEdit.end_date ? false : true
})



function deleteExperience() {
    if (!useFxn.isOnline()) {
        useFxn.toastShort('You are offline')
        return
    }
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
        await api.userExperienceDelete(editingStore.experienceToEdit.id);
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

    if (!useFxn.isOnline()) {
        useFxn.toastShort('You are offline')
        return
    }

    const requiredFields = ['start_date', 'company_location', 'job_title', 'work_type_id', 'company_name'];

    for (const field of requiredFields) {
        if (!experience[field]) {
            useFxn.toastShort('Please complete all compulsory fields')
            return;
        }
    }

    useFxn.confirm('Confirm update?', 'Update Experience')
        .then((result) => {
            if (result.isConfirmed) {
                isLoading.value = true
                save()
            }
        })
}

async function save() {
    let id = editingStore.experienceToEdit.id
    let thisEndDate = isCurrentlyHere.value ? null : experience.end_date;
    let obj = {
        company_name: experience.company_name,
        company_location: experience.company_location,
        start_date: editingStore.dateSubmitFormat(experience.start_date),
        end_date: editingStore.dateSubmitFormat(thisEndDate),
        job_title: experience.job_title,
        // @ts-ignore
        work_type_id: experience.work_type_id.id,
        description: experience.description,
        job_function_id: experience.job_function_id
    }
    try {
        let resp = await api.userExperience(obj, id)

        if (resp.status) {
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


<style lang="css" scoped>
.btn-primary {
    width: 250px;
}
</style>

