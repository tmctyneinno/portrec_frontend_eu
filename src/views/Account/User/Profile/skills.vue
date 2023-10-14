

<template>
    <div class="col-12">
        <div class="card rounded-0">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                Skills
                <span class="float-end">
                    <span class="profile-edit-btn">
                        <i class="bi bi-pencil-square"></i>
                    </span>
                </span>
            </div>
            <div class="card-body small">
                <span v-for="i in 8" :key="i" class="skills-tag">my_skill_{{ i }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="css" scoped>
.skills-tag {
    background-color: var(--bs-light);
    color: var(--theme-color);
    padding: 5px 8px;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    font-size: small;
}
</style>
