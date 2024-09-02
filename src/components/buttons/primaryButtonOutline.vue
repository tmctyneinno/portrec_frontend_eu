<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

const buttonTypeMain = ref<any>('button')
const prop = defineProps({
    btnClass: String,
    disabled: {
        type: Boolean,
        required: false
    },
    btnType: {
        type: String,
        required: false,
    }
})

watchEffect(() => {
    buttonTypeMain.value = prop.btnType ?? buttonTypeMain.value
})
</script>

<template>
    <button class="btn btn-primary-outline rounded-0" :class="btnClass" :type="buttonTypeMain" :disabled="disabled">
        <slot></slot>
    </button>
</template>
