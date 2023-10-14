

<template>
    <div class="row justify-content-center g-3">
        <div class="col-lg-8">
            <div class="row g-3">
                <ProfilePictureComponent />
                <AboutMeComponent />
                <ExperiencesComponent />
                <EducationsComponent />
                <SkillsComponent />
            </div>
        </div>
        <div class="col-lg-4">
            <div class="row g-3">
                <AdditionalDetailsComponent />
                <SocialLinksComponent />
            </div>
        </div>
    </div>

    <!-- modals -->
    <editAboutMe />
</template>

<script lang="ts" setup>
import ProfilePictureComponent from './profilePicture.vue';
import AboutMeComponent from './aboutMe.vue';
import ExperiencesComponent from './experiences.vue';
import EducationsComponent from './educations.vue';
import SkillsComponent from './skills.vue';
import AdditionalDetailsComponent from './additionalDetails.vue';
import SocialLinksComponent from './socialLinks.vue';

import editAboutMe from './modals/editAboutMe.vue'
</script>

<style>
.profile-edit-btn {
    border: 1px solid #ccc;
    padding: 3px 6px;
    color: var(--theme-color);
    cursor: pointer;
}
</style>
