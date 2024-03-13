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
                <label class="fw-bold small">Full name</label>
                <input :disabled="disableFields" v-model="store.applyData.fullname" type="text"
                    class="form-control rounded-0" placeholder="Enter your fullname">
            </div>
            <div class="col-12 col-lg-7">
                <label class="fw-bold small">Email address</label>
                <input :disabled="disableFields" v-model="store.applyData.email" type="text"
                    class="form-control rounded-0" placeholder="Enter your email address">
            </div>
            <div class="col-12 col-lg-5">
                <label class="fw-bold small">Phone number</label>
                <input :disabled="disableFields" v-model="store.applyData.phone" type="text"
                    class="form-control rounded-0" placeholder="Enter your phone number">
            </div>

        </template>

        <template #buttons>
            <button :disabled="!(store.applyData.fullname && store.applyData.email && store.applyData.phone)"
                @click="store.switchModal(+1)" type="button" class="btn btn-primary w-100 rounded-0">Next</button>
        </template>
    </modal_template>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
import modal_template from './modal_template.vue';

const store = useJobApplicationStore()
const disableFields = ref(false)
onMounted(() => {
    const profile = store.myProfile?.data;
    if (profile) {
        store.applyData.fullname = profile.name
        store.applyData.email = profile.email
        store.applyData.phone = profile.phone
        store.applyData.isAuthUser = true //indicate that user is authenticated
        disableFields.value = true
    }
})

</script>