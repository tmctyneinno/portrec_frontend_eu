<template>
    <div>

        <button ref="openModal" class="btn d-none" data-bs-toggle="modal" data-bs-target="#jobPostingModalEdit">
        </button>

        <div class="modal  fade" id="jobPostingModalEdit" tabindex="-1" data-bs-backdrop="static"
            data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header p-3  border-0">
                        <ul class="nav justify-content-center nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item mx-lg-5" role="presentation">
                                <button class="nav-link text-start" :class="{ 'active': jobPosting.stage == 1 }"
                                    id="tab1-tab" type="button" role="tab" aria-selected="true">
                                    <div class="theme-color"> <i class="bi bi-1-circle-fill text-muted2"></i> Step1
                                    </div>
                                    <strong>Job Information</strong>
                                </button>
                            </li>
                            <li class="nav-item mx-lg-5" role="presentation">
                                <button class="nav-link text-start" :class="{ 'active': jobPosting.stage == 2 }"
                                    id="tab2-tab" type="button" role="tab" aria-selected="false">
                                    <div class="theme-color"><i class="bi bi-2-circle-fill text-muted2"></i> Step2</div>
                                    <strong>Job Description</strong>
                                </button>
                            </li>
                            <li class="nav-item mx-lg-5" role="presentation">
                                <button :class="{ 'active': jobPosting.stage == 3 }" class="nav-link text-start"
                                    id="tab3-tab" type="button" role="tab" aria-selected="false">
                                    <div class="theme-color"> <i class="bi bi-3-circle-fill text-muted2"></i> Step3
                                    </div>
                                    <strong>Perks & Benefits</strong>
                                </button>
                            </li>
                        </ul>
                        <!-- <h5 class="modal-title fw-bold text-center">Post a Job</h5> -->
                        <!-- <button ref="closeModal" type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button> -->
                    </div>
                    <div class="modal-body">



                        <!-- Tab panes -->
                        <div class="tab-content py-3">
                            <div v-if="jobPosting.stage == 1">
                                <div>
                                    <strong>Basic Information</strong>
                                    <div class="text-muted small">
                                        This information will be displayed publicly
                                    </div>
                                </div>
                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Job Title <span class="text-danger">*</span></strong>
                                        <div class="text-muted small">
                                            Job titles must be describe one position
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <input v-model="form.title" type="text" class="form-control rounded-0"
                                            placeholder="e.g. Software Engineer">
                                    </div>
                                </div>
                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Type of Employment <span class="text-danger">*</span></strong>
                                        <div class="text-muted small">
                                            Select type of employment
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                                            :teleport="true" v-model="form.job_type_id"
                                            class="text-capitalize job-chooser" :clearable="false"
                                            :options="dropdowns.jobTypes" :reduce="(x: any) => x.id"
                                            label="name"></v-select>

                                    </div>
                                </div>
                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Industry <span class="text-danger">*</span></strong>
                                        <div class="text-muted small">
                                            Select industry
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                                            :teleport="true" v-model="form.industry_id"
                                            class="text-capitalize job-chooser" :clearable="false"
                                            :options="dropdowns.jobIndustries" :reduce="(x: any) => x.id"
                                            label="name"></v-select>

                                    </div>
                                </div>

                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Job Level <span class="text-danger">*</span></strong>
                                        <div class="text-muted small">
                                            Select level of employment
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                                            :teleport="true" v-model="form.job_level_id"
                                            class="text-capitalize job-chooser" :clearable="false"
                                            :options="dropdowns.jobLevels" :reduce="(x: any) => x.id"
                                            label="name"></v-select>

                                    </div>
                                </div>
                                <hr>

                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Job Category <span class="text-danger">*</span></strong>
                                        <div class="text-muted small">
                                            Select job category
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                                            :teleport="true" v-model="form.job_function_id"
                                            class="text-capitalize job-chooser" :clearable="false"
                                            :options="dropdowns.jobFunctions" :reduce="(x: any) => x.id"
                                            label="name"></v-select>
                                    </div>

                                </div>

                                <hr>

                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Required Skills <span class="text-danger">*</span></strong>
                                        <div class="text-muted small">
                                            You can select multiple required skills
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <!-- <button class="btn btn-sm btn-primary-outline rounded-0">
                                            <i class="bi bi-plus-lg"></i> Add Skills
                                        </button> -->
                                        <v-select multiple append-to-body
                                            :calculate-position="useFxn.vueSelectPositionCalc" :teleport="true"
                                            v-model="form.required_skills" label="name"
                                            class="text-capitalize job-chooser" :clearable="false"
                                            :options="skillsDropdown"></v-select>
                                    </div>

                                </div>

                                <hr>


                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Salary</strong>
                                        <div class="text-muted small">
                                            Enter job Salary Offer
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <div class="row g-2">
                                            <div class="col-lg-2">
                                                <label class="small"></label>
                                                <select class="form-select" name="" id="">
                                                    <option value="$" selected>$</option>
                                                    <option value="N">&#8358;</option>
                                                </select>

                                            </div>
                                            <div class="col-lg-5">
                                                <label class="small">Min. Salary</label>
                                                <input placeholder="0.00" type="text" v-model="form.min_salary"
                                                    class="form-control rounded-0" v-maska data-maska="9,99#.##"
                                                    data-maska-tokens="9:[0-9]:repeated" data-maska-reversed />
                                            </div>
                                            <div class="col-lg-5">
                                                <label class="small">Max. Salary</label>
                                                <input placeholder="0.00" type="text" v-model="form.max_salary"
                                                    class="form-control rounded-0" v-maska data-maska="9,99#.##"
                                                    data-maska-tokens="9:[0-9]:repeated" data-maska-reversed />
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <hr>

                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Deadline <span class="text-danger">*</span></strong>
                                        <div class="text-muted small">
                                            Enter Application deadline
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <VueDatePicker :format="useFxn.dateDisplay" :teleport="true" hide-input-icon
                                            :clearable="false" :enable-time-picker="false" auto-apply
                                            v-model="form.deadline">
                                        </VueDatePicker>
                                    </div>

                                </div>

                                <hr>

                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Location <span class="text-danger">*</span></strong>
                                        <div class="text-muted small">
                                            Enter Location
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <textarea placeholder="enter location.." class="form-control rounded-0" rows="2"
                                            v-model="form.location"></textarea>
                                    </div>

                                </div>

                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Capacity <span class="text-danger">*</span></strong>
                                        <div class="text-muted small">
                                            Enter Application capacity
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <input placeholder="0.00" type="text" v-model="form.capacity"
                                            class="form-control rounded-0" v-maska data-maska="9#"
                                            data-maska-tokens="9:[0-9]:repeated" data-maska-reversed />
                                    </div>

                                </div>

                            </div>
                            <div v-if="jobPosting.stage == 2">
                                <div>
                                    <strong>Details</strong>
                                    <div class="text-muted small">
                                        Add the description of the job, responsibilities, who you are, and
                                        nice-to-haves.
                                    </div>
                                </div>
                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Job Descriptions <span class="text-danger">*</span></strong>
                                        <div class="text-muted small">
                                            Job titles must be describe one position
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <textarea v-model="form.description" class="form-control rounded-0" rows="3"
                                            placeholder="Enter job description"></textarea>
                                        <!-- <small class="text-muted">minimum of 500 characters</small> -->
                                    </div>
                                </div>

                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Job Experience- <span class="text-danger">*</span></strong>
                                        <div class="text-muted small">
                                            Enter Job experience
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <textarea v-model="form.experience" class="form-control rounded-0" rows="3"
                                            placeholder="Enter job experience"></textarea>
                                        <!-- <small class="text-muted">minimum of 500 characters</small> -->
                                    </div>
                                </div>


                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Responsibilities</strong>
                                        <div class="text-muted small">
                                            Outline the core responsibilities of the position
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <div v-for="(item, index) in form.temp_responsibilities" :key="index"
                                            class="row g-3 mb-2 ">

                                            <!-- <div class="row g-3"> -->
                                            <div class="col-md-11">
                                                <textarea v-model="item.descriptions" class="form-control rounded-0"
                                                    rows="2" placeholder="enter responsibility"></textarea>
                                            </div>
                                            <div class="col-md-1">
                                                <button @click="form.temp_responsibilities.splice(index, 1)"
                                                    v-if="form.temp_responsibilities.length > 1"
                                                    class="float-en btn btn-sm m-0 p-0 btn-link text-danger border-0">
                                                    <i class="bi bi-x"></i>
                                                </button>
                                            </div>


                                            <!-- </div> -->
                                        </div>
                                        <button @click="addNewRecord('temp_responsibilities')"
                                            style="font-size: 11px;border-style: dotted;"
                                            class="btn btn-ligh border-0 fw-bold theme-color w-100 ">
                                            click here add to new line
                                            <i class="bi bi-plus-circle-dotted"></i>
                                        </button>
                                    </div>
                                </div>
                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Who You Are</strong>
                                        <div class="text-muted small">
                                            Add your preferred candidates qualifications
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <div v-for="(item, index) in form.temp_WhoYouAre" :key="index"
                                            class="row g-3 mb-2 ">

                                            <!-- <div class="row g-3"> -->
                                            <div class="col-md-11">
                                                <textarea v-model="item.descriptions" class="form-control rounded-0"
                                                    rows="2" placeholder="enter here..."></textarea>
                                            </div>
                                            <div class="col-md-1">
                                                <button @click="form.temp_WhoYouAre.splice(index, 1)"
                                                    v-if="form.temp_WhoYouAre.length > 1"
                                                    class="float-en btn btn-sm m-0 p-0 btn-link text-danger border-0">
                                                    <i class="bi bi-x"></i>
                                                </button>
                                            </div>


                                            <!-- </div> -->
                                        </div>
                                        <button @click="addNewRecord('temp_WhoYouAre')"
                                            style="font-size: 11px;border-style: dotted;"
                                            class="btn btn-ligh border-0 fw-bold theme-color w-100 ">
                                            click here add to new line
                                            <i class="bi bi-plus-circle-dotted"></i>
                                        </button>
                                    </div>
                                </div>
                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-5">
                                        <strong>Nice-To-Haves</strong>
                                        <div class="text-muted small">
                                            Add nice-to-have skills and qualifications for the role to encourage a more
                                            diverse set of candidates to apply
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <div v-for="(item, index) in form.temp_niceToHave" :key="index"
                                            class="row g-3 mb-2 ">

                                            <!-- <div class="row g-3"> -->
                                            <div class="col-md-11">
                                                <textarea v-model="item.descriptions" class="form-control rounded-0"
                                                    rows="2" placeholder="enter here..."></textarea>
                                            </div>
                                            <div class="col-md-1">
                                                <button @click="form.temp_niceToHave.splice(index, 1)"
                                                    v-if="form.temp_niceToHave.length > 1"
                                                    class="float-en btn btn-sm m-0 p-0 btn-link text-danger border-0">
                                                    <i class="bi bi-x"></i>
                                                </button>
                                            </div>


                                            <!-- </div> -->
                                        </div>
                                        <button @click="addNewRecord('temp_niceToHave')"
                                            style="font-size: 11px;border-style: dotted;"
                                            class="btn btn-ligh border-0 fw-bold theme-color w-100 ">
                                            click here add to new line
                                            <i class="bi bi-plus-circle-dotted"></i>
                                        </button>
                                    </div>
                                </div>


                            </div>
                            <div v-if="jobPosting.stage == 3">
                                <div>
                                    <strong>Basic Information</strong>
                                    <div class="text-muted small">
                                        List out your top perks and benefits.
                                    </div>
                                </div>
                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-3">
                                        <strong>Perks and Benefits</strong>
                                        <div class="text-muted small">
                                            Encourage more people to apply by sharing the attractive rewards and
                                            benefits you offer your employees
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="row">
                                            <div class="mb-2">
                                                <input v-model="benefitsForm.title" type="text"
                                                    class="form-control rounded-0" placeholder="title">
                                            </div>
                                            <div class="mb-2">
                                                <textarea v-model="benefitsForm.description" placeholder="description"
                                                    class="form-control rounded-0" rows="2"></textarea>
                                            </div>
                                            <div>
                                                <button @click="pushBenefits"
                                                    class="btn btn-primary-outline rounded-0 float-end">
                                                    <i class="bi bi-plus-lg"></i> Add Benefit
                                                </button>
                                            </div>
                                        </div>
                                        <div class="row g-3 mt-3">
                                            <div v-for="(x, index) in form.benefits" :key="index" class="col-lg-6">
                                                <div class="card h-100">

                                                    <div class="card-body">
                                                        <div class="card-title">
                                                            <span @click="form.benefits.splice(index, 1)"
                                                                class="float-end btn border-0">
                                                                <i class="bi bi-x-lg"></i>
                                                            </span>
                                                        </div>
                                                        <div class="fw-bold">{{ x.title }}</div>
                                                        {{ x.descriptions }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="modal-footer border-" v-if="form.isSaving">
                        <button class="btn btn-primary rounded-0" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Saving
                        </button>
                    </div>
                    <div class="modal-footer border-" v-else>
                        <button ref="closeModal" type="button" class="btn btn-light rounded-0" data-bs-dismiss="modal"
                            aria-label="Close">Cancel</button>
                        <button v-if="[2, 3].includes(jobPosting.stage)" @click="goToPrevious" type="button"
                            class="btn btn-secondary rounded-0">
                            <i class=" bi bi-chevron-left"></i> Back
                        </button>
                        <button :disabled="stepIsComplete > 0" v-if="[1, 2].includes(jobPosting.stage)"
                            @click="goToNext" type="button" class="btn btn-primary rounded-0">
                            Next <i class=" bi bi-chevron-right"></i>
                        </button>


                        <button @click="submitJobPosting" v-if="jobPosting.stage == 3" type="button"
                            class="btn btn-primary rounded-0">
                            Post Job
                        </button>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRecruiterCommonStore } from '../RecruiterCommonStore'
