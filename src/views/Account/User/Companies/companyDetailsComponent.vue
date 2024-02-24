<template>
    <overlayLoadingVue v-if="pageIsLoading" />
    <div v-if="companyData" class="row g-3">
        <div class="col-8">
            <h6 class="fw-bold text-muted">Company details</h6>
        </div>

        <div class="col-12">
            <div class="row g-3">
                <div class="col-lg-8">
                    <div class="card shadow-sm border-0 h-100">
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <img :src="companyData.image" width="100" class="img-fluid" alt="image" />
                                    <h5 class="fw-bold mt-2">{{ companyData.name }}</h5>
                                </li>
                                <li class="list-group-item">
                                    {{ companyData.description }}
                                </li>
                                <li class="list-group-item">
                                    <div class="text-muted my-2">
                                        <i class="bi bi-geo-alt"></i> {{ companyData.address }}
                                    </div>
                                    <div class="text-muted my-2">
                                        <i class="bi bi-globe"></i> <a class="theme-color" :href="companyData.website"
                                            target="_blank">{{
                                                companyData.website }}</a>
                                    </div>
                                </li>
                                <li v-if="companyData.twitter" class="list-group-item">
                                    <div class="d-flex justify-content-start">
                                        <div v-if="companyData.twitter" class="me-3">
                                            <i class="bi bi-twitter-x"></i> {{ companyData.twitter }}
                                        </div>
                                        <div v-if="companyData.instagram" class="me-3">
                                            <i class="bi bi-instagram"></i> {{ companyData.instagram }}
                                        </div>
                                        <div v-if="companyData.facebook" class="me-3">
                                            <i class="bi bi-facebook"></i> {{ companyData.facebook }}
                                        </div>
                                        <div v-if="companyData.linkedin" class="me-3">
                                            <i class="bi bi-linkedin"></i> {{ companyData.linkedin }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div class="col-md-4">
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="card shadow-sm">
                                <div class="card-header fw-bold border-0">
                                    <i class="bi bi-briefcase"></i> Jobs
                                </div>
                                <div class="card-body">
                                    <ul v-if="companyData.jobs.length" class="list-group list-group-flush">
                                        <li v-for="job in companyData.jobs.slice(0, 3)" :key="job"
                                            class="list-group-item px-0">
                                            <div class="fw-bold">{{ job.title }}</div>
                                            <div class="small"><i class="bi bi-geo-alt"></i> {{ job.location }}</div>
                                            <div class="small text-truncate">{{ job.description }}</div>
                                            <!-- <button class="mt-3 float-end btn btn-primary-outline rounded-0 btn-sm">
                                                Apply for this job
                                            </button> -->
                                            <router-link :to="`/job-description/${job.id}`"
                                                class="mt-3 float-end btn btn-primary-outline rounded-0 btn-sm">
                                                Apply for this job
                                            </router-link>
                                        </li>

                                    </ul>
                                    <div v-else>...</div>

                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="card shadow-sm border-">
                                <div class="card-header fw-bold border-0">
                                    <i class="bi bi-person-check"></i> Recruiter
                                </div>
                                <div class="card-body">
                                    <div class="row g-3">
                                        <div v-if="companyData.recruiter" class="col-12">
                                            <div>
                                                <span class="fw-bold">Name: </span> <br> {{ companyData.recruiter.name }}
                                            </div>
                                            <div>
                                                <span class="fw-bold">Phone: </span> <br> {{ companyData.recruiter.phone }}
                                            </div>
                                            <div>
                                                <span class="fw-bold">Email: </span> <br> {{ companyData.recruiter.email }}
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <input v-model="message.text" placeholder="type message here" type="text"
                                                class="form-control rounded-0">
                                        </div>
                                        <div class="col-12">
                                            <button @click="sendMessage" class="btn btn-primary rounded-0 w-100"> <i
                                                    class="bi bi-chat"></i> message
                                                recruiter</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import overlayLoadingVue from '@/components/overlayLoading.vue';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';

const route = useRoute()
const pageIsLoading = ref(false)
const companyData = ref<any>('')
// const message = ref('')

onMounted(() => {
    loadCompanyDetails()
})


async function loadCompanyDetails() {
    try {
        const companyId: any = route.query.company;
        pageIsLoading.value = true
        const { data } = await api.companyDetails(companyId)
        companyData.value = data.data.company
        pageIsLoading.value = false
        console.log(data);

    } catch (error) {
        console.log(error);
        pageIsLoading.value = false

    }
}

const message = reactive({
    text: '',
    isSending: false
})

async function sendMessage() {
    if (message.text) {
        const obj = new FormData();
        obj.append('message', message.text)
        obj.append('recipient_id', companyData.value.recruiter_id)

        try {
            message.isSending = true
            await api.createMessage(obj)
            useFxn.toast('Message Sent', 'success')
            message.text = ''
            message.isSending = false
        } catch (error) {
            // console.log(error);
        }
    }
}


const sampleJob = {
    "id": 1,
    "name": "Robin Jast",
    "email": "leonie03@gmail.com",
    "phone": "+1-747-218-1719",
    "location": null,
    "recruiter_level": null,
    "email_verified_at": null,
    "created_at": "2024-01-20T18:16:41.000000Z",
    "updated_at": "2024-01-20T18:16:41.000000Z"
}


// {
//     "id": 1,
//     "job_level_id": "1",
//     "country_id": "1",
//     "job_function_id": null,
//     "industry_id": null,
//     "title": "Mouse. '--I proceed. \"Edwin.",
//     "description": "Autem architecto eum nostrum inventore natus. Ratione et vel enim labore molestiae quisquam. Nihil molestiae quia quaerat omnis.",
//     "required_skills": "[{\"name\":\"Eleonore\",\"id\":0},{\"name\":\"Heaven\",\"id\":1},{\"name\":\"Brandyn\",\"id\":2},{\"name\":\"Dashawn\",\"id\":3},{\"name\":\"Hadley\",\"id\":4}]",
//     "min_salary": 2427,
//     "max_salary": 2442,
//     "deadline": "2024-01-05 19:56:47",
//     "qualifications": null,
//     "location": "5349 Price Stravenue Suite 831\nRennershire, AL 88930",
//     "experience": "Hatter. 'I deny it!' said.",
//     "total_view": 10,
//     "other_qualifications": "[{\"title\":\"Responsibilities\",\"descriptions\":[\"Hatter went on just as if.\",\"Alice was not here before,'.\",\"Mock Turtle, and to wonder.\",\"Alice looked up, and reduced.\"]},{\"title\":\"Who You are\",\"descriptions\":[\"ME.' 'You!' said the King.\",\"What made you so awfully.\",\"March Hare, who had followed.\",\"Owl, as a last resource, she.\"]},{\"title\":\"Nice to have\",\"descriptions\":[\"Alice went timidly up to the.\",\"How brave they'll all think.\",\"Mock Turtle went on, without.\",\"She generally gave herself.\"]}]",
//     "benefits": "[{\"title\":\"However, I've got to the.\",\"icon\":\"\",\"description\":\"Non tempora explicabo sapiente dignissimos sequi rerum facilis. Quas soluta cupiditate quo ea consequuntur consequatur.\"},{\"title\":\"What happened to you? Tell.\",\"icon\":\"\",\"description\":\"Sint eum voluptatibus iusto quaerat optio provident qui et. Rerum odit occaecati dolorem at cum cum totam. Enim nulla quaerat aut quisquam quibusdam quia architecto.\"},{\"title\":\"King sharply. 'Do you take.\",\"icon\":\"\",\"description\":\"Aliquam odio iure porro aut. Esse magni aperiam dicta distinctio consequatur sed dolorem.\"},{\"title\":\"Paris is the same thing as.\",\"icon\":\"\",\"description\":\"Labore voluptatem aut sit quidem consequatur qui perspiciatis aut. Officia tenetur quo odit quasi similique et.\"},{\"title\":\"For some minutes it puffed.\",\"icon\":\"\",\"description\":\"Modi neque molestias ab soluta expedita eius. Enim illum fugit deleniti neque libero ut.\"}]",
//     "status": "0",
//     "responsibilities": "[\"Responsibilities\",\"Who You are\",\"Nice to have\"]",
//     "capacity": "6",
//     "total_applied": "4",
//     "created_at": "2024-01-20T18:16:42.000000Z",
//     "updated_at": "2024-01-20T18:16:42.000000Z"
// }

</script>



<style lang="css" scoped></style>
