

<template>
    <div class="modal fade" id="editSkillsModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Add/Edit Skills</h6>
                    <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body pt-0 ">
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="card shadow-sm border-0  rounded-0">
                                <div class="card-body xsmall ">
                                    <span v-for="skill in userSkills" :key="skill.id" class="skills-tag">{{ skill.name }}
                                        <i class="bi bi-x-lg theme-color cursor-pointer ms-3"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <label class="small">Add New Skill: </label>
                            <v-select v-model="selectedSkill" :clearable="false" :options="skillsDropdown"></v-select>
                        </div>
                        <div class="col-12">
                            <button :disabled="isSaving" @click="addSkill" type="button"
                                class="btn btn-primary w-100 rounded-0">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch, ref, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore';
import { useEditingProfileStore } from '../editingProfileStore';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';


const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()
const route = useRoute()

const userSkills: any = () => profileStore.data?.skills ?? [];
const selectedSkill = ref<any>('')
const isSaving = ref<boolean>(false)


const skillsDropdown = computed(() => {
    return editingStore.skillsArray.map((x: any) => ({ id: x.id, label: x.name }))
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
    try {
        let { data } = await api.userSkillAdd({ skill_id: selectedSkill.value.id })
        console.log(data);
        if (data.status === 201) {
            useFxn.toast('Updated successfully', 'success')
            btnX.value.click();
            profileStore.getUserProfile()
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
