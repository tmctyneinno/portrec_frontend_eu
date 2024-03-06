<template>
    <div class="col-12">
        <div class="card border-0 shadow-sm position-relative">
            <div class="cover-photo"></div>
            <img src="@/assets/images/dp_temp.png" alt="Profile Picture"
                class="profile-picture mx-auto ms-5 d-block bg-light">
            <div class="card-body small">
                <div class="d-flex float-lg-end ">
                    <div class="me-lg-5 mt-5 mt-lg-0 mb-3">
                        <div class="fs-5 fw-lighter text-capitalize">{{ profileStore.data?.name ?? '' }}</div>
                        <div v-if="recentPosition" class="text-muted text-capitalize">
                            {{ recentPosition }}
                        </div>
                        <div v-show="location_country" class="text-muted text-capitalize">
                            <i class="bi bi-geo-alt"></i>
                            {{ profileStore.data?.location ?? '' }}, {{ profileStore.data?.country ?? '' }}
                        </div>
                    </div>
                    <div class="mt-5 mt-lg-0">
                        <router-link to="/user/settings" class="btn btn-link theme-color text-decoration-none btn-sm">
                            <i class="bi bi-pencil"></i> Edit profile
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from '@/stores/profileStore';
import { computed } from 'vue';

const profileStore = useProfileStore()


const recentPosition = computed(() => {
    const company = profileStore.data?.experience || [];
    const recent = company.find((comp: any) => comp.end_date == null);
    return recent ? `${recent.job_title} at ${recent.company_name}` : '';
});

const location_country = computed(() => {
    const location = profileStore.data?.location ?? '';
    const country = profileStore.data?.country ?? '';

    return location && country ? true : false;
})

</script>

<style lang="css" scoped>
.cover-photo {
    height: 150px;
    background: url('@/assets/images/profile_settings_head.png');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
}

.profile-picture {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    position: absolute;
    top: 75px;
    border: 4px solid #fff;
}


/* .btn-link {
    background-color: #f8f8f8;
} */

@media (max-width: 767px) {
    .btn-link {
        font-size: 9px;
    }
}
</style>
