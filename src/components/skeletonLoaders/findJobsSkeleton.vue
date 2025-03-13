<template>
    <div class="container px-lg-5">
        <div class="row py-5 gy-3 ">
            <div class="col-md-3">
                <SkeletonLoader v-for="i in 30" :key="i" class="mb-3" height="10" />
            </div>
            <div class="col-md-9">
                <SkeletonLoader v-for="i in 15" :key="i" class="mb-3" height="70" />
            </div>
        </div>

    </div>
</template>