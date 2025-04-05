<template>
    <div class="row g-4 m-0 pb-5">
        <div class="col-12">
            <div class="fw-bold text-capitalize fs-5">Automation</div>
        </div>
        <div v-for="({ icon, iconBg, text, number, isPercent }, index) in automationSummary" :key="index"
            class="col-md-3">
            <div class="card h-100 border-0 bg-light">
                <div class="card-body">
                    <div>
                        <i class="round-icon bi" :class="icon" :style="{ backgroundColor: iconBg }"></i>
                    </div>
                    <div class="mt-2 xsmall">
                        {{ text }}
                    </div>
                    <div class="fw-bold mt-2 fs-5">
                        {{ useFunctions.addCommas(number) }}
                        <span v-show="isPercent">%</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="fw-bold text-capitalize mb-3">My Automation</div>
            <div class="card border-0 bg-light">
                <div class="card-body">
                    You’re not automatically messaging candidates yet. <br>
                    Choose a job to get started. <br>
                    <!-- <button class="btn btn-secondary mt-3">Get Started</button>  -->
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="fw-bold text-capitalize mb-3">Automation Library</div>
            <div class="row g-3">
                <div v-for="({ title, option, modalName }, index) in automationLibrary" :key="index" class="col-md-4">
                    <div class="card h-100">
                        <div class="card-header bg-transparent border-0 fw-bold">
                            {{ title }}
                        </div>
                        <div class="card-body">
                            <div class="px-3 w-100 xsmall bg-danger-subtle rounded-3 my-3">
                                All sponsored jobs
                            </div>
                            <ul class="list-unstyled text-muted">
                                <li class="d-flex">
                                    <i class="bi bi-chat-right-dots-fill me-2"></i>
                                    {{ option }}
                                </li>
                                <li>
                                    <i class="bi bi-chat-right-dots-fill me-2"></i>
                                    Send them a message
                                </li>
                            </ul>

                        </div>
                        <div class="card-footer bg-transparent border-0">
                            <PrimaryButton @click="openSetupModal(modalName)" className="float-end btn-sm">
                                Set Up
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- modals -->
    <AutomationSetUp1 />
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/buttons/primaryButton.vue';
import useFunctions from '@/stores/Helpers/useFunctions';
import { useAutomationStore } from './automationStore';
import AutomationSetUp1 from './Modals/automationSetUp1.vue';


type ModalNames = 'messageNew' | 'messageShortlisted' | 'messageUndecided' | 'messageRejected'


const automationSummary: { icon: string, iconBg: string, text: string, number: number, isPercent: boolean }[] = [
    { icon: 'bi-chat-left', iconBg: '#FCCDEE', text: 'Total Messages Sent', number: 1200, isPercent: false },
    { icon: 'bi-envelope-check', iconBg: '#BFC8E2', text: 'Messages Delivered Successfully', number: 98, isPercent: true },
    { icon: 'bi-envelope-paper', iconBg: '#C4F1C6', text: 'Read Status', number: 30, isPercent: true },
    { icon: 'bi-clipboard-check', iconBg: '#F4D5C7', text: 'Action Taken', number: 29, isPercent: true },
]

const automationLibrary: { title: string, option: string, modalName: ModalNames }[] = [
    { title: 'Message New Candidates', option: 'When anyone applied to my job', modalName: 'messageNew' },
    { title: 'Message Shortlisted Candidates', option: 'When I shortlist any applicant', modalName: 'messageShortlisted' },
    { title: 'Message “Undecided” Candidates', option: 'When I mark an applicant  as ‘undecided’', modalName: 'messageUndecided' },
    { title: 'Message Rejected Candidates', option: 'When an applicant status change to "rejected"', modalName: 'messageRejected' },
]

const automationStore = useAutomationStore()

function openSetupModal(modalName: ModalNames) {
    automationStore.setupModals[modalName] = !automationStore.setupModals[modalName]
}

</script>

<style scoped>
.round-icon {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
}
</style>