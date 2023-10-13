<template>
    <div class="position-relativ">
        <form @submit.prevent="" class="bg-white p-3 px-4 form-container shadow-sm">
            <div class="col-12">
                <div class="row g-3">
                    <div class="col-lg-5">
                        <div class="input-group position-relative">
                            <span class="input-group-text" id="addon-search"><i class="bi bi-search"></i> </span>
                            <input type="text" class="form-control" placeholder="Job title or keyword"
                                aria-describedby="addon-search">
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <v-select :loading="loading" class="country-chooser" placeholder="select country"
                            :options="allCountries" />
                    </div>
                    <div class="col-lg-3">
                        <button type="submit" class="btn  w-100"
                            :class="{ 'btn-dark': fromHome, 'btn-primary': !fromHome }">
                            Search my job
                        </button>
                    </div>
                </div>
            </div>
        </form>
        <!-- <div class="mt-2">
            Popupar: UI Designer, UX Researcher, Andrioid, Admin
        </div> -->
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

defineProps({
    fromHome: {
        type: Boolean,
        default: false
    }
})

const allCountries = ref([])
const loading = ref(true)

onMounted(async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (response.ok) {
        const data = await response.json();
        let names = data.map((country: { name: any; }) => country.name.common)
        allCountries.value = names
        loading.value = false
    } else {
        console.error('', response.statusText);
    }
})



</script>


<style lang="css" scoped>
.form-container,
.btn {
    border-radius: 100px;
}

.input-group .form-control,
.input-group .input-group-text {
    background-color: #fff !important;
    outline: 0;
    border-width: 0 0 1px;
    font-size: 14px;
    border-radius: 0px;
}

@media (max-width: 994px) {

    .form-container,
    .btn {
        border-radius: 0px !important;
    }
}
</style>

<style>
.country-chooser .vs__search::placeholder,
.country-chooser .vs__dropdown-toggle,
.country-chooser .vs__dropdown-menu {
    background-color: #fff !important;
    outline: 0;
    border-width: 0 0 1px;
    font-size: 14px;
    border-radius: 0px;
}

/* .country-chooser .vs__clear,
.country-chooser .vs__open-indicator {
    fill: #394066;
} */
</style>
