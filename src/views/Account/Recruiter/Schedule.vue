<template>
    <div class="row g-3 m-0 pb-5">
        <div class="col-12">
            <div class="row g-3">
                <div class="col-12">
                    <div class="d-lg-flex justify-content-between">
                        <div class="fw-bold text-capitalize fs-5">My Schedule</div>

                        <!-- <div class="float-start float-lg-end">
                            <input class="float-end form-control" placeholder="search here..." v-model="searchTerm"
                                type="text">
                        </div> -->
                    </div>
                </div>
            </div>
            <hr>
        </div>



        <div class="col-lg-8">
            <div class="card">
                <div class=" card-header bg-transparent border-0 pb-0 fw-bold mb-2">Interviews</div>
                <div class="card-body">
                    <EasyDataTable alternating class="border-0" :loading="tableIsLoading" show-index
                        :headers="tableHeader" :items="interviews" buttons-pagination>

                        <template #header="header">
                            <span class="fw-bold text-muted">{{ header.text == '#' ? 'S/N' : header.text }}</span>
                        </template>

                        <template #item-interview_date="item">
                            {{ useFxn.dateDisplay(item.interview_date) }}
                        </template>

                        <template #item-candidate_approved="item">
                            <span class="category-tag"
                                :class="!item.candidate_approved ? 'bg-light' : (item.candidate_approved == 1 ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger')">
                                {{ !item.candidate_approved ? 'Not Responded' : (item.candidate_approved == 1 ?
                                    'Accepted' :
                                    'Rejected') }}
                            </span>
                        </template>

                        <template #item-view="item">
                            <button @click="viewDetails(item)"
                                class=" btn btn-sm btn-primary-outline border-0 rounded-5 text-decoration-none btn-sm ">
                                <i class=" bi bi-eye"></i>
                            </button>

                        </template>

                        <template #item-delete="item">

                            <button v-if="!item?.candidate_approved" @click="deleteItem(item.id)"
                                class=" btn btn-sm btn-primary-outline border-0 rounded-5 text-decoration-none btn-sm ">
                                <i class=" bi bi-trash3"></i>
                            </button>
                        </template>

                    </EasyDataTable>
                </div>
            </div>


            <!-- <Qalendar :events="events" :config="qualendarConfig" :selected-date="new Date()" /> -->
        </div>





        <div class="col-lg-4 border-righ">
            <div class="card h-100">
                <div class="card-body">
                    <!-- <button class="btn btn-sm btn-primary-outline fw-bold mb-3 w-100">
                        <i class="bi bi-plus"></i> Create Event
                    </button> -->
                    <VCalendar class="border-0" title-position="left" expanded :attributes='calendeAttributes' />
                </div>
            </div>

            <!-- <div class="small">
                <div class="card-heade fw-bold bg-transparent">
                    Categories <span class="theme-color fw-bold cursor-pointer float-end">
                        <i class="bi bi-plus-lg"></i> Add Category
                    </span>
                </div>

                <div class="checks mt-3">
                    <div class="list-group">
                        <label class="list-group-item border-0 ps-0">
                            <input class="form-check-input me-1" type="checkbox" value="" checked />
                            Interview Schedule
                        </label>
                        <label class="list-group-item border-0 ps-0">
                            <input class="form-check-input me-1" type="checkbox" value="" checked />
                            Internal Meeting
                        </label>
                        <label class="list-group-item border-0 ps-0">
                            <input class="form-check-input me-1" type="checkbox" value="" />
                            Team Schedule
                        </label>
                        <label class="list-group-item border-0 ps-0">
                            <input class="form-check-input me-1" type="checkbox" value="" />
                            My Task
                        </label>
                        <label class="list-group-item border-0 ps-0">
                            <input class="form-check-input me-1" type="checkbox" value="" />
                            Reminders
                        </label>
                    </div>

                </div>
            </div> -->
        </div>


    </div>






    <!-- ScheduleDetailsModal -->
    <button type="button" ref="detailsModalOpen" class="d-none" data-bs-toggle="modal"
        data-bs-target="#ScheduleDetailsModal">
    </button>

    <!-- Modal Body -->
    <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
    <div class="modal fade" id="ScheduleDetailsModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleId">
                        {{ itemToView.description }}
                    </h5>
                    <!-- <button ref="detailsModalClose" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button> -->
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-md-6 col-lg-4 ">
                            <strong>Job:</strong>
                            <div class="text-muted">
                                {{ itemToView?.get_jobs?.job?.title ?? '-' }}
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 ">
                            <strong>Applied Date:</strong>
                            <div class="text-muted">
                                {{ useFxn.dateDisplay(itemToView?.get_jobs?.applied_date) }}
                            </div>
                        </div>

                        <div class="col-md-6 col-lg-4 ">
                            <strong>Interview Date:</strong>
                            <div class="text-muted">
                                {{ useFxn.dateDisplay(itemToView?.interview_date) }}
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 ">
                            <strong>Interview Type:</strong>
                            <div class="text-muted">
                                {{ itemToView?.meeting_type ?? '-' }}
                            </div>
                        </div>

                        <div class="col-md-12 col-lg-8 ">
                            <strong>Location:</strong>
                            <div class="text-muted">
                                {{ itemToView?.location }}
                            </div>
                        </div>

                        <div v-if="itemToView?.meeting_type == 'online'" class="col-md-12 ">
                            <strong>Host URL:</strong>
                            <div class="text-muted">
                                <a :href="itemToView?.host_url" target="_blank">{{ itemToView?.host_url }}</a>
                            </div>
                        </div>

                        <div v-if="itemToView?.meeting_type == 'online'" class="col-md-12 ">
                            <strong>Join URL:</strong>
                            <div class="text-muted">
                                <a :href="itemToView?.host_url" target="_blank">{{ itemToView?.host_url }}</a>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="modal-footer border-0">
                    <button ref="detailsModalClose" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// import { useProfileStore } from '@/stores/profileStore';
