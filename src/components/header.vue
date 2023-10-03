<template>
  <nav class="navbar navbar-expand-lg fixed-top p-3 bg-white" :class="customClass">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/images/site_logo.png" width="140" alt="site_logo">
      </router-link>
      <button class="navbar-toggler border-0" data-bs-toggle="offcanvas" data-bs-target="#menuOffcanvas"
        aria-controls="menuOffcanvas" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-for="({ title, routePath }, i) in contents.navBarMenus" :key="i" class="nav-item ">
            <router-link class="nav-link mx-4 " :class="{ 'text-white': route.path == '/' && !headerDropped }"
              :to="routePath">{{ title
              }}</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <router-link class="nav-link mx-4 p-1" to="/login">Login</router-link>
          <router-link to="/signup" class="btn btn-primary rounded-0 m- nav-link text-white p-1 px-3">
            Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </nav>
  <mobileMenuVue />
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import mobileMenuVue from './mobileMenu.vue';
import { useContentStore } from '@/stores/contents';
import { useRoute } from 'vue-router';

const contents = useContentStore()
const headerDropped = ref<boolean>(false)
const route = useRoute()

const customClass = computed(() => ({
  // 'b': route.path !== '/',
  'bg-transparent text-white': !headerDropped.value && route.path == '/',
  'animate__animated animate__slideInDown animate__faster': headerDropped.value && route.path == '/',
  'shadow-sm': route.path !== '/'
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

<style scoped>
.navbar-nav .nav-link.active,
.navbar-nav .nav-link.show {
  color: var(--theme-color);
  /* font-weight: bolder; */
  /* border-bottom: 1px solid var(--theme-color); */
}
</style>
