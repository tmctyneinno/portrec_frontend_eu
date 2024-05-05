<template>
    <div class="mb-5">
        <div class="section-panel section-panel-light py-5 px-3 px-md-5">
            <form @submit.prevent="" class="bg-white p-3 px-4 form-container shadow-sm">
                <div class="col-12">
                    <div class="row g-3">
                        <div class="col-lg-5">
                            <div class="input-group position-relative searchingBar">
                                <span class="input-group-text" id="addon-search"><i class="bi bi-search"></i> </span>
                                <input ref="formSearchField" v-model="commonStore.searchString" type="text"
                                    class="form-control" placeholder="company title or keyword"
                                    aria-describedby="addon-search">
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <v-select v-model="form.location" :loading="isLoadingCountries"
                                class="country-chooser-jobform find-jobs-select" placeholder="select country"
                                :options="allCountries" />
                        </div>
                        <div class="col-lg-2">
                            <button @click="getCompanies()" :disabled="commonStore.isSearching" type="submit"
                                class="btn btn-search btn-primary  w-100">
                                {{ commonStore.isSearching ? 'Searching...' : 'Search' }}
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
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCommonStore } from './commonStore'

// search
const form = reactive({
    location: '',
    search: '',
})
const formSearchField = ref<any>(null)
const isLoadingCountries = ref<boolean>(true)

const allCountries = ref([])
const router = useRouter();
const commonStore = useCommonStore();


onMounted(() => {
    formSearchField.value.focus()
    loadCountries()
})

async function loadCountries() {

    const response = await fetch('https://restcountries.com/v3.1/all');
    if (response.ok) {
        const data = await response.json();
        let names = data.map((country: { name: any; }) => country.name.common)
        allCountries.value = names
        isLoadingCountries.value = false

    } else {
        console.error('', response.statusText);
    }
}

function getCompanies() {
    commonStore.isSearching = true
    commonStore.searchIsClicked = !commonStore.searchIsClicked
    router.push({ path: 'browse-companies' })

}


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
</style>
