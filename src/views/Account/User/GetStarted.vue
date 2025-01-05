<template>
    <div class="row justify-content-center g-3 pb-5">
        <div class="col-12 mb-5">
            <div class="text-center fs-3 fw-bold">
                Welcome to PORTREC
            </div>
            <div class="text-center text-muted">
                Let’s guide you through the basics to help you get started quickly and make the most of your experience.
            </div>
        </div>

        <div class="col-lg-11">
            <div class="row g-0 mb-4">
                <div class="col-1">
                    <i class=" bi bi-1-circle"></i>
                </div>
                <div class="col">
                    <div class="fw-bolder">Set Billing Page
                        <router-link to="/user/billings" class="float-end theme-color text-decoration-none fw-bold">
                            Set Billing Page <i class="bi bi-arrow-right"></i>
                        </router-link>
                    </div>
                    <div>Choose your preferred billing type</div>
                </div>
            </div>

            <div class="row g-0 mb-4">
                <div class="col-1">
                    <i class=" bi bi-2-circle"></i>
                </div>
                <div class="col">
                    <div class="fw-bolder">Set up your Public profile
                        <router-link to="/user/profile" class="float-end theme-color text-decoration-none fw-bold">
                            Set Public profile <i class="bi bi-arrow-right"></i>
                        </router-link>
                    </div>
                    <div>
                        Customize your profile by adding a photo, bio, and personal details to make it uniquely yours
                    </div>
                </div>
            </div>


            <div class="row g-0 mb-4">
                <div class="col-1">
                    <i class=" bi bi-3-circle"></i>
                </div>
                <div class="col">
                    <div class="fw-bolder">Set Two Factor Authentication
                        <router-link to="#" class="float-end theme-color text-decoration-none fw-bold">
                            Set 2FA <i class="bi bi-arrow-right"></i>
                        </router-link>
                    </div>
                    <div>
                        Enhance your account security by setting up two-factor authentication (2FA) for an extra layer
                        of protection
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>
<script lang="ts" setup>

</script>

<style lang="css" scoped></style>
