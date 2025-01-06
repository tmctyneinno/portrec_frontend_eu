<template>
    <div class="position-relativ">
        <form @submit.prevent="" class="col-md-12 p-3 p-lg-2 px- form-container">
            <div class="row g-3">
                <div class="col-lg-8">
                    <div class="input-group position-relative searchingBar border-right-l" ref="dropdownElement">
                        <span class="input-group-text" id="addon-search"><i class="bi bi-search"></i> </span>
                        <input @input="onInputChange" ref="titleField" v-model="searchForm.keyword" type="text"
                            class="form-control" placeholder="keyword or skill" aria-describedby="addon-search">

                        <ul v-if="suggestions.length" class="searchingBar-suggestions">
                            <li v-for="(suggestion, index) in suggestions" :key="index"
                                @click="selectSuggestion(suggestion)">{{ suggestion }}</li>
                        </ul>
                    </div>
                </div>
                <!-- <div class="col-lg-5  position-relative">
                    <v-select :taggable="true" append-to-body :calculate-position="useFxn.vueSelectPositionCalc"
                        v-model="searchForm.location" :loading="loading"
                        class="country-chooser-jobform find-jobs-select" placeholder="city or state"
                        :options="allCountries" />
                    <i class=" bi bi-geo-alt location-select-icon"></i>
                </div> -->
                <div class="col-lg-4">
                    <primaryButton v-if="!formIsSearching" @click="searchUsers" className="w-100" btnType="submit">
                        Search
                    </primaryButton>
                    <primaryButtonLoading v-else className="w-100" />
                </div>
            </div>
        </form>

    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect, reactive } from 'vue';
import { useJobsStore } from '@/stores/jobsStore';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions'
import { Country } from 'country-state-city';
import type { UserProfileCardInterface } from '@/stores/interfaces';

const jobsStore = useJobsStore()
const allCountries = ref<any[]>([])
const loading = ref(false)
const titleField = ref<any>(null)
const formIsSearching = ref(false)

const searchForm = reactive({
    keyword: '',
    // location: ''
})



const emits = defineEmits(['done'])


onMounted(async () => {
    titleField.value.focus()
    try {
        const countriesArray = Country.getAllCountries()
        allCountries.value = countriesArray.map((country: any) => country.name)
    } catch (error) {
        // 
    }

    // for suggestions 
    document.body.addEventListener('click', handleBodyClick);
})


async function searchUsers() {
    if (searchForm.keyword) {
        formIsSearching.value = true

        const formData = new FormData()
        formData.append('search', searchForm.keyword)
        // formData.append('location', searchForm.location)

        const talentSorted: UserProfileCardInterface[] = []

        try {
            let resp = await api.recruiterSearchTalent(formData)

            const array = resp?.data?.body ?? []

            if (array.length) {
                array.forEach((item: any) => {
                    const userSkills = (item.user.skill ?? []).map((x: { skills: { name: any } }) => x.skills.name);

                    const newMapp: UserProfileCardInterface = {
                        id: item.user.id,
                        name: item.user.name,
                        title: item.user?.profile?.professional_headline,
                        status: item.is_promoted == 1 ? 'promoted' : 'recommended',
                        skills: userSkills,
                        experience: item.user?.profile?.experience_level,
                        star: 4,
                        location: item.user?.profile?.location,
                        availability: '',
                    }
                    talentSorted.push(newMapp)
                });
            }

            emits('done', talentSorted)


        } catch (error) {
            console.log(error);

        }
        finally {
            formIsSearching.value = false
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

.form-container {
    border: 1px solid var(--bs-border-color)
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

.location-select-icon {
    position: absolute;
    left: 10px;
    top: 40%;
    margin-right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #6c757d;
}
</style>

<style>
.country-chooser-jobform .vs__search::placeholder,
.country-chooser-jobform .vs__dropdown-toggle,
.country-chooser-jobform .vs__dropdown-menu {
    background-color: transparent !important;
    outline: 0;
    border-width: 0 0 1px;
    font-size: 14px;
    border-radius: 0px;
    padding-left: 20px;
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

.form-select-search-job {
    border: none;
    border-bottom: 1px solid #94a3b8;
}
</style>
