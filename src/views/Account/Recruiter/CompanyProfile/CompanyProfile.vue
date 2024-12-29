<template>
    <div class=" mt-lg-5 pt-lg-5 d-flex-center" v-if="company.isLoading">
        <ComponentLoading />
    </div>
    <div v-else>
        <div v-if="!company.companyFound">
            <div class="d-flex justify-content-center align-items-center mt-5">
                <div class="col-lg-8 text-center">
                    <div class="text-muted">
                        You have not created any company. Create a company profile to continue
                    </div>
                    <button class="btn btn-primary-outline mt-4">Create your company</button>
                </div>

            </div>
        </div>
        <div v-else>
            <div class="row g-4 g-lg-1 my-4">
                <div class="col-md-2">
                    <div class="dropzone" v-bind="getRootProps()"
                        :style="{ 'background-image': `url(${company.avatar})` }">
                        <div class="text-center small">
                            <i class="bi bi-camera"></i>
                        </div>
                        <input v-bind="getInputProps()" />
                    </div>
                </div>
                <div class="col-md-10">
                    <h1 class="large-coy-name"> {{ company.data.name }} <span @click="openEditModal('top-info')"
                            class="float-end floated-btn d-flex-center">
                            <i class="bi bi-pencil-fill"></i>
                        </span> </h1>

                    <router-link to="#" class="theme-color xsmall">{{ company.data.website ?? '' }}</router-link>
                    <div class="row g-3 mt-2 small">
                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <div><i class="bi bi-fire info-icon me-2"></i></div>
                            <div>
                                <div clas="text-muted">Founded</div>
                                <div v-if="company.data.date_founded" class="fw-bold lh-1">{{
                                    useFxn.dateDisplay(company.data?.date_founded) }}</div>
                                <div v-else class="text-muted2 xsmall">Not added..</div>
                            </div>
                        </div>
                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <div> <i class="bi bi-people info-icon me-2"></i> </div>
                            <div>
                                <div clas="text-muted">Employees</div>
                                <div v-if="company.data.sizes?.name" class="fw-bold lh-1">
                                    {{ company.data.sizes?.name }}
                                </div>
                                <div v-else class="text-muted2 xsmall">Not added..</div>
                            </div>
                        </div>
                        <div class="col-6 col-lg-4 d-flex align-items-center">
                            <div> <i class="bi bi-geo-alt info-icon me-2"></i> </div>
                            <div>
                                <div clas="text-muted ">Location</div>
                                <div v-if="company.data.city" class="fw-bold lh-1">
                                    {{ company.data.city }}, {{ company.data.country }}
                                </div>
                                <div v-else class="text-muted2 xsmall">Not added..</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <hr class="mb-4">

            <div class="row g-3">
                <div class="col-lg-8">
                    <div class="card border-0 mb-3">
                        <div class="card-body">
                            <h5 class="card-title bg-transparent border-0 fw-bold">
                                Industry
                                <span @click="openEditModal('industry')"
                                    class="float-end floated-btn d-flex-center cursor-pointer">
                                    <i class="bi bi-pencil-fill"></i>
                                </span>
                            </h5>
                            <div class="card-text text-capitalize">
                                <span v-if="company.data.industries?.name">{{ company.data.industries?.name }}</span>
                                <span v-else class="text-muted2 small">Add company Industry..</span>
                            </div>
                        </div>
                    </div>

                    <hr class="faint my-4">

                    <div class="card border-0 mb-3">
                        <div class="card-body">
                            <h5 class="card-title bg-transparent border-0 fw-bold">
                                Company Profile
                                <span @click="openEditModal('profile')"
                                    class="float-end floated-btn d-flex-center cursor-pointer">
                                    <i class="bi bi-pencil-fill"></i>
                                </span>
                            </h5>
                            <div class="card-text">
                                <span v-if="company.data.description">{{ company.data.description }}</span>
                                <span v-else class="text-muted2 small">Add company description..</span>
                            </div>
                        </div>
                    </div>

                    <hr class="faint my-4">

                    <div class="card border-0 mb-3">
                        <div class="card-body">
                            <h5 class="card-title bg-transparent border-0 fw-bold">
                                Contact
                                <span @click="openEditModal('links')"
                                    class="float-end floated-btn d-flex-center cursor-pointer">
                                    <i class="bi bi-pencil-fill"></i>
                                </span>

                            </h5>
                            <div class="card-text mt-3">
                                <div class="row g-3">
                                    <div class=" col-md-6">
                                        <div class="link-pane ">
                                            <i class="bi bi-twitter-x me-1"></i>
                                            {{ company.data.twitter ?? '...' }}
                                        </div>
                                    </div>
                                    <div class=" col-md-6">
                                        <div class="link-pane ">
                                            <i class="bi bi-facebook me-1"></i>
                                            {{ company.data.facebook ?? '...' }}
                                        </div>
                                    </div>
                                    <div class=" col-md-6">
                                        <div class="link-pane ">
                                            <i class="bi bi-linkedin me-1"></i>
                                            {{ company.data.linkedin ?? '...' }}
                                        </div>
                                    </div>
                                    <div class=" col-md-6">
                                        <div class="link-pane ">
                                            <i class="bi bi-envelope me-1"></i>
                                            {{ company.data.email ?? '...' }}
                                        </div>
                                    </div>
                                    <div class=" col-md-6">
                                        <div class="link-pane ">
                                            <i class="bi bi-instagram me-1"></i>
                                            {{ company.data.instagram ?? '...' }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="faint my-4">

                    <div class="card card border-0 d-none">
                        <h5 class="card-title bg-transparent border-0 fw-bold">
                            Open Positions
                            <router-link to="#" class="float-end theme-color small">
                                Show all jobs <i class="bi bi-arrow-right"></i>
                            </router-link>

                        </h5>
                        <div class="card-text mt-3">
                            <div class="row g-3">
                                <jobsDisplay v-for="i in 12" :key="i" :job="job" :size="'full'" />
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-lg-4">
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="card border-0 mb-3">
                                <div class="card-body">
                                    <h5 class="card-title bg-transparent border-0 fw-bold">
                                        Tech Stack
                                        <span @click="openEditModal('tech-stack')"
                                            class="float-end floated-btn d-flex-center">
                                            <i class="bi bi-pencil-fill"></i>
                                        </span>
                                    </h5>
                                    <div class="card-text mt-4">
                                        <span v-if="company.data.tech_stack">{{ company.data.tech_stack }}</span>
                                        <span v-else class="text-muted2 small">Add Company tech stack..</span>
                                    </div>
                                </div>
                            </div>
                            <hr class="faint my-4">
                        </div>
                        <div class="col-12">
                            <div class="card border-0 mb-3">
                                <div class="card-body">
                                    <h5 class="card-title bg-transparent border-0 fw-bold">
                                        Jobs
                                    </h5>
                                    <div v-if="company.data.jobs && company.data.jobs.length"
                                        class="card-text mt-4 text-capitalize">
                                        <div>{{ company.data.jobs.length }}
                                            {{ company.data.jobs.length == 1 ? 'job' : 'jobs' }}.</div>
                                        <div>
                                            {{ useFxn.arrayPropSum(company.data.jobs, 'total_applied') }}
                                            {{ useFxn.arrayPropSum(company.data.jobs, 'total_applied') == 1 ?
                                                `Application` : `Applications` }}.
                                        </div>
                                    </div>
                                    <span v-else class="text-muted2 small">No Jobs Openings</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <!-- modals -->
            <profileEditModal />
            <SocialLinkEditModal />
            <IndustryEditModal />
            <TechStackEditModal />
            <TopInfoEditModal />
        </div>
    </div>

</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import jobsDisplay from '@/components/jobsDisplay.vue';
import { useRecruiterCommonStore } from '../RecruiterCommonStore';
import { storeToRefs } from 'pinia';
import ComponentLoading from '@/components/componentLoading.vue';
import useFxn from '@/stores/Helpers/useFunctions';
import api from '@/stores/Helpers/axios'

//@ts-ignore
import { useDropzone } from "vue3-dropzone";

// modals
import profileEditModal from './modals/profileEditModal.vue';
import SocialLinkEditModal from './modals/socialLinkEditModal.vue';
import IndustryEditModal from './modals/industryEditModal.vue';
import TechStackEditModal from './modals/techStackEditModal.vue';
import TopInfoEditModal from './modals/topInfoEditModal.vue';

const recruiterCommonStore = useRecruiterCommonStore()
const { companyProfile: company } = storeToRefs(recruiterCommonStore)

function openEditModal(editType: 'profile' | 'industry' | 'links' | 'tech-stack' | 'top-info') {
    if (editType == 'profile')
        company.value.profileEditModal = !company.value.profileEditModal
    else if (editType == 'industry')
        company.value.industryEditModal = !company.value.industryEditModal
    else if (editType == 'tech-stack')
        company.value.techStackEditModal = !company.value.techStackEditModal
    else if (editType == 'links')
        company.value.socialLinksEditModal = !company.value.socialLinksEditModal
    else
        company.value.topInfoEditModal = !company.value.topInfoEditModal
}


const job = {
    title: 'Frontend Engineer',
    company: {
        name: 'Company Name'
    }
}

onMounted(async () => {
    company.value.isLoading = true
    await recruiterCommonStore.getCompanyInformation()
    recruiterCommonStore.getCompanyResources()
})






// image
const acceptedFormats = ['png', 'jpg', 'jpeg', 'svg']
const img = ref<any>(null)
const imgSaving = ref(false)

const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptFiles: any[], rejectReasons: any) => {
        if (!useFxn.isExtension(acceptFiles[0].name, acceptedFormats)) {
            useFxn.toast('Please upload an image', 'warning');
            return;
        }

        const _2MBinBytes = 2097152;

        if (acceptFiles[0].size > _2MBinBytes) {
            useFxn.toast('File larger than 2MB', 'warning');
            return;
        }

        let formData = new FormData();
        img.value = acceptFiles[0]
        formData.append("img", img.value);
        submitImage(formData)
    },
});



