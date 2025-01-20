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

                        <div class="col-12">
                            <div class="mb-3">
                                Images:

                            </div>
                            <div v-for="(image, index) in portfolio.images" :key="index"
                                class="d-inline-block mx-2 mb-3 custom-hover-overlay image-container hover-tiltY">
                                <img class="image-span" :src="image.image" alt="">
                                <div class="overlay">
                                    <i @click="removeImageViaAPI(image.id)" class="bi bi-x text-danger trash-icon "></i>
                                </div>
                            </div>
                        </div>


                        <div class="form-label mt-5">
                            <span v-bind="getRootProps()">
                                <button class="btn btn-secondary btn-sm">
                                    Click here to add Image(s)
                                </button>
                                <input v-bind="getInputProps()" />
                            </span>
                        </div>
                        <div class="">
                            <div v-for="image in imagesArray" :key="image.id"
                                class="d-inline-block mx-2 mb-3 custom-hover-overlay image-container hover-tiltY">
                                <img class="image-span" :src="image.src" alt="">
                                <div class="overlay">
                                    <i @click="removeImage(image.id)" class="bi bi-x text-danger trash-icon "></i>
                                </div>
                            </div>

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

//@ts-ignore
import { useDropzone } from "vue3-dropzone";

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
    images: editingStore.portfolioToEdit?.images ?? [],
})

watch(() => editingStore.portfolioToEdit, () => {
    portfolio.title = editingStore.portfolioToEdit?.title ?? '';
    portfolio.description = editingStore.portfolioToEdit?.description ?? '';
    portfolio.goals = editingStore.portfolioToEdit?.goals ?? '';
    portfolio.achievements = editingStore.portfolioToEdit?.achievements ?? '';
    portfolio.project_url = editingStore.portfolioToEdit?.project_url ?? '';
    portfolio.images = editingStore.portfolioToEdit?.images ?? [];
})



function deletePortfolio() {
    useFxn.confirmDelete('Delete this Portfolio entirely?', 'Yes, Delete')
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

    if (!imagesArray.value.length && !portfolio.images?.length) {
        useFxn.toastShort(`Please include at least one image`)
        return;
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
    formData.append('title', portfolio.title)
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
            if (imagesArray.value.length) await addPortfolioImage()
            profileStore.getProfile()
            imagesArray.value.length = 0
        }
    } catch (error) {
        console.log(error);
        useFxn.toast('Something went Wrong', 'error')
        isLoading.value = false

    }
}

async function addPortfolioImage() {
    const formData = new FormData();
    formData.append(`portfolio_id`, editingStore.portfolioToEdit.id)

    imagesArray.value.forEach((item: { file: File }, index: any) => {
        formData.append(`images[${index}]`, item.file)
    });

    try {
        await api.userAddPortfolioImage(formData)
    } catch (error) { }
}



// image
const imageSrc = ref<any>(null)
const imagesArray = ref<{ file: File, id: number, src: string }[]>([])
const acceptedFormats = ['png', 'jpg', 'jpeg', 'svg']
const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    noDrag: true,
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

        imageSrc.value = acceptFiles[0]

        const reader = new FileReader();
        reader.onload = (e: any) => {
            imagesArray.value.push({ id: new Date().getTime(), file: imageSrc.value, src: e.target.result })
        };
        reader.readAsDataURL(imageSrc.value);


    },
});

function removeImage(id: number) {
    imagesArray.value = imagesArray.value.filter((x: { id: number }) => x.id !== id)
}


function removeImageViaAPI(id: any) {
    useFxn.confirmDelete('Remove this Portfolio Image?', 'Yes, Remove')
        .then(async (result) => {
            if (result.isConfirmed) {
                editingStore.portfolioToEdit.images = editingStore.portfolioToEdit.images.filter((x: { id: string }) => x.id !== id)
                portfolio.images = portfolio.images.filter((x: { id: string }) => x.id !== id)

                // isLoading.value = true
                try {
                    await api.userDeletePortfolioImage(id);
                    // useFxn.toast('Image Deleted', 'success');
                    profileStore.getProfile();
                    // btnX.value.click();
                    // isLoading.value = false
                } catch (error) {
                    // 
                }
            }
        })
}


const btnX = ref<any>(null)
onBeforeRouteLeave(() => {
    btnX.value.click();
})

</script>


<style lang="css" scoped>
.image-span {
    height: 100px;
    width: 100px;
    transition: 0.3s ease all;
    /* border-radius: 50%; */
    background-color: var(--theme-color-soft);
    border: 1px solid #e8e5e5;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}


.trash-icon {
    position: absolute;
    top: 0px;
    right: 5px;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    transition: color 0.3s;
    /* font-size: 13px; */
}

.image-container:hover .trash-icon {
    display: block;
}
</style>
