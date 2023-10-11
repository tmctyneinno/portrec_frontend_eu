<template>
    <div style="min-height: 400px;" class=" bg-light d-flex justify-content-center align-items-center ">
        <div class="text-center">
            <i style="color: #ccc; font-size: 5rem;" class="bi bi-trash2"></i>
            <div class="text-center text-muted fs-4">{{ text ?? 'No data to show' }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps(['text'])
</script>