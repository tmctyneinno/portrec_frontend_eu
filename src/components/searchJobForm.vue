<template>
    <div class="position-relativ">
        <form @submit.prevent="" class="bg-white p-3 px-4 form-container shadow-sm">
            <div class="col-12">
                <div class="row g-3">
                    <div class="col-lg-5">
                        <div class="input-group position-relative searchingBar" ref="dropdownElement">
                            <span class="input-group-text" id="addon-search"><i class="bi bi-search"></i> </span>
                            <input @input="onInputChange" ref="titleField" v-model="jobsStore.search.title" type="text"
                                class="form-control" placeholder="Job title or keyword" aria-describedby="addon-search">

                            <ul v-if="suggestions.length" class="searchingBar-suggestions">
                                <li v-for="(suggestion, index) in suggestions" :key="index"
                                    @click="selectSuggestion(suggestion)">{{ suggestion }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-5 d-none d-md-block">
                        <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                            v-model="jobsStore.search.location" :loading="loading"
                            class="country-chooser-jobform find-jobs-select" placeholder="select country"
                            :options="allCountries" />
                    </div>
                    <div class="col-lg-5 d-md-none">
                        <select class="form-select form-select-lg" placeholder="location">
                            <option v-for="i in allCountries" :value="i">{{ i }}</option>
                        </select>

                    </div>
                    <div class="col-lg-2">
                        <button @click="searchJobs" :disabled="formIsSearcing" type="submit" class="btn  w-100"
                            :class="{ 'btn-dark': fromHome, 'btn-primary': !fromHome }">
                            {{ formIsSearcing ? 'Searching...' : 'Search job' }}
                        </button>
                    </div>
                </div>
            </div>
        </form>
        <div v-if="!fromHome" class="mt-2 small">
            Popupar: UI Designer, UX Researcher, Andrioid, Admin
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useJobsStore } from '@/stores/jobsStore';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions'
import { useRouter } from 'vue-router';
import { Country } from 'country-state-city';

const prop = defineProps({
    fromHome: {
        type: Boolean,
        default: false
    }
})

const jobsStore = useJobsStore()
const allCountries = ref<any[]>([])
const loading = ref(false)
const titleField = ref<any>(null)
const formIsSearcing = ref(false)
const router = useRouter()


onMounted(async () => {
    titleField.value.focus()
    try {
        const countriesArray = Country.getAllCountries()
        allCountries.value = countriesArray.map((country: any) => country.name)
    } catch (error) {
        // 
    }
    // const response = await fetch('https://restcountries.com/v3.1/all');
    // if (response.ok) {
    //     const data = await response.json();
    //     let names = data.map((country: { name: any; }) => country.name.common)
    //     allCountries.value = names
    //     loading.value = false
    // } else {
    //     console.error('', response.statusText);
    // }

    // for suggestions 
    document.body.addEventListener('click', handleBodyClick);
})


async function searchJobs() {

    // if (!useFxn.isOnline()) {
    //     useFxn.toastShort('You are offline!')
    //     return
    // }

    if (jobsStore.search.title) {
        formIsSearcing.value = true

        try {
            let resp = await api.searchByLocation(jobsStore.search.title, jobsStore.search.location)
            if (resp.status == 200) {
                jobsStore.allJobsChunked = resp.data.body
                jobsStore.allJobsData = resp.data.body.data
                jobsStore.isFromSearch = true

                if (prop.fromHome) {
                    router.push({
                        path: '/find-jobs'
                    })
                }
            }
        } catch (error) {
            // 
        }
        finally {
            formIsSearcing.value = false
        }
    }
}


// suggestions on input
const suggestions = ref<string[]>([]);
const dropdownElement = ref<any>(null);

// listen to input
const onInputChange = useFxn.debounce(populateSuggestions, 300);

// populate suggestions based on input string
function populateSuggestions() {
    const inputText = jobsStore.search.title.toLowerCase();
    if (inputText === '') {
        suggestions.value = [];
    } else {
        suggestions.value = jobsStore.jobsKeyWords.filter((suggestion: string) =>
            suggestion.toLowerCase().includes(inputText)
        );
    }
}

// set field when a suggestion is clicked
function selectSuggestion(suggestion: string) {
    jobsStore.search.title = suggestion;
    suggestions.value = [];
}

// handle clicking of outside the input field
function handleBodyClick(event: { target: any; }) {
    if (dropdownElement.value) {
        const isInsideDropdown = dropdownElement.value.contains(event.target);
        if (!isInsideDropdown) {
            suggestions.value = [];
        }
    }
}

watchEffect(() => {
    if (suggestions.value.length > 0) {
        document.body.addEventListener('click', handleBodyClick);
    } else {
        document.body.removeEventListener('click', handleBodyClick);
    }
});

</script>


<style lang="css" scoped>
.form-container,
.btn {
    border-radius: 10px;
}

.input-group .form-control,
.input-group .input-group-text {
    background-color: #fff !important;
    outline: 0;
    border-width: 0 0 1px;
    font-size: 14px;
    border-radius: 0px;
}

@media (min-width: 994px) {

    .input-group .form-control,
    .input-group .input-group-text {
        border: none !important;
    }
}
</style>

<style>
.country-chooser-jobform .vs__search::placeholder,
.country-chooser-jobform .vs__dropdown-toggle,
.country-chooser-jobform .vs__dropdown-menu {
    background-color: #fff !important;
    outline: 0;
    border-width: 0 0 1px;
    font-size: 14px;
    border-radius: 0px;
    /* border: none !important; */
}

@media (min-width: 994px) {

    .country-chooser-jobform .vs__search::placeholder,
    .country-chooser-jobform .vs__dropdown-toggle,
    .country-chooser-jobform .vs__dropdown-menu {
        border: none !important;
    }


    /* .form-container,
.btn {
    border-radius: 0px !important;
} */
}


/* .country-chooser-jobform .vs__clear,
.country-chooser-jobform .vs__open-indicator {
    fill: #394066;
} */


.searchingBar-suggestions {
    list-style: none;
    padding: 0;
    /* margin: 0; */
    position: absolute;
    background-color: #fff;
    border: 1px solid #f2eeee;
    border-top: none;
    border-radius: 0px 0px 5px 5px !important;
    width: 100%;
    margin-top: 45px;
    z-index: 10000;
}

.searchingBar-suggestions li {
    padding: 8px;
    cursor: pointer;
}

.searchingBar-suggestions li:hover {
    background-color: #f0f0f0;
}

.form-select {
    border: none;
    border-bottom: 1px solid #94a3b8;
}
</style>
