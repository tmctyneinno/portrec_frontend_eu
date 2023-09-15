

<template>
    <div ref="offCanvasRef" data-bs-scroll="true" class="offcanvas offcanvas-start" tabindex="-1" id="menuOffcanvas"
        aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel"></h5>
            <button ref="btnX" type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <!-- <div>
                Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists,
                etc.
            </div> -->

            <!-- Some borders are removed -->
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <router-link to="/">Find Jobs</router-link>
                </li>
                <li class="list-group-item">
                    <router-link to="/">About Us</router-link>
                </li>
                <li class="list-group-item"></li>
                <li class="list-group-item">
                    <router-link to="/">Login</router-link>
                </li>
                <li class="list-group-item">
                    <router-link class="theme-color" to="/">Sign Up</router-link>

                </li>
            </ul>

        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const offCanvasRef = ref<any>(null)
const btnX = ref<any>(null)

onMounted(() => {
    window.addEventListener('popstate', (event) => {
        if (offCanvasRef.value.classList.contains('show')) {
            // offCanvasRef.value.classList.remove('show')
            btnX.value.click()
            event.preventDefault()
        }
    })
})

</script>

<style scoped>
.offcanvas {
    width: 250px;
}

.list-group-item {
    border: 0;
    font-size: 20px;
}

.list-group-item a {
    text-decoration: none;
    color: var(--vt-c-black-soft);
}
</style>