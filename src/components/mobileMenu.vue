<template>
    <div data-bs-scroll="true" class="offcanvas offcanvas-start" tabindex="-1" id="menuOffcanvas"
        aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel"></h5>
            <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="list-group list-group-flush">
                <li v-for="({ title, route }, i) in contents.navBarMenus" :key="i" class="list-group-item">
                    <router-link :to="route">{{ title }}</router-link>
                </li>
                <hr>
                <li class="list-group-item">
                    <router-link to="/login">Login</router-link>
                </li>
                <li class="list-group-item">
                    <router-link class="theme-color" to="/signup">Sign Up</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useContentStore } from '@/stores/contents';


const contents = useContentStore()
const btnX = ref<any>(null)

onBeforeRouteLeave(() => {
    btnX.value.click()
})

onMounted(() => {
    const divs = document.querySelectorAll('.list-group-item');
    // const targetDiv = document.querySelector('[aria-current="page"]');
    divs.forEach((div) => {
        div.setAttribute('data-bs-dismiss', 'offcanvas');
    });
})

</script>

<style scoped>
.offcanvas {
    width: 250px;
}

.list-group-item {
    border: 0;
    font-size: 20px;
    margin-bottom: 10px;
}

.list-group-item a {
    text-decoration: none;
    color: var(--vt-c-black-soft);
}
</style>