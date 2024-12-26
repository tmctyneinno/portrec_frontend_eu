<template>
    <div class="modal fade" id="editSkillsModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Add/Edit Skills</h6>
                    <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body pt-0 ">
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="card shadow-sm border-0  rounded-0">
                                <div class="card-body xsmall ">
                                    <span v-for="skill in userSkills" :key="skill.id" class="skills-tag">
                                        {{ editingStore.getSkillName(skill.skill_id) }}
                                        <i @click="removeSkill(skill.skill_id)"
                                            class="bi bi-x-lg theme-color cursor-pointer ms-3"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <label class="small">Add New Skill: </label>
                            <v-select append-to-body :calculate-position="useFxn.vueSelectPositionCalc" multiple
                                v-model="selectedSkills" :clearable="false" :options="skillsDropdown"></v-select>
                        </div>
                        <div class="col-12">
                            <primaryButton :className="'w-100'" :disabled="isSaving" @click="addSkill">
                                Add
                            </primaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore';
import { useEditingProfileStore } from '../editingProfileStore';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';


const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()
const route = useRoute()
const userSkills = ref(profileStore.data?.skills ?? [])

watch(() => profileStore.data, () => {
    userSkills.value = profileStore.data?.skills ?? []

})

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


async function removeSkill(id: string | number) {
    const skills = profileStore.data.skills
    let filtered = skills.filter((x: { skill_id: string | number; }) => x.skill_id != id)
    userSkills.value = filtered

    try {
        await api.useSkillDelete(id)
        profileStore.getProfile()
    } catch (error) {
        // 
    }
}




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
            profileStore.getProfile()
        }
    } catch (error) {
        // 
    }
    finally {
        isSaving.value = false
    }

}



const btnX = ref<any>(null)
watch(() => route.path, () => {
    btnX.value.click();
})

</script>


<style lang="css" scoped>
.skills-tag {
    background-color: var(--bs-light);
    padding: 5px 8px;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 10px;
}
</style>
