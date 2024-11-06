<script lang="ts" setup>
defineProps({
    btnClass: String,
    text: String,
    btnMainClass: {
        type: String,
        required: false,
        default: 'btn-primary'
    },

})
</script>

<template>
    <button class="btn" :class="btnMainClass + ' ' + btnClass" type="button" disabled>
        <span class="spinner-border spinner-border-s" role="status" aria-hidden="true"></span>
        {{ text ?? '' }}
    </button>
</template>
