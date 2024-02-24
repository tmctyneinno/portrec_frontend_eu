import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('commonStore', () => {

    const detailsModal = ref<boolean>(false)
    const selectedCompany = ref<any>(null)

    const pageToShow = ref<'all' | 'details'>('all')

    const toggleDetailsModal = () => detailsModal.value = !detailsModal.value


    return { detailsModal, toggleDetailsModal, selectedCompany, pageToShow }
})
