<script lang="ts" setup>

</script>

<template>
    <div class="mt-3 position-relativ animate__animated animate__slideInLeft">
        <form @submit.prevent="" class="bg-white p-3 p-lg-4 overlay-for shadow-sm ">
            <div class="col-12">
                <div class="row g-3">
                    <div class="col-lg-4">
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
                    <div class="col-lg-4">
                        <button type="submit" class="btn btn-primary w-100 rounded-0">
                            Search my job <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </form>
        <div class="mt-1">
            Popupar: UI Designer, UX Researcher, Andrioid, Admin
        </div>
    </div>
</template>

<style lang="css" scoped>
.overlay-form {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
}

.input-group .form-control,
.input-group .input-group-text {
    background-color: #fff !important;
    outline: 0;
    border-width: 0 0 1px;
    font-size: 14px;
    border-radius: 0px;
}
</style>
