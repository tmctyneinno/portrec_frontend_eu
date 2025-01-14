<template>
    <div v-if="!user" class="min-vh-50 d-flex justify-content-center align-items-center">
        <componentLoading />
    </div>
    <div v-else>
        <div class="">
            <i @click="router.back()" class="bi bi-arrow-left cursor-pointer"></i>
            <span class="fw-bold ms-2">Search Talent</span> /<span class="theme-color"> profile</span>
        </div>
        <hr>

        <div class="row g-4">
            <div class="col-12">
                <div class="card p-0 border-0 h-100   small text-capitalize">
                    <div class="card-header border-0 bg-transparent pb-0 text-muted">
                        <div v-if="user?.is_top_career" class="float-end">
                            <span v-if="user.is_top_career.is_promoted == '1'">
                                <i class="bi bi-check-circle-fill theme-color"></i> Promoted
                            </span>
                            <span v-else>
                                <i class="bi bi-hand-thumbs-up-fill theme-color"></i>
                                Recommended by <span class="theme-color">PORTREC</span>
                            </span>
                        </div>
                    </div>
                    <div class="card-body py-0">
                        <div class="row g-lg-5">
                            <div class="col-2 col-lg-1">
                                <img class="img-circle" :src="user?.user_avatar?.url" alt="">
                            </div>
                            <div class="col-10">
                                <div class="fw-bolder fs-4 lh-1">{{ user?.name }}</div>
                                <i v-for="i in user?.rating ?? 0" class="bi bi-star-fill xsmall theme-color lh-1"></i>
                                <div class="text-muted">{{ user?.profile?.professional_headline ?? '' }}</div>
                                <div v-if="user?.profile?.country" class="text-muted">
                                    <i class="bi bi-geo-alt"></i> {{ user?.profile?.country }}
                                </div>
                                <div class="my-2">
                                    <primaryButton @click="openHireModal" :className="'btn-sm xsmall text-capitalize'">
                                        Hire {{ user?.name ?? 'This User' }}
                                    </primaryButton>
                                </div>
                                <span v-for="(skill, i) in userSkillsTruncate" :key="i"
                                    class="bg-secondary-subtle xsmall p-0 px-1 me-1 d-inline-block text-nowrap mb-2">
                                    {{ skill }}
                                </span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div class="col-12">
                <div class="row g-3">
                    <div class="col-md-4">
                        <div>
                            <div class="fw-bold">Addition details</div>
                            <ul class="list-group list-group-flush small">
                                <li class="list-group-item border-0">
                                    <div class="row">
                                        <div class="col-1">
                                            <i class="bi bi-envelope"></i>
                                        </div>
                                        <div class="col">
                                            <div class="text-muted">Email</div>
                                            <div>{{ user.email }}</div>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item border-0">
                                    <div class="row">
                                        <div class="col-1">
                                            <i class="bi bi-phone"></i>
                                        </div>
                                        <div class="col">
                                            <div class="text-muted">Phone</div>
                                            <div>{{ user.phone }}</div>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item border-0">
                                    <div class="row">
                                        <div class="col-1">
                                            <i class="bi bi-translate"></i>
                                        </div>
                                        <div class="col">
                                            <div class="text-muted">Languages</div>
                                            <div>{{ languages ?? '__' }}</div>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                        <div class="mt-4">
                            <div class="fw-bold">Social Links</div>
                            <ul class="list-group list-group-flush small">
                                <li class="list-group-item border-0">
                                    <div class="row">
                                        <div class="col-1">
                                            <i class="bi bi-instagram"></i>
                                        </div>
                                        <div class="col">
                                            <div class="text-muted">Instagram</div>
                                            <a v-if="user?.profile?.instagram" class="theme-color"
                                                :href="'https://instagram.com/' + user.profile.instagram"
                                                target="_blank">instagram.com/{{ user.profile.instagram }}</a>
                                            <span v-else>__</span>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item border-0">
                                    <div class="row">
                                        <div class="col-1">
                                            <i class="bi bi-twitter-x"></i>
                                        </div>
                                        <div class="col">
                                            <div class="text-muted">X</div>
                                            <a v-if="user?.profile?.instagram" class="theme-color"
                                                :href="'https://twitter.com/' + user.profile.instagram"
                                                target="_blank">twitter.com/{{ user.profile.instagram }}</a>
                                            <span v-else>__</span>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item border-0">
                                    <div class="row">
                                        <div class="col-1">
                                            <i class="bi bi-globe"></i>
                                        </div>
                                        <div class="col">
                                            <div class="text-muted">Website</div>
                                            <a v-if="user?.profile?.website" class="theme-color"
                                                :href="user.profile.website" target="_blank">
                                                {{ user.profile.website }}</a>
                                            <span v-else>__</span>
                                        </div>
                                    </div>
                                </li>

                                <li class="list-group-item border-0">
                                    <div class="row">
                                        <div class="col-1">
                                            <i class="bi bi-linkedin"></i>
                                        </div>
                                        <div class="col">
                                            <div class="text-muted">Linkedin</div>
                                            <a v-if="user?.profile?.linkedin" class="theme-color"
                                                :href="'https://linkedin.com/' + user.profile.linkedin"
                                                target="_blank">linkedin.com/{{ user.profile.linkedin }}</a>
                                            <span v-else>__</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div>
                            <div class="fw-bold">Professional Summary</div>
                            <p v-html="user?.profile?.about_me" class="small"></p>
                        </div>

                        <hr>
                        <div>
                            <div class="fw-bold">Skills</div>
                            <p>
                                <span v-for="(skill, i) in userSkills" :key="i"
                                    class="category-tag text-nowrap d-inline-block mb-2">
                                    {{ skill }}
                                </span>
                            </p>

                        </div>

                        <hr>

                        <div class="">
                            <div class="fw-bold mb-3 text-muted">Education</div>
                            <div v-if="!user?.education.length">
                                No Education added.
                            </div>
                            <div v-else class="mt-2">
                                <div v-for="item in user.education" :key="item.id">
                                    <div class="fw-bold">{{ item.institution }}</div>
                                    <span class="small fw-bold xsmall">{{ qualificationName(item.qualification_id)
                                        }}</span>
                                    <i class="bi bi-dot mt-4"></i>
                                    <span class="text-muted xsmall ms-1"> {{ useFxn.dateDisplay(item.start_date) }} -
                                        {{ item.end_date ? useFxn.dateDisplay(item.end_date) : 'Present' }}
                                    </span>
                                    <p class="text-muted xsmall">
                                        {{ item.description }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr>

                        <div>
                            <div class="fw-bold mb-3 text-muted">Experiences</div>
                            <div v-if="!user?.experience.length">
                                No Education added.
                            </div>
                            <div v-else class="mt-2">
                                <div v-for="item in user.experience" :key="item.id">
                                    <div class="fw-bold">{{ item.job_title }}</div>
                                    <span class="small fw-bold xsmall">{{ item.company_name }}</span>
                                    <i class="bi bi-dot mt-4"></i>
                                    <span class="text-muted xsmall ms-1 text-capitalize">
                                        {{ jobFunctionName(item.job_function_id) }}
                                    </span>
                                    <i class="bi bi-dot"></i>
                                    <span class="text-muted xsmall ms-1"> {{ useFxn.dateDisplay(item.start_date) }} -
                                        {{ item.end_date ? useFxn.dateDisplay(item.end_date) : 'Present' }}
                                    </span>
                                    <p class="text-muted xsmall">
                                        {{ item.description }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr>

                        <div class="">
                            <div class="fw-bold mb-3 text-muted">Porfolios</div>
                            <div v-if="!user?.portfolios.length">
                                No Portfolios added.
                            </div>
                            <div v-else class="mt-2">
                                <div class="portfolio-container">
                                    <div v-for="(item, index) in user.portfolios" :key="index"
                                        @click="visitURL(item.project_url)"
                                        class="portfolio-item text-wrap card hover-tiltY">
                                        <img class="portfolio-image" :src="item.images" alt="image">
                                        <div class="portfolio-text">{{ item.project_title }} </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>

        <!-- modal -->
        <button ref="modalHireOpen" type="button" class="d-none" data-bs-toggle="modal"
            data-bs-target="#modalHireMessage">
            Launch
        </button>


        <div class="modal fade" id="modalHireMessage" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
            role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header justify-content-center border-0 text-center">
                        <div>
                            <div class="fw-bold text-capitalize">
                                Hire {{ user?.name ?? 'This User' }}
                            </div>
                            <div class="text-muted small">
                                Connect to discuss your project needs
                            </div>
                        </div>


                        <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                    </div>
                    <div class="modal-body">
                        <div class="row g-3">
                            <div class="col-12">
                                <div class="form-label">Message</div>
                                <textarea class="form-control" style="height: 80px;"></textarea>
                            </div>
                            <div class="col-12">
                                <div class="form-label">Job Available</div>
                                <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                                    v-model="selectedJob" class="custom-select-class" placeholder="select Job"
                                    :options="jobsDropdown" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <primaryButton className="btn-sm">
                            Send request
                        </primaryButton>

                        <button ref="modalHireClose" type="button"
                            class="btn btn-sm btn-link text-decoration-none text-dark" data-bs-dismiss="modal">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'
import api from '@/stores/Helpers/axios';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

onMounted(() => {
    getUserProfile()
    getJobsList()
    getJobQualifications()
    getJobFunctions()
})



// Display ############################

const user = ref<any>(null)
const qualifications = ref<any>([])
const jobFunctions = ref<any>([])

async function getUserProfile() {
    const id = route.params?.id;
    if (!id) return router.back();

    try {
        const { data } = await api.recruiterGetUserProfile(id);
        user.value = data?.data;
    } catch (error) {
        // 
    }
}

async function getJobQualifications() {
    try {
        const resp: any = await api.jobQualifications()
        if (resp.status == 200) qualifications.value = resp.data.body
    } catch (error) {
        console.log(error);
    }
}

async function getJobFunctions() {
    try {
        const resp: any = await api.jobFunctions()
        if (resp.status == 200) jobFunctions.value = resp.data.body
    } catch (error) {
        console.log(error);
    }
}
const qualificationName = (id: any) => qualifications.value.find((x: { id: any; }) => x.id == id)?.name ?? '_';
const jobFunctionName = (id: any) => jobFunctions.value.find((x: { id: any; }) => x.id == id)?.name ?? '_';

const languages = computed(() => {
    const data = user.value?.languages;
    if (!data) return null;

    const formattedLanguages = data
        .replace(/\s/g, '') // Remove spaces
        .split(',') // Split into an array
        .map((string: any) => string.charAt(0).toUpperCase() + string.slice(1)) // Capitalize first letters
        .join(','); // Join back into a comma-separated string

    return formattedLanguages;
});

const userSkills = computed(() => {
    const userSkills = user.value?.skill || [];
    return userSkills.map((x: { skills: { name: any; }; }) => x.skills.name)
})


const userSkillsTruncate = computed(() => {
    const remainingCount = userSkills.value.length - 3;
    return userSkills.value.length > 3
        ? [...userSkills.value.slice(0, 3), `+${remainingCount}`]
        : userSkills.value;
});

function visitURL(url: string) {

    if (url) {
        if (!url.startsWith("https://") && !url.startsWith("http://")) {
            url = `https://${url}`;
        }
        window.open(url, '_blank'); // Open in a new tab
    } else {
        console.log("Invalid URL");
    }
}






// Modal #######################

const modalHireOpen = ref<any>(null)
const modalHireClose = ref<any>(null)
const jobsDropdown = ref<any[]>([])
const selectedJob = ref<any>(null)

async function getJobsList() {
    try {
        const resp: any = await api.recruiterJobsListAll()
        jobsDropdown.value = resp?.data?.body ?? []

    } catch (error) {
        // 
    }

}



function openHireModal() {
    modalHireOpen.value?.click()
}



onBeforeRouteLeave(() => {
    modalHireClose.value?.click()
})

</script>

<style lang="css" scoped>
@import '@/assets/css/portfolioView.css';

.img-circle {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-color: var(--theme-color-soft);
    border: 1px solid #e8e5e5;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}


.dropdown-toggle::after {
    content: none !important;
}

.dropdown-menu {
    height: 50vh;
    overflow-y: auto;
    width: 100%;
}

.dropdown-item:hover {
    color: var(--theme-color);
    background: transparent;
}
</style>
