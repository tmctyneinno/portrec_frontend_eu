<template>
    <div class="animate__animated animate__fadeIn mb-5">
        <div class="section-panel section-panel-light py-5 px-3 px-md-5">
            <form @submit.prevent="" class="bg-white p-3 px-4 form-container shadow-sm">
                <div class="col-12">
                    <div class="row g-3">
                        <div class="col-lg-5">
                            <div class="input-group position-relative searchingBar" ref="dropdownElement">
                                <span class="input-group-text" id="addon-search"><i class="bi bi-search"></i> </span>
                                <input ref="titleField" v-model="form.search" type="text" class="form-control"
                                    placeholder="Job title or keyword" aria-describedby="addon-search">
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <v-select v-model="form.location" :loading="tempos.isLoadingCountries"
                                class="country-chooser-jobform find-jobs-select" placeholder="select country"
                                :options="allCountries" />
                        </div>
                        <div class="col-lg-2">
                            <button @click="searchCompanies" :disabled="tempos.isSearching" type="submit"
                                class="btn btn-search btn-primary  w-100">
                                {{ tempos.isSearching ? 'Searching...' : 'Search' }}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="mt-2 small">
                Popular : Twitter, Microsoft, Apple, Facebook
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';
import { useProfileStore } from '@/stores/profileStore';
import componentLoadingVue from '@/components/componentLoading.vue';



const form = reactive({
    location: '',
    search: '',
    // allCountries: [],
})

const tempos = reactive({
    isLoadingCountries: true,
    isSearching: false,
})

const allCountries = ref([])
const titleField = ref<any>(null)

onMounted(() => {
    // demoFxn()
    titleField.value.focus()
    loadCountries()
})

async function loadCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (response.ok) {
        const data = await response.json();
        let names = data.map((country: { name: any; }) => country.name.common)
        allCountries.value = names
        tempos.isLoadingCountries = false
    } else {
        console.error('', response.statusText);
    }
}

function searchCompanies() {
    console.log(form);

}


// async function demoFxn() {

//     try {
//         const resp = await api.companiesList();
//         console.log(resp);

//     } catch (error) {
//         console.log(error);
//     }
// }





</script>


<style lang="css" scoped>
.form-container,
.btn-search {
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
</style>
