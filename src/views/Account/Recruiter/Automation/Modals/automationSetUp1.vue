<template>
    <button ref="automationMessageNew_opener" type="button" class="d-none" data-bs-toggle="modal"
        data-bs-target="#automationMessageNew">
        Launch
    </button>

    <div class="modal fade" id="automationMessageNew" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleId">
                        Automation: Message New Candidates
                    </h5>
                    <button ref="automationMessageNew_closer" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h6 class="fw-bold mb-4">Message new candidates</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <i class="bi bi-chat-right-dots-fill me-2"></i>
                            When anyone applied to my Job
                        </li>
                        <li>
                            <i class="bi bi-chat-right-dots-fill me-2"></i>
                            Send them a message
                        </li>
                    </ul>

                    <div class="col-lg-12" style="margin-bottom: 120px; height:100px">
                        <label class="form-label">Goals </label>
                        <QuillEditor v-model:content="inputText" contentType="html" toolbar="minimal" />
                        <span class="small text-muted">minimum of 50 characters</span>
                    </div>
                    <div class="mt-4">
                        <div class="fw-bold">Trigger Conditions</div>
                        <div class="text-muted mb-2">When should the message be sent?</div>
                        <div class="form-check">
                            <input class="form-check-input" v-model="conditionCheck" type="radio" name="conditionCheck"
                                id="conditionCheck1" />
                            <label class="form-check-label" for="conditionCheck1"> Immediately after application
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" v-model="conditionCheck" type="radio" name="conditionCheck"
                                id="conditionCheck2" />
                            <label class="form-check-label" for="conditionCheck2"> After a set time </label>
                        </div>
                    </div>

                    <div class="mt-3 col-md-4">
                        <VueDatePicker :teleport="true" v-model="time" hide-input-icon :clearable="false" time-picker
                            :format="'hh:mm a'" :is24="false">
                        </VueDatePicker>

                    </div>

                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAutomationStore } from '../automationStore';
import { onBeforeRouteLeave } from 'vue-router';

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


const inputText = ref<string>('')
const conditionCheck = ref<boolean>(false)


const time = ref('12:00')

const automationMessageNew_opener = ref<any>(null)
const automationMessageNew_closer = ref<any>(null)

const automationStore = useAutomationStore()

watch(() => automationStore.setupModals.messageNew, () => {
    automationMessageNew_opener.value?.click()
})

onBeforeRouteLeave(() => {
    automationMessageNew_closer.value?.click()
})






</script>