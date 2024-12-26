<template>
    <div class="">
        <i @click="router.back()" class="bi bi-arrow-left cursor-pointer"></i>
        <span class="fw-bold ms-2">Search Talent</span> /<span class="theme-color"> profile</span>
    </div>
    <hr>

    <div class="row g-4">
        <div class="col-12">
            <div class="card p-0 border-0 h-100   small text-capitalize">
                <div class="card-header border-0 bg-transparent pb-0 text-muted">
                    <div class="float-end">
                        <span v-if="userProfile.status == 'promoted'">
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
                            <div class="img-circle" :style="{ 'background-image': `url(/images/profile.png)` }"></div>
                        </div>
                        <div class="col-10">
                            <div class="fw-bolder fs-4 lh-1">{{ userProfile?.name }}</div>
                            <i v-for="i in userProfile?.star ?? 0" class="bi bi-star-fill xsmall theme-color lh-1"></i>
                            <div class="text-muted">{{ userProfile?.title }}</div>
                            <div class="text-muted">
                                <i class="bi bi-geo-alt"></i> {{ userProfile?.location }}
                            </div>
                            <div class="my-2">
                                <primaryButton @click="openHireModal" :className="'btn-sm xsmall'">
                                    Hire Mary
                                </primaryButton>
                            </div>
                            <span v-for="(skill, i) in userSkills()" :key="i"
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
                                        <div>maylory@email.com</div>
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
                                        <div>+44 1245 572 135</div>
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
                                        <div>English, French</div>
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
                                        <a class="theme-color" href="https://instagram.com/maylory"
                                            target="_blank">instagram.com/maylory</a>
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
                                        <a class="theme-color" href="https://twitter.com/maylory"
                                            target="_blank">twitter.com/maylory</a>
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
                                        <a class="theme-color" href="https://maylory.com"
                                            target="_blank">www.maylory.com</a>
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
                                        <a class="theme-color" href="https://linkedin/linkedin" target="_blank">Linkedin
                                            Profile</a>
                                    </div>
                                </div>
                            </li>


                        </ul>
                    </div>
                </div>
                <div class="col-md-8">
                    <div>
                        <div class="fw-bold">Professional Summary</div>
                        <p class="small">
                            Jane is a UX designer with 3 years of experience in crafting intuitive user experiences. She
                            specializes in wireframing, prototyping, and user research.
                        </p>
                        <p class="small">
                            Passionate about creating digital products that are both functional and aesthetically
                            pleasing.
                        </p>
                    </div>

                    <hr>
                    <div>
                        <div class="fw-bold">Skills</div>
                        <p>
                            <span v-for="(skill, i) in userProfile.skills" :key="i" class="category-tag">
                                {{ skill }}
                            </span>
                        </p>

                    </div>

                    <hr>
                    <div>
                        <div class="fw-bold mb-3">Experiences</div>
                        <p>
                        <div class="fw-bold">Senior UX Designer</div>
                        <span class="small fw-bold xsmall">ABC Corporation</span>
                        <i class="bi bi-dot mt-4"></i>
                        <span class="text-muted xsmall ms-1"> Remote</span>
                        <i class="bi bi-dot"></i>
                        <span class="text-muted xsmall ms-1"> Jun 2019 - Present (1y 1m)</span>
                        <ul class="text-muted xsmall">
                            <li>Led a redesign of the company’s mobile app, improving user engagement by 30%.</li>
                            <li>Conducted user testing to identify pain points and improve the user journey.</li>
                        </ul>
                        </p>

                        <p>
                        <div class="fw-bold">Senior UX Designer</div>
                        <span class="small fw-bold xsmall">ABC Corporation</span>
                        <i class="bi bi-dot mt-4"></i>
                        <span class="text-muted xsmall ms-1"> Remote</span>
                        <i class="bi bi-dot"></i>
                        <span class="text-muted xsmall ms-1"> Jun 2019 - Present (1y 1m)</span>
                        <ul class="text-muted xsmall">
                            <li>Led a redesign of the company’s mobile app, improving user engagement by 30%.</li>
                            <li>Conducted user testing to identify pain points and improve the user journey.</li>
                        </ul>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- modal -->
    <button ref="modalHireOpen" type="button" class="d-none" data-bs-toggle="modal" data-bs-target="#modalHireMessage">
        Launch
    </button>


    <div class="modal fade" id="modalHireMessage" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header justify-content-center border-0 text-center">
                    <div>
                        <div class="fw-bold">
                            Hire May Lory
                        </div>
                        <div class="text-muted small">
                            Connect with May to discuss your project needs
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

</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { useDateFormat } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'
import { useRecruiterCommonStore } from './RecruiterCommonStore';
import api from '@/stores/Helpers/axios';
import type { UserProfileCardInterface } from '@/stores/interfaces';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const modalHireOpen = ref<any>(null)
const modalHireClose = ref<any>(null)
const jobsDropdown = ref<any[]>([])
const selectedJob = ref<any>(null)
//

const recruiterCommonStore = useRecruiterCommonStore()

const profileStore = useProfileStore()
onMounted(() => {
    console.log(profileStore.data);
    getJobsList()
})

async function getJobsList() {

    try {
        const resp: any = await api.recruiterJobsListAll()
        jobsDropdown.value = resp?.data?.body ?? []

    } catch (error) {
        // 
    }

}

const userProfile = ref<UserProfileCardInterface>(
    {
        id: 1,
        name: 'Mary Jones',
        title: 'Remote freelance designer',
        status: 'recommended',
        skills: ['illustration', 'design', 'design systems'],
        experience: 3,
        star: 4,
        location: 'remote',
        avalaiblity: 'remote',

    },
)

const userSkills = () => {
    const skills = userProfile.value?.skills || [];
    const remainingCount = skills.length - 3;

    return skills.length > 3
        ? [...skills.slice(0, 3), `+${remainingCount}`]
        : skills;
};

function openHireModal() {
    modalHireOpen.value?.click()
}



onBeforeRouteLeave(() => {
    modalHireClose.value?.click()
})

</script>

<style lang="css" scoped>
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
