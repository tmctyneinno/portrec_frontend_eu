<template>
  <nav class="navbar navbar-expand-lg fixed-top p-3 " :class="scrolledClass">
    <div class="container">
      <router-link class="navbar-brand" to="/">PORTREC_LOGO</router-link>
      <button class="navbar-toggler border-0" data-bs-toggle="offcanvas" data-bs-target="#menuOffcanvas"
        aria-controls="offcanvasExample" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link mx-4" to="/">Find Jobs</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-4" to="/">About Us</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <router-link class="nav-link mx-4 p-1" to="/">Login</router-link>
          <button type="button" class="btn btn-primary rounded-0 m- nav-link text-white p-1 px-3">Sign Up</button>
        </div>
      </div>
    </div>
  </nav>
  <mobileMenuVue />
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import mobileMenuVue from './mobileMenuVue.vue';
const headerDropped = ref<boolean>(false)

const scrolledClass = computed(() => ({
  'bg-white': headerDropped.value,
  'shadow-sm': headerDropped.value,
  'animate__animated animate__slideInDown animate__faster': headerDropped.value,
}))

onMounted(() => {
  window.addEventListener("scroll", function () {
    const scrollThreshold = 50;
    if (window.scrollY > scrollThreshold)
      headerDropped.value = true;
    else
      headerDropped.value = false;
  })
})
</script>

<style scoped></style>