async function submitImage(formData: FormData) {
    try {
        imgSaving.value = true

        let { data } = await api.recruiterCompanyAvatarUpload(formData)
        company.value.avatar = data.url
        useFxn.toast('Updated successfully', 'success')
    } catch (error) {
        // console.log(error);
        useFxn.toast('Something went wrong', 'error')

    }
    finally {
        imgSaving.value = false
    }
}



</script>


<style lang="css" scoped>
.large-coy-name {
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 0.2;
}

.info-icon {
    /* background-color: #FFB836; */
    /* color: #ffffff; */
    color: var(--theme-color);
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    border: 1px solid #ccc;
    align-items: center;
    border-radius: 50%;
    font-size: 11px;
}


.floated-btn {
    width: 25px;
    height: 25px;
    border: 1px solid #ccc;
    font-size: 12px;
    cursor: pointer;
    color: var(--theme-color);
    border-radius: 2px;
}

.floated-btn:hover {
    background-color: #cccccc53;
}

.link-pane {
    padding: 7px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    border: 1px solid var(--bs-secondary-bg-subtle);
    /* color: var(--theme-color); */
}

.dropzone {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    /* background-color: var(--theme-color-soft); */
    border: 1px solid #e8e5e5;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dropzone:hover {
    border-width: 2px;
    border-color: var(--theme-color)
}
</style>
