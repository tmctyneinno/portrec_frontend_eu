<template>
    <modal_template>
        <template #title>
            <div class="fw-bold text-muted fs-5">Submit your application</div>
            <div class="small text-muted lh-1 mb-2">
                The following will only be shared with
                {{ store.currentJob.company ?
                    store.currentJob.company.name : `this Company` }}
            </div>
        </template>

        <template #form>
            <div class="col-12">
                <label class="fw-bold small">Full name </label>
                <input :disabled="disableFields" v-model="store.applyData.fullname" type="text" class="form-control "
                    placeholder="Enter your fullname">
            </div>
            <div class="col-12 col-lg-7">
                <label class="fw-bold small">Email address

                </label>
                <input :disabled="disableFields" v-model="store.applyData.email" type="email" class="form-control "
                    placeholder="Enter your email address">
                <span v-if="store.applyData.email && !useFunctions.isEmail(store.applyData.email)"
                    class="text-danger xsmall ms-2">
                    Enter valid email address
                </span>
            </div>
            <div class="col-12 col-lg-5">
                <label class="fw-bold small">Phone number</label>
                <input :disabled="disableFields" v-model="store.applyData.phone" type="text" class="form-control "
                    placeholder="Enter your phone number">
            </div>

        </template>

        <template #buttons>
            <primaryButton :className="'w-100'" :disabled="!formIsValid" @click="store.switchModal(+1)">
                Next
            </primaryButton>
        </template>
    </modal_template>

</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
import modal_template from './modal_template.vue';
import { useProfileStore } from '@/stores/profileStore';
import useFunctions from '@/stores/Helpers/useFunctions';

const store = useJobApplicationStore()
const disableFields = ref(false)

const profileStore = useProfileStore()

onMounted(() => {
    // const profile = store.myProfile?.data;
    const isLoggedIn = profileStore.isLoggedIn
    const userType = profileStore.getUserType
    const profile = profileStore.data
    if (isLoggedIn && userType == 'user') {
        store.applyData.fullname = profile.name
        store.applyData.email = profile.email
        store.applyData.phone = profile.phone
        store.applyData.isAuthUser = true //indicate that user is authenticated
        disableFields.value = true
    }
})

const formIsValid = computed(() => {
    return store.applyData.fullname && useFunctions.isEmail(store.applyData.email) && store.applyData.phone
})

</script>