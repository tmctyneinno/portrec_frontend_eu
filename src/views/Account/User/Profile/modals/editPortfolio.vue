<template>
    <div class="modal fade" id="editPortfolioModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Edit Portfolio</h6>

                    <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-md-5">
                            <label class="form-label">Title * </label>
                            <input v-model="portfolio.title" type="text" class="form-control ">
                        </div>
                        <div class="col-md-7">
                            <label class="form-label">URL </label>
                            <input v-model="portfolio.project_url" type="text" class="form-control ">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Description * </label>
                            <textarea v-model="portfolio.description" class="form-control " rows="4"></textarea>
                        </div>
                        <div class="col-lg-6" style="margin-bottom: 100px; height:180px">
                            <label class="form-label">Achivements </label>
                            <QuillEditor v-model:content="portfolio.achievements" contentType="html"
                                toolbar="minimal" />
                        </div>

                        <div class="col-lg-6" style="margin-bottom: 100px; height:180px">
                            <label class="form-label">Goals </label>
                            <QuillEditor v-model:content="portfolio.goals" contentType="html" toolbar="minimal" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <!-- <button v-show="!isLoading" ref="btnX" data-bs-dismiss="modal" class="btn btn-light ">
                        Cancel
                    </button> -->
                    <!-- <button :disabled="isLoading"  type="button"
                        class="btn btn-danger rounded-0">
                    </button> -->

                    <primaryButton @click="deletePortfolio" :btnMainClass="'btn-danger'">
                        Delete
                    </primaryButton>

                    <primaryButton @click="updateClick" v-if="!isLoading">
                        Update Changes
                    </primaryButton>
                    <primaryButtonLoading v-else btnText="Updating ..." />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch, ref, reactive, } from 'vue';
import { onBeforeRouteLeave, } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore';
import { useEditingProfileStore } from '../editingProfileStore'
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';
import type { PortfolioInterface } from '@/stores/interfaces';

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()
const isLoading = ref(false)

const portfolio = reactive<any>({
    title: editingStore.portfolioToEdit?.title ?? '',
    description: editingStore.portfolioToEdit?.description ?? '',
    goals: editingStore.portfolioToEdit?.goals ?? '',
    achievements: editingStore.portfolioToEdit?.achievements ?? '',
    project_url: editingStore.portfolioToEdit?.project_url ?? '',
})

watch(() => editingStore.portfolioToEdit, () => {
    portfolio.title = editingStore.portfolioToEdit?.title ?? '';
    portfolio.description = editingStore.portfolioToEdit?.description ?? '';
    portfolio.goals = editingStore.portfolioToEdit?.goals ?? '';
    portfolio.achievements = editingStore.portfolioToEdit?.achievements ?? '';
    portfolio.project_url = editingStore.portfolioToEdit?.project_url ?? '';
})



function deletePortfolio() {
    useFxn.confirmDelete('Remove this Portfolio?', 'Yes, Remove')
        .then(async (result) => {
            if (result.isConfirmed) {
                isLoading.value = true
                try {
                    await api.userDeletePortfolio(editingStore.portfolioToEdit.id);
                    useFxn.toast('Portfolio Deleted', 'success');
                    profileStore.getProfile();
                    btnX.value.click();
                    isLoading.value = false
                } catch (error) {
                    // 
                }
            }
        })
}



function updateClick() {

    const requiredFields: (keyof PortfolioInterface)[] = ['title', 'description'];

    for (const field of requiredFields) {
        if (!portfolio[field]) {
            useFxn.toastShort(`Please complete compulsory fields`)
            return;
        }
    }

    useFxn.confirm('Confirm update?', 'Update')
        .then((result) => {
            if (result.isConfirmed) {
                isLoading.value = true
                save()
            }
        })
}

async function save() {
    let id = editingStore.portfolioToEdit.id
    const formData = new FormData();
    formData.append('user_id', profileStore.data.id)
    formData.append('project_title', portfolio.title)
    formData.append('project_url', portfolio.project_url)
    formData.append('goals', portfolio.goals ?? '')
    formData.append('description', portfolio.description ?? '')
    formData.append('achievements', portfolio.achievements ?? '')

    try {
        let resp = await api.userUpdatePortfolio(id, formData)

        if (resp.status) {
            useFxn.toast('Updated successfully', 'success')
            btnX.value.click();
            isLoading.value = false
            profileStore.getProfile()
        }
    } catch (error) {
        console.log(error);
        useFxn.toast('Something went Wrong', 'error')
        isLoading.value = false

    }
}


const btnX = ref<any>(null)
onBeforeRouteLeave(() => {
    btnX.value.click();
})

</script>


<style lang="css" scoped></style>
