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

                        <div class="col">
                            <div class="dropzone" v-bind="getRootProps()">
                                <div class="text-center small">
                                    <!-- <div v-if="!imgSaving"><i class="bi bi-image them-color"></i></div>
                                    <span v-else class="spinner-border spinner-border-sm" aria-hidden="true"></span> -->
                                    <div><span class="theme-color">Click to replace</span> or drag and drop</div>
                                    <div class="fw-light">SVG, PNG, JPG or GIF (max: 2MB)</div>
                                </div>
                                <input v-bind="getInputProps()" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="col-md-3">
                                <img class="image-circle" :src="previewImage" alt="">
                            </div>
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
//@ts-ignore
import { useDropzone } from "vue3-dropzone";

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





// image
const imageSrc = ref<any>(null)
const previewImage = ref<any>(null)
const acceptedFormats = ['png', 'jpg', 'jpeg', 'svg']
const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptFiles: any[], rejectReasons: any) => {
        if (!useFxn.isExtension(acceptFiles[0].name, acceptedFormats)) {
            useFxn.toast('Please upload an image', 'warning');
            return;
        }
        const _2MBinBytes = 2097152;

        if (acceptFiles[0].size > _2MBinBytes) {
            useFxn.toast('File must not be larger than 2MB', 'warning');
            return;
        }

        let formData = new FormData();
        imageSrc.value = acceptFiles[0]
        console.log(imageSrc.value);

        const reader = new FileReader();
        reader.onload = (e: any) => {
            previewImage.value = e.target.result; // Set the image URL for preview
        };
        reader.readAsDataURL(imageSrc.value); // Read the file as a Data URL

        // formData.append("img", img.value);
        // submitImage(formData)
    },
});



const btnX = ref<any>(null)
onBeforeRouteLeave(() => {
    btnX.value.click();
})


</script>

<style scoped>
.btn {
    width: 250px;
}


.dropzone {
    width: 300px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 5px;
    border: 2px dashed var(--theme-color);
    background-color: var(--bs-light);
    transition: 0.3s ease all;
    color: rgb(170, 164, 164);
    cursor: pointer;
    border-radius: 10px;
}

.image-circle {
    height: 100px;
    width: 100px;
    /* border-radius: 50%; */
    background-color: var(--theme-color-soft);
    border: 1px solid #e8e5e5;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}
</style>