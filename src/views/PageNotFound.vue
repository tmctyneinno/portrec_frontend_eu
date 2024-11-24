<template>
    <div class="wholePage">
        <div class="container">
            <div class="row justify-content-center">
                <div class="text-center mb-3" style=" color: #fff;  opacity: 0.4;">
                    <!-- <i class="bi bi-exclamation-triangle-fill"></i> -->
                    <img src="/images/404.svg" width="32%" alt="">
                </div>

                <h1 class="text-center text-white fw-bold">PAGE NOT FOUND</h1>
                <div class="col-md-6">
                    <h3 class="text-center text-white">
                        We can't seem to find the page you're looking for
                    </h3>
                </div>
                <div class="text-center mt-3">
                    <router-link class="btn text-decoration-none theme-color2" to="/">
                        Go to Homepage
                        <i class="bi bi-chevron-right"></i>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wholePage {
    min-height: 100vh;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: var(--theme-color);
}
</style>