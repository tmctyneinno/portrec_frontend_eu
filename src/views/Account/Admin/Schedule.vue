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
            <button class="btn btn-sm btn-primary-outline fw-bold mb-3 w-100">
                <i class="bi bi-plus"></i> Create Event
            </button>
            <VCalendar class="border-0" title-position="left" expanded :attributes='attrs' />
            <hr>

            <div class="small">
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
            </div>
        </div>

        <div class="col-lg-8">
            <Qalendar :events="events" :config="qualendarConfig" :selected-date="new Date()" />
            <!-- <img src="@/assets/images/schedule.png" alt="schedule"> -->
        </div>


    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { useDateFormat } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions'
// import { useAdminCommonStore } from './AdminCommonStore';
// @ts-ignore
import { Qalendar } from "qalendar";

// const adminCommonStore = useAdminCommonStore()

const dateFormat = (date: Date) => {
    const formatted = useDateFormat(new Date(date), 'YYYY-MM-DD mm:ss')
    console.log(formatted.value);

    return formatted.value
}

const profileStore = useProfileStore()
onMounted(() => {
    console.log(profileStore.data);
})

const attrs = ref([
    {
        key: 'today',
        highlight: true,
        dates: new Date(),
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
