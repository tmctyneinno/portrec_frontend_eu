

<template>
    <div class="col-md-3">
        <div class="image-circle"></div>
    </div>
    <div class="col-md-8">
        <div @click="dropzoneFile.click" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive"
            @dragover.prevent @drop.prevent="toggleActive" :class="{ 'active-dropzone': active }" class="dropzone">
            <div class="text-center small">
                <div><i class="bi bi-image them-color"></i></div>
                <div><span class="theme-color">Click to replace</span> or drag and drop</div>
                <div class="fw-light">SVG, PNG, JPG or GIF (max. 400 x 400px)</div>
            </div>
            <input @change="fileUploadFn" ref="dropzoneFile" accept="image/jpg, image/png" type="file" id="dropzoneFile"
                class="dropzoneFile" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useProfileStore } from '@/stores/profileStore';
import api from '@/stores/Helpers/axios'
import useFxn from "@/stores/Helpers/useFunctions";
import { fileUploader } from '@/stores/Helpers/fileUploader';

const { fileUploadFn, fileURL, mainFile } = fileUploader()

const profileStore = useProfileStore()





async function submitProfileForm() {

    // try {
    //     let { data } = await api.userUpdateProfile(obj)
    //     if (data.status === 201) {
    //         useFxn.toast('Updated successfully', 'success')
    //         getUserProfile()
    //     }
    // } catch (error) {
    //     // 
    // }
    // finally {
    //     details.isLoading = false
    // }
}

async function getUserProfile() {
    let { data } = await api.userProfile()
    if (data.status === 201) {
        profileStore.data = data.body
    }
}

const active = ref(false);
const dropzoneFile = ref<any>(null)

const toggleActive = () => {
    active.value = !active.value;
};

</script>

<style lang="css" scoped>
.image-circle {
    background-color: #d2edd26d;
    height: 100px;
    width: 100px;
    border-radius: 50%;
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

.dropzone input {
    display: none;
}

.active-dropzone {
    color: #fff;
    border-color: #fff;
    background-color: #41b883;
}
</style>

