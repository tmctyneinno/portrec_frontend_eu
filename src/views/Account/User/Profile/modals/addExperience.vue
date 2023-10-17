<template>
    <div class="modal fade" id="addExperienceModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Add Experience</h6>
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
                        </div>
                        <div class="col-md-6">
                            <label class="small">Title * </label>
                            <input v-model="experience.job_title" type="text" class="form-control rounded-0">
                        </div>
                        <div class="col-md-6">
                            <label class="small">Type * </label>
                            <v-select v-model="experience.work_type_id" class="rounded-0" :clearable="false"
                                :options="jobTypesArray"></v-select>
                        </div>

                        <div class="col-12">
                            <label class="small">Description * </label>
                            <textarea v-model="experience.description" class="form-control rounded-0" name="" id=""
                                rows="2"></textarea>
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
                            <VueDatePicker :format="dp_format" :teleport="true" hide-input-icon :clearable="false"
                                :min-date="experience.start_date" :enable-time-picker="false" auto-apply
                                v-model="experience.end_date">
                            </VueDatePicker>
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
import { watch, ref, onMounted, computed, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { useJobsStore } from '@/stores/jobsStore';
import { useProfileStore } from '@/stores/profileStore';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';
import { useEditingProfileStore } from '../editingProfileStore'

const jobsStore = useJobsStore()
const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()

onMounted(() => {
    jobsStore.getJobTypes()
})

const jobTypesArray = computed(() => {
    return jobsStore.types.map((x: any) => ({ id: x.id, label: x.name }))
})

const dp_format = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}


const experience = reactive({
    company_name: '',
    company_location: '',
    start_date: new Date(),
    end_date: null,
    job_title: '',
    work_type_id: '',
    description: '',
    job_function_id: '1'
})

const isSaving = ref(false)

function clickSave() {
    if (!experience.company_location ||
        !experience.start_date ||
        !experience.job_title ||
        !experience.work_type_id ||
        !experience.company_name
    ) {
        useFxn.toastShort('Please complete all compulsory fields')
        return;

    }

    isSaving.value = true

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

    save(obj)
}

async function save(obj: any) {

    try {
        let { data } = await api.userExperience(obj)
        if (data.status === 200) {
            useFxn.toast('Updated successfully', 'success')
            btnX.value.click();
            experience.company_location = experience.company_name =
                experience.description = experience.job_title
                = experience.work_type_id = ''
            profileStore.getUserProfile()
        }
    } catch (error) {
        // 
    }
    finally {
        isSaving.value = false
    }
}

const route = useRoute()
const btnX = ref<any>(null)
watch(() => route.path, () => {
    btnX.value.click();
})

</script>