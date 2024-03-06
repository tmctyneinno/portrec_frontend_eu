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
                            <div class="card shadow-sm overflow-y-scroll" style="height: 400px;">
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
                                        <!-- <div v-if="companyData.recruiter" class="col-12">
                                            <div>
                                                <span class="fw-bold">Name: </span> <br> {{ companyData.recruiter.name
                                                }}
                                            </div>
                                            <div>
                                                <span class="fw-bold">Phone: </span> <br> {{ companyData.recruiter.phone
                                                }}
                                            </div>
                                            <div>
                                                <span class="fw-bold">Email: </span> <br> {{ companyData.recruiter.email
                                                }}
                                            </div>
                                        </div> -->
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
</script>



<style lang="css" scoped></style>
