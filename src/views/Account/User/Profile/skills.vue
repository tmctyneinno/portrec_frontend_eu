

<template>
    <div class="col-12">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                Skills
                <!-- <span class="float-end" data-bs-toggle="modal" data-bs-target="#editSkillsModal">
                    <span class="profile-edit-btn click-ripple">
                        <i class="bi bi-pencil-square"></i>
                    </span>
                </span> -->
            </div>
            <div class="card-body small">
                <div class="row g-3">
                    <div class="col-12">
                        <div class="card border-0">
                            <div class="card-body small p-0">
                                <span v-for="skill in userSkills" :key="skill.id" class="skills-tag">
                                    {{ editingStore.getSkillName(skill.skill_id) }}
                                    <i @click="removeSkill(skill.skill_id)"
                                        class="bi bi-x-lg theme-color cursor-pointer ms-3"></i>
                                </span>
                                <span v-show="!userSkills.length" class="text-muted2">No skills added</span>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <div class="row g-3">
                                <label>New Skill:</label>
                                <div class="col-12 col-lg-8">
                                    <!-- <label class="small">New Skills: </label> -->
                                    <v-select placeholder="" class="skills-select" multiple v-model="selectedSkills"
                                        :clearable="false" :options="skillsDropdown"></v-select>
                                </div>
                                <div class="col-12 col-lg-4">
                                    <button v-if="!isSaving" @click="addSkill" type="button"
                                        class="btn btn-primary  rounded-0 w-100">Add</button>
                                    <button v-else disabled class="btn btn-primary  rounded-0 w-100">Adding..</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect, watch } from 'vue';
import api from '@/stores/Helpers/axios'
import { useProfileStore } from '@/stores/profileStore';
import { useEditingProfileStore } from './editingProfileStore';
import useFxn from '@/stores/Helpers/useFunctions';


const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()

const userSkills = ref(profileStore.data?.skills ?? [])

watch(() => profileStore.data, () => {
    userSkills.value = profileStore.data?.skills ?? []

})

onMounted(async () => {
    try {
        let { data } = await api.skills()
        if (data.status == 200)
            editingStore.skillsArray = data.body
    } catch (error) {
        console.log(error);
    }
})


// adding and removing new skills \\\\\\\\\\\\\\\\\\\\\\\\\\

const selectedSkills = ref<any[]>([])
const isSaving = ref<boolean>(false)
const skillsDropdown = ref<any[]>([])
watchEffect(() => {
    const filteredArray = [];
    let skillsArray = editingStore.skillsArray.map((x: any) => ({ id: x.id, label: x.name }))

    for (const obj of skillsArray) {
        if (!userSkills.value.find((x: { skill_id: any; }) => x.skill_id == obj.id)) {
            filteredArray.push(obj);
        }
    }

    skillsDropdown.value = filteredArray
})

function addSkill() {
    if (!useFxn.isOnline()) {
        useFxn.toastShort('You are offline')
        return
    }
    isSaving.value = true
    saveSkill()
}

async function saveSkill() {
    const skillsIds = selectedSkills.value.map((x: { id: any; }) => x.id)
    try {
        let { data } = await api.userSkillAdd({ skills: skillsIds })
        console.log(data);
        if (data.status === 201) {
            useFxn.toast('Updated successfully', 'success')
            // btnX.value.click();
            selectedSkills.value = []
            profileStore.getUserProfile()
        }
    } catch (error) {
        // 
    }
    finally {
        isSaving.value = false
    }

}

async function removeSkill(id: string | number) {
    const skills = profileStore.data.skills
    let filtered = skills.filter((x: { skill_id: string | number; }) => x.skill_id != id)
    userSkills.value = filtered

    try {
        await api.useSkillDelete(id)
        profileStore.getUserProfile()
    } catch (error) {
        // 
    }
}

</script>

<style lang="css" scoped>
.skills-tag {
    background-color: var(--bs-light);
    color: var(--theme-color);
    padding: 5px 8px;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
}
</style>
