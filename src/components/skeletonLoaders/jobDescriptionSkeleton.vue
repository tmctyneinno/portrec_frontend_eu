<template>
    <div class=" section-panel-light py-3 py-md-4">
        <div class="container mb-5">
            <div class="row justify-content-center pt-5 g-3">
                <div class="col-12">
                    <SkeletonLoader style="border-radius: 5px;" height="120" />
                </div>
            </div>
        </div>
    </div>
    <JobDescriptionInfoSkeleton />
</template>

<script setup lang="ts">
import JobDescriptionInfoSkeleton from './jobDescriptionInfoSkeleton.vue';
</script>