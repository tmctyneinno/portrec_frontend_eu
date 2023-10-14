

<template>
    <div class="col-12">
        <div class="card rounded-0">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                Experiences
                <span class="float-end">
                    <span class="profile-edit-btn">
                        <i class="bi bi-plus-lg"></i>
                    </span>
                </span>
            </div>
            <div class="card-body small pe-0">


                <!-- Some borders are removed -->
                <ul class="list-group list-group-flush">
                    <li v-for="i in 2" :key="i" class="list-group-item ps-0">

                        <div class="row g-3">

                            <div class="col-lg-2">
                                <img src="" alt="_img" class="">
                            </div>
                            <div class="col-lg-10">
                                <div class="fw-bold mb-2">Graphics Designer
                                    <span class="float-end">
                                        <span class="profile-edit-btn">
                                            <i class="bi bi-pencil-square"></i>
                                        </span>
                                    </span>

                                </div>
                                <div class="text-muted mb-2">
                                    <span class="fw-bold">Twitter</span>
                                    <i class="bi bi-dot"></i>
                                    Full-Time
                                    <i class="bi bi-dot"></i>
                                    Jun 2019 - Present (1y 1m)
                                    <div>
                                        Manchester, UK.
                                    </div>
                                </div>
                                <div>
                                    Created and executed social media plan for 10 brands utilizing multiple features and
                                    content
                                    types to increase brand outreach, engagement, and leads.
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>





            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="css" scoped></style>
