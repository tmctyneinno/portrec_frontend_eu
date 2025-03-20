import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAutomationStore = defineStore('automation', () => {

    interface ModalsInterface {
        messageNew: boolean;
        messageShortlisted: boolean;
        messageUndecided: boolean;
        messageRejected: boolean;
    }


    const modals = reactive<ModalsInterface>({
        messageNew: false,
        messageShortlisted: false,
        messageUndecided: false,
        messageRejected: false,
    })


    return {
        setupModals: modals
    }
})