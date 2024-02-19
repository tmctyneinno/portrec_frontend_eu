<script lang="ts" setup>
import overlayLoadingVue from '@/components/overlayLoading.vue';
import api from '@/stores/Helpers/axios'
import { ref, watch, reactive } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useCommonStore } from './commonStore'
import useFxn from '@/stores/Helpers/useFunctions';

const commonStore = useCommonStore()
const opener = ref<any>(null)
const closer = ref<any>(null)

const message = reactive({
    text: '',
    isSending: false
})

async function sendMessage() {
    if (message.text) {
        const obj = new FormData();
        obj.append('message', message.text)
        obj.append('recipient_id', commonStore.selectedCompany.recruiter_id)

        try {
            message.isSending = true
            await api.createMessage(obj)
            useFxn.toast('Message Sent', 'success')
            message.text = ''
            message.isSending = false
        } catch (error) {
            console.log(error);
        }
    }
}

watch(() => commonStore.detailsModal, () => {
    opener.value.click()
})


onBeforeRouteLeave(() => {
    closer.value.click()
})
</script>

<template >
    <overlayLoadingVue v-if="message.isSending" />
    <!--: any Modal trigger button -->
    <button ref="opener" class="d-none" data-bs-toggle="modal" data-bs-target="#coyDetailsModal">
    </button>

    <!-- Modal Body -->
    <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
    <div class="modal fade" id="coyDetailsModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
            <div v-if="commonStore.selectedCompany" class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title fw-bold" id="modalTitleId">
                        {{ commonStore.selectedCompany.name }}
                    </h5>
                    <button ref="closer" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <img :src="commonStore.selectedCompany.image" width="100" class="img-fluid" alt="image" />
                        </li>
                        <li class="list-group-item">
                            {{ commonStore.selectedCompany.description }}
                        </li>
                        <li class="list-group-item">
                            <div class="text-muted my-2">
                                <i class="bi bi-geo-alt"></i> {{ commonStore.selectedCompany.address }}
                            </div>
                            <div class="text-muted my-2">
                                <i class="bi bi-globe"></i> <a class="text-black"
                                    :href="commonStore.selectedCompany.website" target="_blank">{{
                                        commonStore.selectedCompany.website }}</a>
                            </div>
                        </li>

                        <li v-if="commonStore.selectedCompany.twitter" class="list-group-item">
                            <div class="d-flex justify-content-start">
                                <div v-if="commonStore.selectedCompany.twitter" class="me-3">
                                    <i class="bi bi-twitter-x"></i> {{ commonStore.selectedCompany.twitter }}
                                </div>
                                <div v-if="commonStore.selectedCompany.instagram" class="me-3">
                                    <i class="bi bi-instagram"></i> {{ commonStore.selectedCompany.instagram }}
                                </div>
                                <div v-if="commonStore.selectedCompany.facebook" class="me-3">
                                    <i class="bi bi-facebook"></i> {{ commonStore.selectedCompany.facebook }}
                                </div>
                                <div v-if="commonStore.selectedCompany.linkedin" class="me-3">
                                    <i class="bi bi-linkedin"></i> {{ commonStore.selectedCompany.linkedin }}
                                </div>
                            </div>
                        </li>

                        <li class="list-group-item pb-0 mt-2">
                            <div class="row g-3">
                                <div class="col-md-5">
                                    <input v-model="message.text" placeholder="type message here" type="text"
                                        class="form-control rounded-0">
                                </div>
                                <div class="col-md-4">
                                    <button @click="sendMessage" class="btn btn-primary rounded-0"> <i
                                            class="bi bi-chat"></i> message
                                        recruiter</button>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped></style>
