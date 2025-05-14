<template>
  <vue3-progress-bar></vue3-progress-bar>
  <RouterView />
</template>

<script lang="ts" setup>
import { useTemplateStore } from './stores/templateStore';
const templateStore = useTemplateStore()

import { watch } from 'vue'

// @ts-ignore
import * as bootstrap from 'bootstrap'
import { useRoute } from 'vue-router'

const route = useRoute()


watch(() => [route.fullPath, templateStore.activateToolTip], () => {
  setTimeout(() => {
    // Destroy existing tooltips first
    const existingTooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    existingTooltips.forEach(el => {
      const tooltip = bootstrap.Tooltip.getInstance(el)
      if (tooltip) tooltip.dispose()
    })

    // Re-initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    tooltipTriggerList.forEach(el => {
      new bootstrap.Tooltip(el)
    })
  }, 0)
})

</script>

<style>
/* .custom-color {
  color: v-bind('templateStore.themeColors.color1');
} */
</style>