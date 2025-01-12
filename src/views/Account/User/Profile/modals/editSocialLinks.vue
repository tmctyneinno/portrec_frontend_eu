<template>
    <div class="modal fade" id="editSocialLinksModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h6 class="modal-title fw-bold">Social Links</h6>
                    <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-12 col-md-6">
                            <label class="form-label">Instagram: </label>
                            <input v-model="details.instagram" type="text" class="form-control ">
                        </div>
                        <div class="col-12 col-md-6">
                            <label class="form-label">Twitter: </label>
                            <input v-model="details.twitter" type="text" class="form-control ">
                        </div>
                        <div class="col-12 col-md-6">
                            <label class="form-label">Facebook: </label>
                            <input v-model="details.facebook" type="text" class="form-control ">
                        </div>
                        <div class="col-12 col-md-6">
                            <label class="form-label">LinkedIn: </label>
                            <input v-model="details.linkedin" type="text" class="form-control ">
                        </div>
                        <div class="col-12 col-md-6">
                            <label class="form-label">Website: </label>
                            <input v-model="details.website" type="text" class="form-control ">
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0 pb-3">
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
import { watch, ref, reactive } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';

const profileStore = useProfileStore()

const details = reactive({
    facebook: profileStore.profile ? profileStore.profile?.facebook : null,
    instagram: profileStore.profile ? profileStore.profile?.instagram : null,
    twitter: profileStore.profile ? profileStore.profile?.twitter : null,
    linkedin: profileStore.profile ? profileStore.profile?.linkedin : null,
    website: profileStore.profile ? profileStore.profile?.website : null,
})

watch(() => profileStore.profile, () => {
    details.facebook = profileStore.profile ? profileStore.profile?.facebook : null;
    details.instagram = profileStore.profile ? profileStore.profile?.instagram : null;
    details.twitter = profileStore.profile ? profileStore.profile?.twitter : null;
    details.linkedin = profileStore.profile ? profileStore.profile?.linkedin : null;
    details.website = profileStore.profile ? profileStore.profile?.website : null;

})



const isSaving = ref(false)

function clickSave() {
    // if (!useFxn.isOnline()) {
    //     useFxn.toastShort('You are offline')
    //     return
    // }
    isSaving.value = true
    save()
}

async function save() {
    try {
        let { data } = await api.userUpdateProfile(details)
        if (data.status === 201) {
            useFxn.toast('Updated successfully', 'success')
            btnX.value.click();
            profileStore.getProfile()
            isSaving.value = false
        }
    } catch (error) {
        isSaving.value = false
        useFxn.toast('Something went wrong', 'error')
    }
}







const btnX = ref<any>(null)
onBeforeRouteLeave(() => {
    btnX.value.click();
})

</script>


<style lang="css" scoped>
.btn {
    width: 250px;
}
</style>
