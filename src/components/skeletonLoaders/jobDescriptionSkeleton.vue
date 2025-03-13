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
    <div class="container bg-whit px-lg-5">
        <div class="row py-5 gy-3 ">
            <div class="col-md-8">
                <SkeletonLoader v-for="i in 5" :key="i" class="mb-5" style="border-radius: 5px;" height="150" />
            </div>
            <div class="col-md-4">
                <SkeletonLoader v-for="i in 3" :key="i" class="mb-3" style="border-radius: 5px;" height="200" />
            </div>
        </div>

    </div>
</template>