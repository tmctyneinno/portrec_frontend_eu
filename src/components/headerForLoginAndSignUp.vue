<template>
  <nav class="navbar navbar-expand-lg fixed-top p-3 bg-transparent" :class="{ 'shadow-sm': headerDropped }"
    style="width: 50%">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/images/site_logo.png" width="140" alt="site_logo">
      </router-link>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item ">
            <router-link class="nav-link mx-4 " :to="'/about-us'">
              About Us</router-link>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const headerDropped = ref<boolean>(false)

// onMounted(() => {
//   window.addEventListener("scroll", function () {
//     const scrollThreshold = 50;
//     if (window.scrollY > scrollThreshold)
//       headerDropped.value = true;
//     else
//       headerDropped.value = false;
//   })
// })
</script>
