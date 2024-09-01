<script lang="ts" setup>
defineProps({
    btnClass: String,
    text: String,

})
</script>

<template>
    <button class="btn btn-primary rounded-0" :class="btnClass" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        {{ text ?? 'Loading' }}
    </button>
</template>
