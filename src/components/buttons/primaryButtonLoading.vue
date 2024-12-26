<script lang="ts" setup>
defineProps({
    btnText: String,
    btnMainClass: { type: String, default: 'btn-primary' },
    className: { type: String, default: '' }
});
</script>

<template>
    <button class="btn" :class="`${btnMainClass} ${className}`" type="button" disabled>
        <span class="spinner-border" :class="{ 'spinner-border-sm': !className.includes('btn-lg') }" role="status"
            aria-hidden="true"></span>
        {{ btnText || '' }}
    </button>
</template>
