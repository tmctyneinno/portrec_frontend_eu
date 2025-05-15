<template>
  <vue3-progress-bar></vue3-progress-bar>
  <RouterView />
</template>

<script lang="ts" setup>
import { useTemplateStore } from './stores/templateStore';
const templateStore = useTemplateStore()

import { watch, nextTick } from 'vue'

// @ts-ignore
import * as bootstrap from 'bootstrap'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(() => [route.fullPath, templateStore.activateToolTip], async () => {
  await nextTick();
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    const instance = bootstrap.Tooltip.getInstance(el);
    if (instance) instance.dispose();
    bootstrap.Tooltip.getOrCreateInstance(el);
  });
});


</script>

<style>
/* .custom-color {
  color: v-bind('templateStore.themeColors.color1');
} */
</style>