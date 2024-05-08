<template>
    <overlayLoadingVue v-if="tempos.pageIsLoading" />
    <div class="animate__animated animate__fadeIn mb-5">

        <div class="container py-3">
            <div class="row pt-5">
                <div class="col-lg-3">
                    <div class="card border-0 pb-3">
                        <div class="row gy-3">
                            <div class="col-12 col-md-6 col-lg-12">
                                <div class="accordion accordion-flush" id="industry-accordion">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button fw-bold" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                                                aria-expanded="true" aria-controls="flush-collapseOne">
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
                                                            @click="setCheckboxAndFilter(option.id, 'industry')">
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
                                            <button class="accordion-button fw-bold" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"
                                                aria-expanded="true" aria-controls="flush-collapseTwo">
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
                                                            @click="setCheckboxAndFilter(option.id, 'company_size')">
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
                                <div class="col-lg-6">
                                    <div class="fw-bold fs-4">{{ titleShowing }}
                                    </div>
                                    <div class="xsmall">
                                        Showing page <span class="fw-bold">{{ pagination.currentPage }}/ {{
        pagination.totalPages
    }}</span>
                                        of <span class="fw-bold">{{ pagination.totalRecords }}</span> results
                                    </div>
                                </div>
                                <div class="col">
                                    <span v-if="titleShowing != 'All Companies'" @click="showAllCompanies"
                                        class="fw-bolder float-end theme-color small cursor-pointer">
                                        Show all <i class="bi bi-chevron-right"></i>
                                    </span>
                                </div>
                            </div>



                        </div>
                        <div class="col-12">
                            <div v-if="companiesArray.length" class="row g-3 bg-light p-3">
                                <div class="col-md-6" v-for="coy in companiesArray" :key="coy.id">
                                    <div @click="getCompanyDetails(coy.id)"
                                        class=" coy-card cursor-pointer card h-100 hover-tiltY shadow-sm">
                                        <div class="card-header border-0 bg-transparent pt-3 ">
                                            <img :src="coy.image" width="100" alt="">

                                        </div>
                                        <div class="card-body py-0 py-lg-2">
                                            <div class="card-title fw-bold fs-6">{{ coy.name }}
                                            </div>

                                            <p class="mt-1 mt-lg-2 mb-0">{{ useFxn.truncateStr(coy.description, 100) }}
                                            </p>
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
import { ref, reactive, onMounted, watch } from 'vue';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';
import overlayLoadingVue from '@/components/overlayLoading.vue';
import { useRouter } from 'vue-router';
import noDataShowVue from '@/components/noDataShow.vue';
import { useCommonStore } from './commonStore'

const tempos = reactive({
    pageIsLoading: true
})
const titleShowing = ref<string>('All Companies')

const router = useRouter()

const companiesArray = ref<any[]>([])
const commonStore = useCommonStore();

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
})

watch(() => commonStore.searchIsClicked, () => {
    getCompanies()
})




async function getCompanies(page = 1) {
    try {
        const resp = await api.companiesList(commonStore.searchString, page);
        displayDataContents(resp)
        commonStore.isSearching = false

    } catch (error) {
        console.log(error);
        tempos.pageIsLoading = false
    }
}

function showAllCompanies() {
    commonStore.searchString = ''
    checked.industry = []
    checked.company_size = []
    getCompanies()
}

function displayDataContents(resp: any) {
    titleShowing.value = (commonStore.searchString || checked.industry.length || checked.company_size.length) ? 'Search/Filter Results' : 'All Companies';

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

async function setCheckboxAndFilter(id: string, name: string) {
    if (checked[name][0] == id) {
        checked[name] = []
        getCompanies()
    } else {
        checked[name] = [id]
        filterCompaniesByParams()
    }
}

async function filterCompaniesByParams() {
    const str = `filter=${checked.industry[0] ?? ''}&size=${checked.company_size[0] ?? ''}`;

    try {
        const resp = await api.companiesFilter(str);
        displayDataContents(resp)

    } catch (error) {
        console.log(error);

    }
}


async function getCompanyDetails(id: string | number) {
    router.push({
        path: 'browse-companies',
        query: {
            company: id,
            coy9df3fgTbcvnmYUd: new Date().getTime()
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
    border: none !important;
}

.coy-card:hover {
    /* background-color: #eeeeeebd; */
    border: 1px solid var(--theme-color) !important;
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
