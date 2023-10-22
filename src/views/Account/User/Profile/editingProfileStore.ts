import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useEditingProfileStore = defineStore('editingStore', () => {

    const educationToEdit = ref<any>({})
    const experienceToEdit = ref<any>({})
    const skillsArray = ref([])
    const aboutMe = reactive({
        text: '',
        isEdit: 1
    })


    function dateSubmitFormat(date: Date) {
        let toReturn = null;
        if (date)
            toReturn = `${new Date(date).getFullYear()}/${new Date(date).getMonth() + 1}/${new Date(date).getDate()}`
        return toReturn;
    }

    function getSkillName(id: string | number) {
        const skill: any = skillsArray.value.find((sk: any) => sk.id == id)
        return skill?.name ?? ''
    }

    return { educationToEdit, experienceToEdit, aboutMe, skillsArray, dateSubmitFormat, getSkillName }
})
