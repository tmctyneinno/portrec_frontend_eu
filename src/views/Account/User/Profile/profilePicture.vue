

<template>
    <div class="col-12">
        <div class="card rounded-0">
            <div class="cover-photo"></div>
            <img src="https://via.placeholder.com/150" alt="Profile Picture"
                class="profile-picture mx-auto mx-lg-0 ms-lg-5 d-block">
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="css" scoped>
.cover-photo {
    height: 150px;
    background-color: var(--bs-warning-bg-subtle);
}

.profile-picture {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    position: relative;
    top: -75px;
}
</style>
