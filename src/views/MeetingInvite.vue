<template>
    <div class="wholePage">
        <OverlayLoading v-if="pageLoading" />
        <div v-else class="container">
            <div class="row justify-content-center g-3">
                <div> <img src="/images/site_logo.png" width="140" alt="site_logo"></div>
                <div class="fw-bold fs-5 mt-4">Invitation Details</div>
                <!-- <div class="small"> {{ useFxn.dateTimeDisplay(interviewDetails.interview_date) }} </div> -->
                <div class="col-12">
                    <div class="fw-bold text-capitalize">{{ interviewDetails?.get_jobs?.job?.title ?? '' }}, {{
                        interviewDetails?.company?.name }}</div>
                    <div class="text-muted small text-capitalize">{{ interviewDetails?.get_jobs?.job?.location ?? '' }}.
                    </div>
                    <div class="text-muted mt-2 small">
                        <i class="bi bi-clock-history me-2"></i>
                        {{ useFxn.dateTimeDisplay(interviewDetails.interview_date) }}
                        <!-- {{ new Date(interviewDetails.interview_date).toLocaleTimeString() }} -->
                    </div>
                    <div v-if="interviewDetails?.meeting_type != 'physical'" class="text-muted mt-2 small">
                        <i class="bi bi-camera-video me-2"></i> Video interview
                    </div>
                    <div v-else class="text-muted mt-2 small">
                        <i class="bi bi-person me-2"></i> Physical
                    </div>
                </div>
                <hr>
                <div v-if="interviewDetails?.meeting_type != 'physical'" class="col-12">
                    <p>Dear candidate,</p>
                    <p>Sequel to your application as the role of
                        <strong>{{ interviewDetails?.get_jobs?.job?.title ?? '' }}</strong> at
                        <strong>{{ interviewDetails?.company?.name ?? 'Our Company' }}</strong>,
                        you are hereby scheduled for a zoom meeting with details as follows:
                    </p>
                    <div class="my-3">
                        <div>Join zoom meeting:</div>
                        <a :href="interviewDetails?.host_url" target="_blank">
                            {{ interviewDetails?.host_url }}
                        </a>
                    </div>
                    <div class="my-3">
                        <div>Meeting ID: {{ interviewDetails?.meeting_id ?? '_' }}</div>
                        <div>Passcode: {{ interviewDetails?.password ?? '_' }}</div>
                    </div>

                    <p>You are expected to be punctual</p>
                    <p>Kindly acknowledge this.</p>
                    <p> Goodluck!</p>
                </div>
                <div v-else class="col-12">
                    <p>Dear candidate,</p>
                    <p>Sequel to your application as the role of
                        <strong>{{ interviewDetails?.get_jobs?.job?.title ?? '' }}</strong>
                        at <strong> {{ interviewDetails?.company?.name ?? 'Our Company' }}</strong>, you are
                        hereby
                        scheduled for physical meeting:
                    </p>
                    <div class="my-3">
                        <div>Physical Address:</div>
                        <div class="text-muted">
                            {{ interviewDetails?.location ?? '' }}
                        </div>
                    </div>

                    <p>You are expected to be punctual</p>
                    <p>Kindly acknowledge this.</p>
                    <p> Goodluck!</p>
                </div>
                <div class="col-12" v-if="!interviewDetails?.candidate_approved">
                    <primaryButtonOutline @click="respondToMeeting('reject')" className="rounded-3 float-end mx-2">
                        Reject
                    </primaryButtonOutline>
                    <primaryButton @click="respondToMeeting('accept')" className="'rounded-3 float-end mx-2'">
                        Accept
                    </primaryButton>
                </div>
                <div v-else class="col-12">
                    <primaryButtonOutline :disabled="true" className="rounded-3 float-end mx-2">
                        Already Responded
                    </primaryButtonOutline>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import api from '@/stores/Helpers/axios'
import OverlayLoading from '@/components/overlayLoading.vue';
import useFxn from '@/stores/Helpers/useFunctions';


const router = useRouter()
const route = useRoute()
const jobId = computed<string>(() => {
    const encodedJobId = route.query?.jobId;
    try { return typeof encodedJobId === 'string' ? atob(encodedJobId) : ''; }
    catch { return ''; }
});
const pageLoading = ref<boolean>(false)
const sendingResponse = ref<boolean>(false)
const user_id = ref<string>('')
const interviewDetails = ref<any>({})

onMounted(() => {
    getMeetingDetails()
})

async function getMeetingDetails() {
    if (!jobId.value) { router.push({ path: '/' }); return; }

    pageLoading.value = true
    try {
        const resp = await api.meetingInfomation(jobId.value)
        if (resp.status === 200) {
            interviewDetails.value = resp.data
            console.log(interviewDetails.value);

            pageLoading.value = false
        }
    } catch (error) {
        console.log(error);
    }
}

async function respondToMeeting(action: 'accept' | 'reject') {
    sendingResponse.value = true
    try {
        const formData = new FormData();
        formData.append('user_id', interviewDetails.value?.user_id ?? '')
        formData.append('interview_id', interviewDetails.value?.id ?? '')
        formData.append('candidate_approved', action === 'accept' ? '1' : '2')
        const resp = await api.meetingAccept(formData)
        if (resp.status === 200) {
            useFxn.toastShort('Request Sent!')
            router.push({ path: '/login' });
        }
    } catch (error) {
        console.log(error);
        sendingResponse.value = false
    }
}







</script>

<style scoped>
.wholePage {
    min-height: 100vh;
    padding-block: 30px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    /* background-color: var(--theme-color); */
}
</style>