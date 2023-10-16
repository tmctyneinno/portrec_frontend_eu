

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
    <editAdditionalDetails />
    <editSocialLinks />
    <addEducation />
    <editEducation />
    <addExperience />
    <editExperience />
    <editSkills />
</template>

<script lang="ts" setup>

import ProfilePictureComponent from './profilePicture.vue';
import AboutMeComponent from './aboutMe.vue';
import ExperiencesComponent from './experiences.vue';
import EducationsComponent from './educations.vue';
import SkillsComponent from './skills.vue';
import AdditionalDetailsComponent from './additionalDetails.vue';
import SocialLinksComponent from './socialLinks.vue';

// modals
import editAboutMe from './modals/editAboutMe.vue'
import editAdditionalDetails from './modals/editAdditionalDetails.vue'
import editSocialLinks from './modals/editSocialLinks.vue'
import addEducation from './modals/addEducation.vue'
import editEducation from './modals/editEducation.vue'
import addExperience from './modals/addExperience.vue'
import editExperience from './modals/editExperience.vue'
import editSkills from './modals/editSkills.vue'

</script>

<style>
.profile-edit-btn {
    border: 1px solid #ccc;
    color: var(--theme-color);
    cursor: pointer;
    background-color: #fff;
    padding: 5px 7px;
}
</style>
