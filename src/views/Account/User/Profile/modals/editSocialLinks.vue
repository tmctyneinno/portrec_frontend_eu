

<template>
    <div class="modal fade" id="editSocialLinksModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Social Links</h6>
                    <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-12">
                            <label class="small">Instagram: </label>
                            <input v-model="details.instagram" type="text" class="form-control rounded-0">
                        </div>
                        <div class="col-12">
                            <label class="small">Twitter: </label>
                            <input v-model="details.twitter" type="text" class="form-control rounded-0">
                        </div>
                        <div class="col-12">
                            <label class="small">Facebook: </label>
                            <input v-model="details.facebook" type="text" class="form-control rounded-0">
                        </div>
                        <div class="col-12">
                            <label class="small">LinkedIn: </label>
                            <input v-model="details.linkedin" type="text" class="form-control rounded-0">
                        </div>
                        <div class="col-12">
                            <label class="small">Website: </label>
                            <input v-model="details.website" type="text" class="form-control rounded-0">
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button @click="clickSave" v-if="!isSaving" type="button"
                        class="btn btn-primary w-100 rounded-0">Save</button>
                    <button v-else class="btn btn-primary rounded-0 w-100" disabled>
                        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { watch, ref, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';

const profileStore = useProfileStore()
const route = useRoute()

const details = reactive({
    facebook: profileStore.data ? profileStore.data.facebook : '',
    instagram: profileStore.data ? profileStore.data.instagram : '',
    twitter: profileStore.data ? profileStore.data.twitter : '',
    linkedin: profileStore.data ? profileStore.data.linkedin : '',
    website: profileStore.data ? profileStore.data.website : '',
})

watch(() => profileStore.data, () => {
    details.facebook = profileStore.data ? profileStore.data.facebook : '';
    details.instagram = profileStore.data ? profileStore.data.instagram : '';
    details.twitter = profileStore.data ? profileStore.data.twitter : '';
    details.linkedin = profileStore.data ? profileStore.data.linkedin : '';
    details.website = profileStore.data ? profileStore.data.website : '';

})



const isSaving = ref(false)

function clickSave() {
    isSaving.value = true
    save()
}

async function save() {
    try {
        let { data } = await api.userUpdateProfile(details)
        if (data.status === 201) {
            useFxn.toast('Updated successfully', 'success')
            btnX.value.click();
            profileStore.getUserProfile()
        }
    } catch (error) {
        // 
    }
    finally {
        isSaving.value = false
    }
}







const btnX = ref<any>(null)
watch(() => route.path, () => {
    btnX.value.click();
})

</script>


<style lang="css" scoped></style>
