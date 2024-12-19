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

        <div class="col-lg-4 border-righ">
            <div class="card">
                <div class="card-body">
                    <button class="btn btn-sm btn-primary-outline fw-bold mb-3 w-100">
                        <i class="bi bi-plus"></i> Create Event
                    </button>
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

        <div class="col-lg-8">
            <div class="fw-bold mb-2">Interviews</div>
            <EasyDataTable class="" :loading="tableIsLoading" show-index alternating :headers="tableHeader"
                :items="interviews" buttons-pagination>

                <template #header="header">
                    <span class="fw-bold text-muted">{{ header.text == '#' ? 'S/N' : header.text }}</span>
                </template>

                <template #item-score="item">
                    <i v-if="item.score < 3" class="bi bi-star text-dark"></i>
                    <i v-else class="bi bi-star-fill text-warning"></i>
                    {{ item.score }}

                </template>

                <template #item-interview_date="item">
                    {{ useFxn.dateDisplay(item.interview_date) }}
                </template>

                <template #item-candidate_approved="item">
                    <span class="category-tag"
                        :class="!item.candidate_approved ? 'bg-light' : (item.candidate_approved == 1 ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger')">
                        {{ !item.candidate_approved ? 'Not Responded' : (item.candidate_approved == 1 ? 'Accepted' :
                            'Rejected') }}
                    </span>
                </template>

                <template #item-action="item">
                    <button
                        class=" btn btn-sm btn-primary-outline border-0 rounded-5 text-decoration-none btn-sm p-1 px-2 ">
                        <i class=" bi bi-eye"></i>
                    </button>
                </template>

            </EasyDataTable>
            <!-- <Qalendar :events="events" :config="qualendarConfig" :selected-date="new Date()" /> -->


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
        // console.log(calendeAttributes.value[0].dates);


    } catch (error) {
        // console.log(error);

    }
}

const tableHeader = ref([
    { text: "Description", value: "description", sortable: true, },
    { text: "Status", value: "candidate_approved", sortable: true },
    { text: "Date", value: "interview_date", sortable: true },
    { text: "Meeting Type", value: "meeting_type", sortable: true },
    { text: "", value: "action" },
]);






const calendeAttributes = ref([
    {
        key: 'today',
        highlight: true,
        dates: [new Date(), useFxn.addDaysToDate(new Date(), 1)],
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
        {
            title: "Interview",
            with: "Amaka",
            time: { start: dateFormat(new Date()), end: dateFormat(new Date()) },
            color: "green",
            isEditable: true,
            id: "5602b6f589fc"
        }
        // ...
    ]
)

const qualendarConfig = {
    defaultMode: "month",
}


</script>

<style lang="css" scoped></style>
