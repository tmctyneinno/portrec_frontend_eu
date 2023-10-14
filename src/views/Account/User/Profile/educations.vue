

<template>
    <div class="col-12">
        <div class="card rounded-0">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                Educations
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
                            <div class="col">
                                <div class="fw-bold mb-2">Harvard University
                                    <span class="float-end">
                                        <span class="profile-edit-btn">
                                            <i class="bi bi-pencil-square"></i>
                                        </span>
                                    </span>

                                </div>
                                <div class="text-muted mb-2">
                                    Postgraduate degree, Applied Psychology
                                    <div>
                                        2010 - 2012
                                    </div>
                                </div>
                                <div>
                                    As an Applied Psychologist in the field of Consumer and Society, I am specialized in
                                    creating business opportunities by observing, analysing, researching and changing
                                    behaviour.
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
