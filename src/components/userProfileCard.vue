<template>
    <div class="col-sm-6 col-lg-">
        <div class="card p-0 border-0 h-100  shadow-sm small text-capitalize">
            <div class="card-header border-0 bg-transparent pb-0 text-muted xsmall">
                <div class="float-end">
                    <span v-if="userProfile.status == 'promoted'">
                        <i class="bi bi-check-circle-fill theme-color"></i> Promoted
                    </span>
                    <span v-else>
                        <i class="bi bi-hand-thumbs-up-fill theme-color"></i>
                        Recommended by <span class="theme-color">PORTREC</span>
                    </span>
                </div>
            </div>
            <div class="card-body py-0">
                <div class="row g-lg-5">
                    <div class="col-2 col-lg-1">
                        <div class="img-circle"></div>
                    </div>
                    <div class="col-10">
                        <div class="fw-bolder lh-1">{{ userProfile?.name }}</div>
                        <i v-for="i in userProfile?.star ?? 0" class="bi bi-star-fill xsmall theme-color lh-1"></i>
                        <div class="text-muted">{{ userProfile?.title }}</div>
                        <span v-for="(skill, i) in userSkills() ?? []" :key="i"
                            class="bg-secondary-subtle xsmall p-0 px-1 mx-1 d-inline-block text-nowrap mb-2">
                            {{ skill }}
                        </span>
                    </div>
                </div>
                <div>
                    <div class="table-responsive">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>
                                        <span class="text-muted me-2"> Experience:</span>
                                        {{ userProfile.experience }} years
                                    </td>
                                    <td>
                                        <span class="text-muted me-2"> Skills:</span>
                                        <span v-if="userProfile?.skills">
                                            {{ userProfile.skills.toString() }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="text-muted me-2"> Location:</span>
                                        {{ userProfile?.location }}
                                    </td>
                                    <td>
                                        <span class="text-muted me-2"> Avalaiblity:</span>
                                        {{ userProfile?.avalaiblity }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <div class="card-footer border-0 bg-transparent pt-0 ps-4 ">
                <RouterLink class="theme-color fw-bold text-decoration-none fw-bold" to="/">
                    View Profile <i class="bi bi-arrow-right"></i>
                </RouterLink>
            </div>

        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    userProfile: {
        type: Object,
        required: true,
    }
})


const userSkills = () => {
    const skills = props.userProfile?.skills || [];
    const remainingCount = skills.length - 3;

    return skills.length > 3
        ? [...skills.slice(0, 3), `+${remainingCount}`]
        : skills;
};

</script>
<style scoped>
.card-icon {
    font-size: 2.51rem;
}

.top-tag {
    color: var(--theme-color);
    border: 1px solid var(--theme-color);
    padding: 3px 6px;
    font-size: 12px;
}

.img-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--theme-color-soft);
    border: 1px solid #e8e5e5;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

.category-tag {
    display: inline-block;
    margin-bottom: 5px;
}

a:hover {
    font-weight: bolder !important;
    color: black !important;
    transform: translateX(5px) !important;
}



/* .featured-card:hover {
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
    border-color: var(--theme-color);
    background-color: var(--theme-color2-soft);
    border-width: 2px;
} */

/* .featured-card:hover .card-title {
    color: var(--theme-color);
} */


/* @media (max-width: 767px) {
    .featured-card .card-title {
        color: var(--theme-color);
    }
} */
</style>