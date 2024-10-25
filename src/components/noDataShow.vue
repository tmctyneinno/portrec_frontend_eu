<template>
    <div class=" d-flex justify-content-center align-items-center ">
        <div class="text-center">
            <i style="color: #cccccc67; font-size: 4.5rem;" :class="'bi ' + icon"></i>
            <div class="text-center text-muted">{{ text ?? 'No data to show' }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps({
    text: {
        required: true
    },
    icon: {
        required: false,
        default: 'bi-trash2'
    }
})
</script>