import { storeToRefs } from 'pinia';
import useFxn from '@/stores/Helpers/useFunctions';
import { vMaska } from "maska";
import { useProfileStore } from '@/stores/profileStore';
import api from '@/stores/Helpers/axios'

const route = useRoute()
const recruiterCommonStore = useRecruiterCommonStore()
const profileStore = useProfileStore()
const { jobPostingDropdowns: dropdowns, jobPostingFields: form, jobPosting } = storeToRefs(recruiterCommonStore)

// modal
const openModal = ref<any>(null)
const closeModal = ref<any>(null)

watch(() => jobPosting.value.modal, () => {
    openModal.value.click()
    jobPosting.value.stage = 1
});
watch(() => route, () => {
    closeModal.value.click()
}, { deep: true })




// step1 #####################################
const skillsDropdown = computed(() => {
    // @ts-ignore
    const ids = form.value.required_skills.map(x => x.id)
    return dropdowns.value.skills.filter((x: any) => !ids.includes(x.id))
})



// step2 #####################################
function addNewRecord(prop: string) {
    //@ts-ignore
    form.value[prop].push({
        descriptions: '',
    })
}




// step3 ##########################################
const benefitsForm = reactive({
    title: '',
    description: ''
})

function pushBenefits() {

    if (benefitsForm.title && benefitsForm.description)
        // @ts-ignore
        form.value.benefits.push({
            title: benefitsForm.title,
            descriptions: benefitsForm.description
        })

    benefitsForm.description = benefitsForm.title = ''

}




