<script lang="ts" setup>
const props = defineProps({
    text: String,
    btnMainClass: { type: String, default: 'btn-primary' },
    btnClass: { type: String, default: '' }
});
</script>

<template>
    <button class="btn" :class="`${btnMainClass} ${btnClass}`" type="button" disabled>
        <span class="spinner-border" :class="{ 'spinner-border-sm': !btnClass.includes('btn-lg') }" role="status"
            aria-hidden="true"></span>
        {{ text || '' }}
    </button>
</template>
