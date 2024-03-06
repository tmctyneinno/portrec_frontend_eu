<template>
    <div>
        <allCompaniesComponent v-if="pageToShow == 'all'" />
        <companyDetailsComponent v-else />
    </div>
</template>

<script lang="ts" setup>
import { watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router';
import companyDetailsComponent from './companyDetailsComponent.vue';
import allCompaniesComponent from './allCompaniesComponent.vue';

const route = useRoute()

const pageToShow = ref<'details' | 'all'>('all')
watchEffect(() => {
    const companyId: any = route.query?.company ?? null
    pageToShow.value = companyId ? 'details' : 'all'
})

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