// actions ###############################

function goToNext() {
    jobPosting.value.stage += 1
}

function goToPrevious() {
    jobPosting.value.stage -= 1
}


const stepIsComplete = computed(() => {
    let bool = 0;
    const step1 = ['job_level_id', 'job_function_id', 'industry_id', 'job_type_id', 'title', 'required_skills', 'deadline', 'location', 'capacity']
    const step2 = ['description', 'experience']
    if (jobPosting.value.stage == 1) {
        step1.forEach(element => {
            // @ts-ignore
            if (form.value[element] == '') bool += 1
        });
    }
    else if (jobPosting.value.stage == 2) {
        step2.forEach(element => {
            // @ts-ignore
            if (form.value[element] == '') bool += 1
        });
    }

    return bool
})


function submitJobPosting() {
    const obj = { ...form.value }
    const validWhoWeAre = obj.temp_niceToHave.filter((x: any) => x.descriptions.trim() !== '')
    const validResposibilities = obj.temp_responsibilities.filter((x: any) => x.descriptions.trim() !== '')
    const validNiceToHave = obj.temp_niceToHave.filter((x: any) => x.descriptions.trim() !== '')
    const other_qualifications: any = [];

    if (validResposibilities.length) {
        other_qualifications.push({
            title: 'Responsibilities',
            descriptions: [validResposibilities.map((x: { descriptions: any; }) => x.descriptions).toString()]
        })
    }

    if (validNiceToHave.length) {
        other_qualifications.push({
            title: 'Nice-To-Haves',
            descriptions: [validNiceToHave.map((x: { descriptions: any; }) => x.descriptions).toString()]
        })
    }

    if (validWhoWeAre.length) {
        other_qualifications.push({
            title: 'Who We Are',
            descriptions: [validWhoWeAre.map((x: { descriptions: any; }) => x.descriptions).toString()]
        })
    }

    obj.other_qualifications = JSON.stringify(other_qualifications)
    obj.benefits = JSON.stringify(obj.benefits)
    obj.required_skills = JSON.stringify(obj.required_skills)
    obj.company_id = profileStore.profile.company_id
    obj.deadline = new Date(obj.deadline)
    obj.responsibilities = 'resonsibilities'
    obj.total_applied = '0'
    console.log(obj);
    saveFormToApi(obj)
}

async function saveFormToApi(obj: any) {
    form.value.isSaving = true;
    try {
        const resp = await api.recruiterJobPosting(obj)
        if (resp.status == 201) {
            useFxn.toast('Job posted', 'success')
        }
    } catch (error) {
        console.log(error);
        useFxn.toast('Sorry, Something Went Wrong', 'error')
    }
    finally {
        jobPosting.value.modal = !jobPosting.value.modal
        form.value.isSaving = false;
    }

}

</script>

<style scoped>
.form-select {
    border-radius: 0px !important;
}
</style>

<style>
.job-chooser .vs__search {
    line-height: 1.7rem !important;
    border-radius: 0px !important;
    border: 0px !important;
}
</style>
