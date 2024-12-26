<script lang="ts" setup>
defineProps({
    className: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    btnType: {
        type: String as () => 'button' | 'submit' | 'reset' | undefined,
        default: 'button'
    }
});
</script>

<template>
    <button class="btn btn-primary-outline" :class="className" :type="btnType" :disabled="disabled">
        <slot></slot>
    </button>
</template>
