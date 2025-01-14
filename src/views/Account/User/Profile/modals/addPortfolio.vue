<template>
    <div class="modal fade" id="addPortfolioModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header border-0 bg-light">
                    <h6 class="modal-title fw-bold">Add Portfolio</h6>
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
                            <textarea v-model="portfolio.description" class="form-control " rows="2"></textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Achivements </label>
                            <textarea v-model="portfolio.achievements" class="form-control " rows="2"></textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Goals </label>
                            <textarea v-model="portfolio.goals" class="form-control " rows="2"></textarea>
                        </div>


                        <div class="form-label">Images:
                            <span class="ms-3" v-bind="getRootProps()">
                                <button class="btn btn-secondary btn-sm">
                                    Click here to add Image(s)
                                </button>
                                <input v-bind="getInputProps()" />
                            </span>
                        </div>
                        <div class="">
                            <div v-for="image in imagesArray" class="d-inline-block mx-2 image-container hover-tiltY">
                                <img class="image-span" :src="image.src" alt="">
                                <i @click="removeImage(image.id)" class="bi bi-x text-danger trash-icon "></i>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <primaryButton @click="clickSave" v-if="!isSaving">
                        Save Porfolio
                    </primaryButton>
                    <primaryButtonLoading btnText="Saving..." v-else />
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
import type { PortfolioInterface } from '@/stores/interfaces';

const profileStore = useProfileStore()
const isSaving = ref(false)

const portfolio = reactive<PortfolioInterface>({
    title: '',
    goals: '',
    description: '',
    achievements: '',
    project_url: '',
    images: []
})


function clickSave() {

    const requiredFields: (keyof PortfolioInterface)[] = ['title', 'description'];

    for (const field of requiredFields) {
        if (!portfolio[field]) {
            useFxn.toastShort(`Please complete compulsory fields`)
            return;
        }
    }

    if (!imagesArray.value.length) {
        useFxn.toastShort(`Please include at least one image`)
        return;
    }

    isSaving.value = true

    const formData = new FormData();
    formData.append('user_id', profileStore.data.id)
    formData.append('title', portfolio.title)
    formData.append('goals', portfolio.goals ?? '')
    formData.append('description', portfolio.description ?? '')
    formData.append('achievements', portfolio.achievements ?? '')

    imagesArray.value.forEach((item: { file: File }, index: any) => {
        formData.append(`images[${index}]`, item.file)
    });

    save(formData)
}

async function save(formData: any) {
    try {
        let { data } = await api.userAddPortfolio(formData)

        if (data.status === 200) {
            useFxn.toast('Saved successfully', 'success')
            btnX.value.click();
            portfolio.title = portfolio.goals =
                portfolio.achievements = portfolio.project_url
                = portfolio.description = ''
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



const btnX = ref<any>(null)
onBeforeRouteLeave(() => {
    btnX.value.click();
})


</script>

<style scoped>
/* .image-adder {
    border: 2px dashed var(--theme-color);
    background-color: var(--bs-light);
    transition: 0.3s ease all;
} */

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


.image-container {
    width: 100px;
    height: 100px;
    overflow: hidden;
    position: relative;
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

.trash-icon:hover {
    color: #ff0000;
}

.image-container:hover .trash-icon {
    display: block;
}
</style>