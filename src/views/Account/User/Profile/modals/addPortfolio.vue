<template>
    <div class="modal fade" id="addPortfolioModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Add Portfolio</h6>
                    <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
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
                    <primaryButton @click="clickSave" v-if="!isSaving">
                        Save
                    </primaryButton>
                    <primaryButtonLoading v-else />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { onBeforeRouteLeave } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';

const profileStore = useProfileStore()

const portfolio = reactive<any>({
    project_title: null,
    project_role: null,
    project_task: null,
    project_solution: null,
    project_url: null,
    images: []
})

const isSaving = ref(false)

function clickSave() {

    const requiredFields = ['project_title'];

    for (const field of requiredFields) {
        if (!portfolio[field]) {
            useFxn.toastShort('Please complete compulsory fields')
            return;
        }
    }

    isSaving.value = true

    const formData = new FormData();
    formData.append('user_id', profileStore.data.id)
    formData.append('project_title', portfolio.project_title)
    formData.append('project_role', portfolio.project_role ?? '')
    formData.append('project_task', portfolio.project_task ?? '')
    formData.append('project_solution', portfolio.project_solution ?? '')
    formData.append('project_url', portfolio.project_url ?? '')

    save(formData)
}

async function save(formData: any) {
    try {
        let { data } = await api.userAddPortfolio(formData)

        if (data.status === 200) {
            useFxn.toast('Saved successfully', 'success')
            btnX.value.click();
            portfolio.project_title = portfolio.project_role =
                portfolio.project_task = portfolio.project_url
                = portfolio.project_solution = null
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

onBeforeRouteLeave(() => {
    btnX.value.click();
})


</script>

<style scoped>
.btn {
    width: 250px;
}
</style>