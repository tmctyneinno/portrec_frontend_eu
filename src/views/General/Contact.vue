<template>
  <headerVue />
  <div class="space-from-header"></div>

  <div class=" animate__animated animate__fadeIn">

    <div class="section-panel min-vh-100 pt-5 pb-0">
      <div class="container mb-5">
        <div class="row g-3">
          <div class="col-md-12 text-center">
            <div class="section-title">Contact</div>
            <small>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </small>
            <div class="min-vh-100 bg-light my-3">
              <div>
                <GoogleMap api-key="GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="map_center"
                  :zoom="15">
                  <Marker :options="{ position: map_center }" />
                </GoogleMap>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section-panel section-panel-light min-vh-100 pt-5 pb-0">
      <div class="container">
        <div class="row g-3">
          <div class="col-md-12 ">
            <div class="section-title fw-light text-center">Say Hello</div>
            <div class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div>
            <form @submit.prevent class="row justify-content-center my-5">
              <div class="col-md-8 col-lg-5">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="fw-bold">First Name</label>
                    <input type="text" class="form-control">
                  </div>
                  <div class="col-md-6">
                    <label class="fw-bold">Last Name</label>
                    <input type="text" class="form-control">
                  </div>
                  <div class="col-md-12">
                    <label class="fw-bold">Email Address</label>
                    <input type="text" class="form-control">
                  </div>
                  <div class="col-md-12">
                    <label class="fw-bold">Message</label>
                    <textarea rows="9" class="form-control"></textarea>
                  </div>
                  <div class="col-md-12 mt-3">
                    <button class="btn btn-primary float-end">Get in touch</button>
                  </div>
                </div>
              </div>
            </form>

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
import { GoogleMap, Marker } from "vue3-google-map";

const map_center = { lat: 40.689247, lng: -74.044502 };
</script>