<template>
    <div>

        <button ref="openModal" class="btn d-none" data-bs-toggle="modal" data-bs-target="#jobPostingModalEdit">
        </button>

        <div class="modal  fade" id="jobPostingModalEdit" tabindex="-1" data-bs-backdrop="static"
            data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header p-3  border-0">
                        <ul class="nav justify-content-center nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item mx-lg-5" role="presentation">
                                <button class="nav-link text-start"
                                    :class="{ 'active': recruiterCommonStore.jobPosting.stage == 1 }" id="tab1-tab"
                                    type="button" role="tab" aria-selected="true">
                                    <div class="theme-color"> <i class="bi bi-1-circle-fill text-muted2"></i> Step1
                                    </div>
                                    <strong>Job Information</strong>
                                </button>
                            </li>
                            <li class="nav-item mx-lg-5" role="presentation">
                                <button class="nav-link text-start"
                                    :class="{ 'active': recruiterCommonStore.jobPosting.stage == 2 }" id="tab2-tab"
                                    type="button" role="tab" aria-selected="false">
                                    <div class="theme-color"><i class="bi bi-2-circle-fill text-muted2"></i> Step2</div>
                                    <strong>Job Description</strong>
                                </button>
                            </li>
                            <li class="nav-item mx-lg-5" role="presentation">
                                <button :class="{ 'active': recruiterCommonStore.jobPosting.stage == 3 }"
                                    class="nav-link text-start" id="tab3-tab" type="button" role="tab"
                                    aria-selected="false">
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
                            <div v-if="recruiterCommonStore.jobPosting.stage == 1">
                                <div>
                                    <strong>Basic Information</strong>
                                    <div class="text-muted small">
                                        This information will be displayed publicly
                                    </div>
                                </div>
                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-4">
                                        <strong>Job Title</strong>
                                        <div class="text-muted small">
                                            Job titles must be describe one position
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control rounded-0"
                                            placeholder="e.g. Software Engineer">
                                    </div>
                                </div>
                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-4">
                                        <strong>Type of Employment</strong>
                                        <div class="text-muted small">
                                            You can select multiple type of employment
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="list-group">
                                            <label class="list-group-item border-0 ps-0">
                                                <input class="form-check-input me-1" type="checkbox" value="" checked />
                                                Full-Time
                                            </label>
                                            <label class="list-group-item border-0 ps-0">
                                                <input class="form-check-input me-1" type="checkbox" value="" checked />
                                                Part-Time
                                            </label>
                                            <label class="list-group-item border-0 ps-0">
                                                <input class="form-check-input me-1" type="checkbox" value="" />
                                                Remote
                                            </label>
                                            <label class="list-group-item border-0 ps-0">
                                                <input class="form-check-input me-1" type="checkbox" value="" />
                                                Intenship
                                            </label>
                                            <label class="list-group-item border-0 ps-0">
                                                <input class="form-check-input me-1" type="checkbox" value="" />
                                                Contract
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <hr>

                                <div class="row g-3">
                                    <div class="col-md-4">
                                        <strong>Categories</strong>
                                        <div class="text-muted small">
                                            You can select multiple job categories
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-label">Select Job Categories</div>
                                        <select class="form-select form-select-l" name="" id="">
                                            <option selected>Select Job Categories</option>
                                        </select>
                                    </div>

                                </div>

                                <hr>

                                <div class="row g-3">
                                    <div class="col-md-4">
                                        <strong>Required Skills</strong>
                                        <div class="text-muted small">
                                            You can select multiple job categories
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <button class="btn btn-sm btn-primary-outline rounded-0">
                                            <i class="bi bi-plus-lg"></i> Add Skills
                                        </button>
                                    </div>

                                </div>

                            </div>
                            <div v-if="recruiterCommonStore.jobPosting.stage == 2">
                                <div>
                                    <strong>Details</strong>
                                    <div class="text-muted small">
                                        Add the description of the job, responsibilities, who you are, and
                                        nice-to-haves.
                                    </div>
                                </div>
                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-4">
                                        <strong>Job Descriptions</strong>
                                        <div class="text-muted small">
                                            Job titles must be describe one position
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <textarea class="form-control" rows="3"
                                            placeholder="Enter job description"></textarea>
                                        <small class="text-muted">minimum of 500 characters</small>
                                    </div>
                                </div>
                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-4">
                                        <strong>Responsibilities</strong>
                                        <div class="text-muted small">
                                            Outline the core responsibilities of the position
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <textarea class="form-control" rows="3"
                                            placeholder="Enter job description"></textarea>
                                        <small class="text-muted">minimum of 500 characters</small>
                                    </div>
                                </div>
                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-4">
                                        <strong>Who You Are</strong>
                                        <div class="text-muted small">
                                            Add your preferred candidates qualifications
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <textarea class="form-control" rows="3"
                                            placeholder="Enter job description"></textarea>
                                        <small class="text-muted">minimum of 500 characters</small>
                                    </div>
                                </div>
                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-4">
                                        <strong>Nice-To-Haves</strong>
                                        <div class="text-muted small">
                                            Add nice-to-have skills and qualifications for the role to encourage a more
                                            diverse set of candidates to apply
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <textarea class="form-control" rows="3"
                                            placeholder="Enter job description"></textarea>
                                        <small class="text-muted">minimum of 500 characters</small>
                                    </div>
                                </div>


                            </div>
                            <div v-if="recruiterCommonStore.jobPosting.stage == 3">
                                <div>
                                    <strong>Basic Information</strong>
                                    <div class="text-muted small">
                                        List out your top perks and benefits.
                                    </div>
                                </div>
                                <hr>
                                <div class="row g-3">
                                    <div class="col-md-4">
                                        <strong>Perks and Benefits</strong>
                                        <div class="text-muted small">
                                            Encourage more people to apply by sharing the attractive rewards and
                                            benefits you offer your employees
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <button class="btn btn-sm btn-primary-outline rounded-0">
                                            <i class="bi bi-plus-lg"></i> Add Benefits
                                        </button>
                                        <div class="row g-3 mt-3">
                                            <div v-for="i in 4" :key="i" class="col-lg-6">
                                                <div class="card">

                                                    <div class="card-body">
                                                        <div class="card-title">
                                                            <span class="float-end">
                                                                <i class="bi bi-x-lg"></i>
                                                            </span>
                                                        </div>
                                                        Lorem ipsum dolor sit amet consectetur
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="modal-footer border-">
                        <button ref="closeModal" type="button" class="btn btn-light rounded-0" data-bs-dismiss="modal"
                            aria-label="Close">Cancel</button>
                        <button v-if="[2, 3].includes(recruiterCommonStore.jobPosting.stage)" @click="goToPrevious"
                            type="button" class="btn btn-secondary rounded-0">
                            <i class=" bi bi-chevron-left"></i> Back
                        </button>
                        <button v-if="[1, 2].includes(recruiterCommonStore.jobPosting.stage)" @click="goToNext"
                            type="button" class="btn btn-primary rounded-0">
                            Next <i class=" bi bi-chevron-right"></i>
                        </button>

                        <button v-if="recruiterCommonStore.jobPosting.stage == 3" type="button"
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
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRecruiterCommonStore } from './RecruiterCommonStore'

const route = useRoute()
const recruiterCommonStore = useRecruiterCommonStore()

// modal
const openModal = ref<any>(null)
const closeModal = ref<any>(null)
watch(() => recruiterCommonStore.jobPosting.modal, () => {
    openModal.value.click()
    recruiterCommonStore.jobPosting.stage = 1
});
watch(() => route, () => {
    closeModal.value.click()
}, { deep: true })

// form and validation

function goToNext() {
    recruiterCommonStore.jobPosting.stage += 1
}

function goToPrevious() {
    recruiterCommonStore.jobPosting.stage -= 1
}

</script>