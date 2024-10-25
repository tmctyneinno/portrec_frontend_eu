<template>
    <div class="col-md-3">
        <div class="image-circle" :style="{ 'background-image': `url(${profileStore.avatar})` }"></div>
    </div>
    <div class="col-md-8">
        <div class="dropzone" v-bind="getRootProps()">
            <div class="text-center small">
                <div v-if="!imgSaving"><i class="bi bi-image them-color"></i></div>
                <span v-else class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <div><span class="theme-color">Click to replace</span> or drag and drop</div>
                <div class="fw-light">SVG, PNG, JPG or GIF (max: 2MB)</div>
            </div>
            <input v-bind="getInputProps()" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useProfileStore } from '@/stores/profileStore';
import api from '@/stores/Helpers/axios'
import useFxn from "@/stores/Helpers/useFunctions";
//@ts-ignore
import { useDropzone } from "vue3-dropzone";

const profileStore = useProfileStore()

const acceptedFormats = ['png', 'jpg', 'jpeg', 'svg']
const img = ref<any>(null)
const imgSaving = ref(false)

const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptFiles: any[], rejectReasons: any) => {

        if (!useFxn.isExtension(acceptFiles[0].name, acceptedFormats)) {
            useFxn.toast('Please upload an image', 'warning');
            return;
        }
        const _2MBinBytes = 2097152;

        if (acceptFiles[0].size > _2MBinBytes) {
            useFxn.toast('File larger than 2MB', 'warning');
            return;
        }

        let formData = new FormData();
        img.value = acceptFiles[0]
        formData.append("img", img.value);
        submitImage(formData)
    },
});

async function submitImage(formData: FormData) {
    try {
        imgSaving.value = true
        const pic_id = profileStore.data?.profile_pic?.id ?? null;

        let { data } = await api.userProfilePicture(formData, pic_id)
        console.log(data);


        if (data.status === 200) {
            profileStore.avatar = data.body.url
            useFxn.toast('Updated successfully', 'success')
        }
    } catch (error) {
        // 
    }
    finally {
        imgSaving.value = false
    }
}

</script>

<style lang="css" scoped>
.image-circle {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background-color: var(--theme-color-soft);
    border: 1px solid #e8e5e5;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
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

/* .dropzone input {
    display: none;
} */

.active-dropzone {
    color: #fff;
    border-color: #fff;
    background-color: #41b883;
}
</style>
