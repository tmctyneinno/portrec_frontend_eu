<template>
    <overlayLoadingVue v-if="tempos.pageIsLoading" />
    <div class="animate__animated animate__fadeIn mb-5">
        <div class="section-panel section-panel-light py-5 px-3 px-md-5">
            <form @submit.prevent="" class="bg-white p-3 px-4 form-container shadow-sm">
                <div class="col-12">
                    <div class="row g-3">
                        <div class="col-lg-5">
                            <div class="input-group position-relative searchingBar">
                                <span class="input-group-text" id="addon-search"><i class="bi bi-search"></i> </span>
                                <input ref="formSearchField" v-model="form.search" type="text" class="form-control"
                                    placeholder="company title or keyword" aria-describedby="addon-search">
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <v-select v-model="form.location" :loading="tempos.isLoadingCountries"
                                class="country-chooser-jobform find-jobs-select" placeholder="select country"
                                :options="allCountries" />
                        </div>
                        <div class="col-lg-2">
                            <button @click="getCompanies()" :disabled="tempos.isSearching" type="submit"
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


        <div class="container py-3">
            <div class="row pt-5">
                <div class="col-lg-3">
                    <div class="card border-0 pb-3">
                        <div class="row gy-3">
                            <div class="col-12 col-md-6 col-lg-12">
                                <div class="accordion accordion-flush" id="industry-accordion">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#flush-collapseOne" aria-expanded="true"
                                                aria-controls="flush-collapseOne">
                                                Industry
                                            </button>
                                        </h2>
                                        <div id="flush-collapseOne" class="accordion-collapse collapse show"
                                            data-bs-parent="#industry-accordion">
                                            <div class="accordion-body small">
                                                <div class="list-group list-group-flush">

                                                    <label v-for="option in filterOptions.industry" :key="option.id"
                                                        class="list-group-item border-0 text-capitalize">
                                                        <input class="form-check-input me-1" type="checkbox"
                                                            :value="option.id" v-model="checked.industry"
                                                            @click="setIndustryIdAndQuery(option.id)">
                                                        {{ option.name }}
                                                    </label>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 col-md-6 col-lg-12">
                                <div class="accordion accordion-flush" id="company-size-accordion">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#flush-collapseTwo" aria-expanded="true"
                                                aria-controls="flush-collapseTwo">
                                                Company Size
                                            </button>
                                        </h2>
                                        <div id="flush-collapseTwo" class="accordion-collapse collapse show"
                                            data-bs-parent="#company-size-accordion">
                                            <div class="accordion-body small">
                                                <div class="list-group list-group-flush">

                                                    <label v-for="option in filterOptions.company_size" :key="option"
                                                        class="list-group-item border-0 text-capitalize">
                                                        <input class="form-check-input me-1" type="checkbox"
                                                            :value="option.id" v-model="checked.company_size"
                                                            @click="setCompanySizeAndQuery(option.id)">
                                                        {{ option.name }}
                                                    </label>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9 min-vh-100">
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="row justify-content-center align-items-center ">
                                <div class="col">
                                    <div class="fw-bold fs-4">{{ titleName }}
                                    </div>
                                    <div class="xsmall">
                                        Showing page <span class="fw-bold">{{ pagination.currentPage }}/ {{
                                            pagination.totalPages
                                        }}</span>
                                        of <span class="fw-bold">{{ pagination.totalRecords }}</span> results
                                    </div>
                                </div>
                                <div class="col">
                                    <span v-if="titleName != 'All Companies'" @click="showAllCompanies"
                                        class="fw-bolder float-end theme-color small cursor-pointer">
                                        Show all <i class="bi bi-chevron-right"></i>
                                    </span>
                                </div>
                            </div>



                        </div>
                        <div class="col-12">
                            <div v-if="companiesArray.length" class="row g-3 bg-light p-2 pt-0">

                                <div class="col-md-6" v-for="coy in companiesArray" :key="coy.id">
                                    <div @click="getCompanyDetails(coy.id)"
                                        class=" coy-card cursor-pointer card h-100 hover-tiltY shadow-sm">
                                        <div class="card-header border-0 bg-transparent pt-3 ">
                                            <img :src="coy.image" width="100" alt="">

                                        </div>
                                        <div class="card-body py-0 py-lg-2">
                                            <div class="card-title fw-bold fs-6">{{ coy.name }}
                                            </div>

                                            <p class="mt-1 mt-lg-2 mb-0">{{ useFxn.truncateStr(coy.description, 100) }}</p>
                                        </div>
                                        <div class="card-footer bg-transparent border-0 pb-2 pb-lg-4">
                                            <span class="category-tag">
                                                {{ industryName(coy.industry_id) }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <noDataShowVue />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- pagination -->
                <div class="mt-5">
                    <customPagination :currentPage="pagination.currentPage" :perPage="pagination.perPage"
                        :totalRecords="pagination.totalRecords" @moveToNext="paginateToNext" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';
import overlayLoadingVue from '@/components/overlayLoading.vue';
import { useRouter } from 'vue-router';
import noDataShowVue from '@/components/noDataShow.vue';

// search
const form = reactive({
    location: '',
    search: '',
})
const formSearchField = ref<any>(null)

const tempos = reactive({
    isLoadingCountries: true,
    isSearching: false,
    pageIsLoading: true
})
const titleName = ref<string>('All Companies')

const allCountries = ref([])

const router = useRouter()

const companiesArray = ref<any[]>([])

// pagination
const pagination = reactive({
    currentPage: 1,
    totalPages: 2,
    perPage: 20,
    totalRecords: 40
})


const filterOptions = reactive<any>({
    industry: [],
    company_size: []
})

const checked = reactive<any>({
    company_size: [],
    industry: [],
})

const industryName = (id: string | number) => {
    const industry = filterOptions.industry.find((x: any) => x.id == id)
    return industry?.name ?? ''
}

onMounted(() => {
    getCompanies(1)
    formSearchField.value.focus()
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


async function getCompanies(page = 1) {
    try {
        const resp = await api.companiesList(form.search, page);
        distributeApiResponse(resp)

    } catch (error) {
        console.log(error);
        // tempos.pageIsLoading = false
    }
}

function showAllCompanies() {
    form.search = ''
    checked.industry = []
    checked.company_size = []
    getCompanies()
}

function distributeApiResponse(resp: any) {
    titleName.value = (form.search || checked.industry.length || checked.company_size.length) ? 'Search/Filter Results' : 'All Companies';

    const data = resp.data.data;
    filterOptions.industry = data.industry
    filterOptions.company_size = data.company_size

    pagination.currentPage = data.company.current_page
    pagination.totalPages = data.company.last_page
    pagination.perPage = data.company.per_page
    pagination.totalRecords = data.company.total

    companiesArray.value = data.company.data
    tempos.pageIsLoading = false
}

function paginateToNext(page: any) {
    window.scrollTo(0, 0)
    getCompanies(page)
}


async function setIndustryIdAndQuery(id: string) {
    if (checked.industry[0] == id) {
        checked.industry = []
        getCompanies()
    } else {
        checked.industry = [id];
        const str = `industry_${checked.industry[0]}`;
        try {
            const resp = await api.companiesFilter(str);
            distributeApiResponse(resp)

        } catch (error) {
            // Handle error
        }
    }
}


async function setCompanySizeAndQuery(id: string) {
    if (checked.company_size[0] == id) {
        checked.company_size = []
        getCompanies()
    } else {
        checked.company_size = [id];
        const str = `company_size_${checked.company_size[0]}`;
        try {
            const resp = await api.companiesFilter(str);
            distributeApiResponse(resp)

        } catch (error) {
            console.log(error);

        }
    }
}



async function getCompanyDetails(id: string | number) {
    router.push({
        path: 'browse-companies',
        query: {
            company: id,
            scvnfhyghdsdadf: new Date().getMilliseconds()
        }
    })
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

.coy-card {
    border-color: transparent;
}

.coy-card:hover {
    background-color: var(--bs-light-bg-subtle);
    border: 1px solid var(--bs-light);
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





/* accordion */
.accordion-button {
    padding-block: 0px;
}

.accordion-button:not(.collapsed) {
    color: var(--bs-black);
    background-color: var(--bs-transparent);
    /* box-shadow: inset 0 calc(-1 * var(--bs-accordion-border-width)) 0 var(--bs-accordion-border-color); */
    box-shadow: none;
}

.accordion-body .list-group-item {
    cursor: pointer;
}

/* accordion */
</style>
