<template>
    <div class="modal fade" id="editPortfolioModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Edit Portfolio</h6>
                    <button :disabled="isLoading" @click="deletePortfolio" type="button"
                        class="btn bg-danger-subtle text-danger btn-sm  m-0 ms-3 py-1 px-3">
                        <i class="bi bi-trash3"></i>
                    </button>
                    <!-- <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Title * </label>
                            <input v-model="portfolio.project_title" type="text" class="form-control ">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Role </label>
                            <input v-model="portfolio.project_role" type="text" class="form-control ">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Task </label>
                            <input v-model="portfolio.project_task" type="text" class="form-control ">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">URL </label>
                            <input v-model="portfolio.project_url" type="text" class="form-control ">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Solution </label>
                            <textarea v-model="portfolio.project_solution" class="form-control " rows="2"></textarea>
                        </div>



                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button v-show="!isLoading" ref="btnX" data-bs-dismiss="modal" class="btn btn-light ">
                        Cancel
                    </button>
                    <!-- <button :disabled="isLoading" @click="deletePortfolio" type="button"
                        class="btn btn-danger rounded-0">Delete
                        </button> -->

                    <primaryButton @click="updateClick" v-if="!isLoading">
                        Save Changes
                    </primaryButton>
                    <primaryButtonLoading v-else />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch, ref, reactive, computed } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore';
import { useEditingProfileStore } from '../editingProfileStore'
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';

const profileStore = useProfileStore()
const editingStore = useEditingProfileStore()
const isLoading = ref(false)

const portfolio = reactive<any>({
    project_title: editingStore.portfolioToEdit?.project_title ?? '',
    project_role: editingStore.portfolioToEdit?.project_role ?? '',
    project_task: editingStore.portfolioToEdit?.project_task ?? '',
    project_solution: editingStore.portfolioToEdit?.project_solution ?? '',
    project_url: editingStore.portfolioToEdit?.project_url ?? '',
})

watch(() => editingStore.portfolioToEdit, () => {
    portfolio.project_title = editingStore.portfolioToEdit?.project_title ?? '';
    portfolio.project_role = editingStore.portfolioToEdit?.project_role ?? '';
    portfolio.project_task = editingStore.portfolioToEdit?.project_task ?? '';
    portfolio.project_solution = editingStore.portfolioToEdit?.project_solution ?? '';
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

    const requiredFields = ['project_title'];

    for (const field of requiredFields) {
        if (!portfolio[field]) {
            useFxn.toastShort('Please complete compulsory fields')
            return;
        }
    }
    useFxn.confirm('Confirm update?', 'Update Porfolio')
        .then((result) => {
            if (result.isConfirmed) {
                isLoading.value = true
                save()
            }
        })
}

async function save() {
    let id = editingStore.portfolioToEdit.id
    let obj = {
        project_title: portfolio.project_title,
        project_role: portfolio.project_role,
        project_task: portfolio.project_task,
        project_solution: portfolio.project_solution,
        project_url: portfolio.project_url,
    }
    try {
        let resp = await api.userUpdatePortfolio(id, obj)

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


<style lang="css" scoped>
.btn-primary {
    width: 250px;
}
</style>
