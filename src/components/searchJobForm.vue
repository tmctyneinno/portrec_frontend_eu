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
                        <div class="input-group position-relative">
                            <span class="input-group-text" id="addon-location"><i class="bi bi-geo-alt"></i></span>
                            <select class="form-select form-control" id="inputGroupSelect01">
                                <option selected>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
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
defineProps({
    fromHome: {
        type: Boolean,
        default: false
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
