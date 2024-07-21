<template>
    <div class="modal fade" id="addExperienceModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Add Experience</h6>
                    <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
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
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Title * </label>
                            <input v-model="experience.job_title" type="text" class="form-control rounded-0">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Type * </label>
                            <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                                v-model="experience.work_type_id" class="rounded-0 text-capitalize profile-edit-select"
                                :clearable="false" :options="jobTypesArray"></v-select>
                        </div>

                        <div class="col-12">
                            <label class="form-label">Description * </label>
                            <textarea v-model="experience.description" class="form-control rounded-0" name="" id=""
                                rows="2"></textarea>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">From * </label>
                            <VueDatePicker :format="useFxn.dateDisplay" :teleport="true" hide-input-icon
                                :clearable="false" :max-date="new Date()" :enable-time-picker="false" auto-apply
                                v-model="experience.start_date">
                            </VueDatePicker>
                            <label class="cursor-pointer small">
                                <input v-model="isCurrentlyHere" class="form-check-input me-1" type="checkbox">
                                I currently work here
                            </label>
                        </div>
                        <div class="col-md-6" v-if="!isCurrentlyHere">
                            <label class="form-label">To * </label>
                            <VueDatePicker :format="useFxn.dateDisplay" :teleport="true" hide-input-icon
                                :clearable="false" :max-date="new Date()" :min-date="experience.start_date"
                                :enable-time-picker="false" auto-apply v-model="experience.end_date">
                            </VueDatePicker>
                        </div>


                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button @click="clickSave" v-if="!isSaving" type="button"
                        class="btn btn-primary rounded-0">Save</button>
                    <button v-else class="btn btn-primary rounded-0" disabled>
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

const isCurrentlyHere = ref(false)

onMounted(() => {
    jobsStore.getJobTypes()
})

const jobTypesArray = computed(() => {
    return jobsStore.types.map((x: any) => ({ id: x.id, label: x.name }))
})


const experience = reactive<any>({
    company_name: '',
    company_location: '',
    start_date: new Date(),
    end_date: new Date(),
    job_title: '',
    work_type_id: '',
    description: '',
    job_function_id: '1'
})

const isSaving = ref(false)

function clickSave() {

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

    isSaving.value = true

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
            profileStore.getProfile()
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

<style scoped>
.btn {
    width: 250px;
}
</style>