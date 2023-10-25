

<template>
    <div class="col-12">
        <div class="card rounded-0">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                Skills
                <span class="float-end" data-bs-toggle="modal" data-bs-target="#editSkillsModal">
                    <span class="profile-edit-btn click-ripple">
                        <i class="bi bi-pencil-square"></i>
                    </span>
                </span>
            </div>
            <div class="card-body small">
                <span v-for="skill in userSkills" :key="skill.id" class="skills-tag">
                    {{ editingStore.getSkillName(skill.skill_id) }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import api from '@/stores/Helpers/axios'
import { useProfileStore } from '@/stores/profileStore';
import { useEditingProfileStore } from './editingProfileStore';

const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()

const userSkills: any = computed(() => profileStore.data?.skills ?? []);

onMounted(async () => {
    let { data } = await api.skills()
    if (data.status == 200)
        editingStore.skillsArray = data.body
})

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
