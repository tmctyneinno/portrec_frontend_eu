<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

const buttonTypeMain = ref<any>('button')
const prop = defineProps({
    btnClass: String,
    disabled: {
        type: Boolean,
        required: false
    },
    btnMainClass: {
        type: String,
        required: false,
        default: 'btn-primary'
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
    <button class="btn" :class="btnMainClass + ' ' + btnClass" :type="buttonTypeMain" :disabled="disabled">
        <slot></slot>
    </button>
</template>
