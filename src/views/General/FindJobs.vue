<template>
  <!-- header -->
  <headerVue />
  <div class="space-from-header"></div>

  <div class="animate__animated animate__fadeIn mb-5">

    <div class="section-panel section-panel-light py-5">
      <div class="container mb-5">
        <div class="row g-3">
          <div class="col-md-12">
            <div class="section-title text-center mb-0">
              Find your <span class="theme-color fw-bold">dream job</span>
            </div>
            <div class="text-center small text-muted mb-4">
              Find your next career at companies like HubSpot, Nike, and Dropbox
            </div>
            <div class="row justify-content-center">
              <div class="col-md-10">
                <searchJobForm btntext="Search" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-lg-4">



        </div>
        <div class="col-lg-8">
          <div class="col-12 my-3">
            <div class="row">
              <div class="col-7">
                <div>
                  <span class="fw-bold fs-4">All Jobs</span> <br>
                  <span class="xsmall text-muted">Showing 73 results</span>
                </div>
              </div>
              <div class="col-lg-5 col-12 d-flex justify-content-end  align-items-center xsmall ">
                <div class="line-right">
                  <span class="text-muted">Sort By:</span>
                  <span class="ms-2">Most Revelant <i class="bi bi-chevron-down"></i> </span>
                </div>
                <div class="ps-3">
                  <span><i class="bi bi-grid"></i></span>
                  <span class="ms-3 p-2 bg-light"><i class="bi bi-hdd-stack-fill theme-color"></i></span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="card border-0">
              <div class="row justify-content-center gy-3">

                <div v-for="i in 8" :key="i" class="col-md-12 col-sm-12 col-12 rounded-0">
                  <div class="jbr-wrap text-left border">
                    <div
                      class="cats-box mlb-res rounded bg-white d-flex align-items-center justify-content-between px-3 py-3">
                      <div class="cats-box bg-white d-flex align-items-center">
                        <div class="text-center"><img src="@/assets/images/jobs/round.png" class="img-fluid" width="55"
                            alt=""></div>
                        <div class="cats-box-caption px-2">
                          <h4 class="fs-md mb-0 ft-medium">Fresher UI/UX Designer (3 Year Exp.)</h4>
                          <div class="d-block mb-2 position-relative">
                            <span class="text-muted medium"><i class="lni lni-map-marker me-1"></i>Liverpool,
                              London</span>
                            <span class="muted medium ms-2 theme-cl"><i class="lni lni-briefcase me-1"></i>Full
                              Time</span>
                          </div>
                        </div>
                      </div>
                      <div class="text-center mlb-last">
                        <button class="btn btn-primary rounded-0 px-5">Apply</button>
                        <div class="progress mt-2 mb-0 rounded-0" role="progressbar" aria-valuenow="50" aria-valuemin="0"
                          aria-valuemax="100" style="height: 7px">
                          <div class="progress-bar bg-danger" style="width: 50%"></div>
                        </div>
                        <small>5 applied of 10 capacity</small>
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

  <!-- footer -->
  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/header.vue'
import footerVue from '@/components/footer.vue'
import searchJobForm from '@/components/searchJobForm.vue';
</script>

<style scoped>
@import '@/assets/css/theme-style.css';

.img-fluid {
  max-width: 100%;
  height: auto;
}

.ft-medium {
  font-weight: 500;
}

.fs-md {
  font-size: 16px !important;
}
</style>