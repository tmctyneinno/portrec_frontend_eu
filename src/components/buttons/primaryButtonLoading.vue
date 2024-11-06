<script lang="ts" setup>
defineProps({
    text: String,
    btnMainClass: {
        type: String,
        required: false,
        default: 'btn-primary'
    },

    btnClass: {
        type: String,
        required: false,
        default: ''
    },

})
</script>

<template>
    <button class="btn" :class="btnMainClass + ' ' + btnClass" type="button" disabled>
        <span class="spinner-border " :class="{ 'spinner-border-sm': !btnClass.includes('btn-lg') }" role="status"
            aria-hidden="true"></span>
        {{ text ?? '' }}
    </button>
</template>