import { useDateFormat } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'
// import { useRecruiterCommonStore } from './RecruiterCommonStore';
// @ts-ignore
// import { Qalendar } from "qalendar";
import api from '@/stores/Helpers/axios'
import { onBeforeRouteLeave } from 'vue-router';


// const recruiterCommonStore = useRecruiterCommonStore()

const dateFormat = (date: Date) => {
    const formatted = useDateFormat(new Date(date), 'YYYY-MM-DD mm:ss')
    console.log(formatted.value);

    return formatted.value
}

// const profileStore = useProfileStore()
const interviews = ref<any[]>([])
const tableIsLoading = ref<boolean>(false)
onMounted(() => {
    getInterviews()
})




async function getInterviews() {
    try {
        tableIsLoading.value = true
        const { data } = await api.recruiterGetInterviews()
        interviews.value = data
        tableIsLoading.value = false
        calendeAttributes.value[0].dates = interviews.value.map((x: { interview_date: Date }) => new Date(x.interview_date))
    } catch (error) {
        // console.log(error);

    }
}

const tableHeader = ref([
    { text: "Description", value: "description", sortable: true, },
    { text: "Status", value: "candidate_approved", sortable: true },
    { text: "Date", value: "interview_date", sortable: true },
    // { text: "Meeting Type", value: "meeting_type", sortable: true },
    { text: "", value: "view" },
    { text: "", value: "delete" },
]);


// view Interview
const detailsModalOpen = ref<any>(null)
const detailsModalClose = ref<any>(null)
const itemToView = ref<any>({})
function viewDetails(item: any) {
    detailsModalOpen.value?.click()
    itemToView.value = item
}
onBeforeRouteLeave(() => {
    detailsModalClose.value?.click()
})



// delete Interview
function deleteItem(id: string) {
    useFxn.confirm("Are you sure you want to delete this schedule?", "Yes Delete").then(async (response) => {
        if (response.value) {
            try {
                const formData = new FormData();
                formData.append('interview_id', id)
                await api.recruiterDeleteInterview(formData)
                useFxn.toast("Interview Deleted Successfully", "success")
                getInterviews()
            } catch (error) {
                useFxn.toast("Sorry something went wrong", "error")
            }
        }
    })
}



const calendeAttributes = ref<any[]>([
    {
        key: 'today',
        highlight: true,
        dates: [],
    },
]);

const events = ref(
    [
        {
            title: "Meeetin with Visitor",
            with: "Mr Joseph",
            time: { start: dateFormat(useFxn.addDaysToDate(new Date(), 1)), end: dateFormat(useFxn.addDaysToDate(new Date(), 1)) },
            color: "yellow",
            isEditable: true,
            id: "5602b6f589fc"
        },
    ]
)

const qualendarConfig = {
    defaultMode: "month",
}


</script>

<style lang="css" scoped></style>
