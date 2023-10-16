import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEditingProfileStore = defineStore('editingStore', () => {

    const educationToEdit = ref<any>({})
    const experienceToEdit = ref<any>({})

    function dateSubmitFormat(date: any) {
        let toReturn = null;
        if (date)
            toReturn = `${new Date(date).getFullYear()}/${new Date(date).getMonth() + 1}/${new Date(date).getDay()}`
        return toReturn;
    }



    return { educationToEdit, experienceToEdit, dateSubmitFormat }
})
