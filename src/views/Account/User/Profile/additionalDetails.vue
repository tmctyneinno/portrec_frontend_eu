

<template>
    <div class="col-12">
        <div class="card rounded-0">
            <div class="card-header bg-transparent fw-bold border-0 pt-3">
                Additional Details
                <span class="float-end">
                    <span class="profile-edit-btn">
                        <i class="bi bi-pencil-square"></i>
                    </span>
                </span>
            </div>
            <div class="card-body small py-0">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item border-0">
                        <div class="row">
                            <div class="col-2">
                                <i class="bi bi-envelope"></i>
                            </div>
                            <div class="col">
                                <div class="text-muted">Email</div>
                                <div>xxxxxxx</div>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item border-0">
                        <div class="row">
                            <div class="col-2">
                                <i class="bi bi-phone"></i>
                            </div>
                            <div class="col">
                                <div class="text-muted">Phone</div>
                                <div>080</div>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item border-0">
                        <div class="row">
                            <div class="col-2">
                                <i class="bi bi-translate"></i>
                            </div>
                            <div class="col">
                                <div class="text-muted">Languages</div>
                                <div>
                                    <span class="languages-list text-dark bg-transparen">English</span>
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

<style lang="css" scoped>
.languages-list {
    background-color: var(--bs-light);
    padding-inline: 5px;
    display: inline-block;
    margin-right: 5px;
    margin-block: 5px;
    font-size: small;
}
</style>
