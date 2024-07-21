<template>
    <div class="row g-3 m-0 pb-5">
        <div class="col-12">
            <div class="row g-3">
                <div class="col-12">
                    <div class="d-lg-flex justify-content-between">
                        <div class="fw-bold text-capitalize fs-5">Settings</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">

            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1"
                        type="button" role="tab" aria-controls="tab1" aria-selected="true">
                        Overview
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button"
                        role="tab" aria-controls="tab2" aria-selected="false">
                        Social Links
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3" type="button"
                        role="tab" aria-controls="tab3" aria-selected="false">
                        Team
                    </button>
                </li>
            </ul>

            <div class="tab-content" style="min-height: 300px;">
                <div class="tab-pane active py-4" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                    <div>
                        <strong>Basic Information</strong>
                        <div class="text-muted small">This is company information that you can update anytime.</div>
                    </div>

                    <hr>

                    <div class="row g-3">
                        <div class="col-md-4">
                            <strong> Company Logo</strong>
                            <div class="text-muted small">
                                This image will be shown publicly as company logo.
                            </div>
                        </div>
                        <div class="col-md-8 d-lg-flex">
                            <img src="" alt="icompany_logo">
                            <span class="card ms-2 bg-light-subtle p-3 cursor-pointer">
                                click here to add image
                            </span>
                        </div>
                    </div>

                    <hr>

                    <div class="row g-3">
                        <div class="col-md-4">
                            <strong> Company Details</strong>
                            <div class="text-muted small">
                                Introduce your company core info quickly to users by fill up company details
                            </div>
                        </div>
                        <div class="col-md-5">
                            <form action="">
                                <div class="row g-3">
                                    <div class="col-12">
                                        <div class="form-label">Company Name</div>
                                        <input type="text" class="form-control" placeholder="Nomad">
                                    </div>

                                    <div class="col-12">
                                        <div class="form-label">Website</div>
                                        <input type="text" class="form-control" placeholder="Https://www.nomad.com">
                                    </div>

                                    <div class="col-12">
                                        <div class="form-label">Location</div>
                                        <select class="form-select" name="" id="">
                                            <option selected></option>
                                        </select>

                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-label">Employee</div>
                                        <select class="form-select" name="" id="">
                                            <option selected>1-50</option>
                                        </select>

                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-label">Industry</div>
                                        <select class="form-select" name="" id="">
                                            <option selected>Technology</option>
                                        </select>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-label">Date Founded</div>
                                        <select class="form-select" name="" id="">
                                            <option selected>31</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-label">&nbsp;</div>
                                        <select class="form-select" name="" id="">
                                            <option selected>July</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-label">&nbsp;</div>
                                        <select class="form-select" name="" id="">
                                            <option selected>2021</option>
                                        </select>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-label">Tech Stack</div>
                                        <select class="form-select" name="" id="">
                                            <option selected></option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <hr>

                    <div class="row g-3">
                        <div class="col-md-4">
                            <strong>About Company</strong>
                            <div class="text-muted small">
                                Brief description for your company. URLs are hyperlinked.
                            </div>
                        </div>

                        <div class="col-md-8">
                            <div class="form-label">Description</div>
                            <textarea class="form-control" rows="5"></textarea>
                        </div>
                    </div>

                    <hr>

                    <button class="btn btn-primary float-lg-end">Save Changes</button>

                </div>


                <div class="tab-pane py-4" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                    <div class="row g-3">
                        <div class="col-md-4">
                            <strong> Basic Information</strong>
                            <div class="text-muted small">
                                Add elsewhere links to your company profile. You can add only username without full
                                https links.
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="form-label">Instagram</div>
                                    <input type="text" class="form-control"
                                        placeholder="https://www.instagram.com/nomad/">
                                </div>

                                <div class="col-12">
                                    <div class="form-label">Twitter</div>
                                    <input type="text" class="form-control" placeholder="https://twitter.com/nomad/">
                                </div>


                                <div class="col-12">
                                    <div class="form-label">Facebook</div>
                                    <input type="text" class="form-control"
                                        placeholder="https://web.facebook.com/nomad/">
                                </div>

                                <div class="col-12">
                                    <div class="form-label">LinkedIn</div>
                                    <input type="text" class="form-control" placeholder="Enter your LinkedIn address">
                                </div>

                                <div class="col-12">
                                    <div class="form-label">Youtube</div>
                                    <input type="text" class="form-control" placeholder="Enter your youtube address">
                                </div>




                            </div>
                        </div>
                    </div>

                    <hr>

                    <button class="btn btn-primary float-lg-end">Save Changes</button>
                </div>

                <div class="tab-pane py-4" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                    <div class="row g-3">
                        <div class="col-md-4">
                            <strong> Basic Information</strong>
                            <div class="text-muted small">
                                Add team members of your company
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="fw-lighter mb-3">50 Members
                                        <div class="float-lg-end">
                                            <button class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                                data-bs-target="#modalId">
                                                <i class="bi bi-plus-lg"></i> Add Members
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4 cursor-pointer hover-tiltY" v-for="i in 6" :key="i">
                                    <div class="card py-4">
                                        <div class="card-body">
                                            <div class="d-lg-flex justify-content-center">
                                                <div class="img-circle"></div>
                                            </div>
                                            <div class="text-center fw-bold">
                                                Célestin Gardinier
                                            </div>
                                            <div class="text-muted text-center small">
                                                CEO & Co-Founder
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- modal -->
    <div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
        aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title" id="modalTitleId">
                        Add Member
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-12">
                            <label class="form-label">Enter Full Name</label>
                            <input type="text" class="form-control" placeholder="Enter Member’s Full Name">
                        </div>

                        <div class="col-12">
                            <label class="form-label">Enter Email Address</label>
                            <input type="text" class="form-control" placeholder="Enter Member’s Email Address">
                        </div>

                        <div class="col-12">
                            <label class="form-label">Enter Member’s Position</label>
                            <input type="text" class="form-control" placeholder="Enter Member Position">
                        </div>

                        <div class="col-12">
                            <label class="form-label">Enter Phone Number</label>
                            <input type="text" class="form-control" placeholder="Enter Member’s phone number">
                        </div>

                        <div class="col-12">
                            <label class="form-label">Social Media Link</label>
                            <input type="text" class="form-control" placeholder="Instagram">
                        </div>

                        <div class="col-12">
                            <label class="form-label">Social Media Link</label>
                            <input type="text" class="form-control" placeholder="Linkedin">
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-primary w-100">Add Member</button>
                </div>
            </div>
        </div>
    </div>



</template>

<script lang="ts" setup>

</script>


<style lang="css" scoped>
.img-circle {
    width: 67px;
    height: 67px;
    border-radius: 50%;
    background-color: var(--bs-light);
    border: 2px solid var(--bs-secondary-bg-subtle);
    margin-bottom: 15px;
}
</style>
