<script lang="ts" setup>

</script>

<template>
    <footer class="dark-footer skin-dark-footer style-2">
        <div class="footer-middle">
            <div class="container">
                <div class="row">

                    <div class=" col-md-4 col-sm-12">
                        <div class="footer_widget">
                            <img src="@/assets/images/site_logo.png" class="img-footer small mb-2" alt="Portrec_Logo">

                            <div class="address mt-2 text-white">
                                Great platform for job seeker that is passionate about
                                startups. Find your dream job easier.
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                        <div class="footer_widget">
                            <h4 class="widget_title">About</h4>
                            <ul class="footer-menu">
                                <li><a href="#">Companies</a></li>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">Terms</a></li>
                                <li><a href="#">Advice</a></li>
                                <li><a href="#">Private Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                        <div class="footer_widget">
                            <h4 class="widget_title">Resources</h4>
                            <ul class="footer-menu">
                                <li><a href="#">Explore All Jobs</a></li>
                                <li><a href="#">Help Docs</a></li>
                                <li><a href="#">Guide</a></li>
                                <li><a href="#">Updates</a></li>
                                <li><a href="#">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class=" col-md-4 col-sm-12">
                        <div class="footer_widget">
                            <h4 class="widget_title">Get job notifications</h4>
                            <div class="text-white">The latest jobs, articles, sent to your inbox weekly</div>
                            <form @submit.prevent class="row mt-3">
                                <div class="col-8">
                                    <input type="text" class="form-control rounded-0" placeholder="email address">
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-primary rounded-0">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-bottom br-top">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-12 col-md-12 text-center">
                        <p class="mb-0"> &copy; {{ (new Date()).getFullYear() }} PORTREC. </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
footer {
    z-index: 99;
    font-size: 14px;
    color: #565656;
    position: relative;
}

footer.light-footer {
    background: #ffffff;
}

footer.dark-footer {
    background: #172228;
}

footer.footer-small {
    padding: 50px 0 0 0;
}

img.img-footer {
    max-width: 180px;
    margin-bottom: 2rem;
}

img.img-footer.small {
    margin: 0;
    max-width: 150px;
    position: relative;
    top: 2px;
}

.ft-copyright {
    padding: 0px 0 12px 0;
}

.ft-copyright p {
    margin-bottom: 0;
}

.footer_widget {
    padding: 60px 0 60px;
}

h4.widget_title {
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: 500;
    text-transform: capitalize;
}

.footer_widget ul {
    padding: 0;
    margin: 0;
}

.footer_widget ul li {
    list-style: none;
    margin-top: 12px;
    display: block;
}

.footer_widget ul.list-inline li,
ul.list-inline li {
    display: inline-block;
    margin-right: 15px;
}

.footer_widget ul li a {
    color: #60626a;
    font-size: 14px;
}

.light-footer .footer-bottom {
    background: #ffffff;
    border-top: 1px solid #edeff1;
}

footer.skin-dark-footer .extream,
footer.skin-light-footer .extream {
    letter-spacing: 1px;
    line-height: 1.4;
}

footer.skin-dark-footer h4,
footer.skin-blue-footer h4 {
    color: #ffffff;
}

footer.skin-dark-footer .footer_widget ul li a,
footer.skin-dark-footer,
footer.skin-dark-footer a {
    color: #83929b;
    transition: all ease 0.4s;
    font-size: 14px;
}

footer.skin-dark-footer .footer_widget ul li a:hover,
footer.skin-dark-footer .footer_widget ul li a:focus {
    color: #ffffff;
    transform: translateX(5px) !important;
}

.footer-bottom {
    padding: 10px 0;
    border-top: 1px solid #273246;
}

.blue-footer .footer-bottom {
    background: #192538;
    border-color: #192538;
}

.skin-dark-footer .footer-bottom {
    border-top: 1px solid #1d2b32;
}

footer.skin-dark-footer ul.footer-bottom-social li a:hover,
footer.skin-dark-footer ul.footer-bottom-social li a:focus {
    color: #ffffff;
    opacity: 1;
}

.skin-dark-footer .f-newsletter .form-control {
    border: 2px solid #9ea6ba;
}

a {
    color: #111111;
    text-decoration: none;
    background-color: transparent;
    -webkit-text-decoration-skip: objects;

}



@media (max-width: 767px) {
    .footer_widget {
        padding: 30px 0 30px;
    }
}
</style>
