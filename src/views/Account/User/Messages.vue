<template>
    <div class="row g-3">
        <div class="col-lg-5 min-vh-100 line-right px-3">
            <div class="row">
                <div class="col-12">
                    <div class="input-group mb-4">
                        <label class="input-group-text bg-transparent text-muted border-end-0 pe-0 rounded-0 "><i
                                class="bi bi-search"></i></label>
                        <input type="text" class="form-control border-start-0 rounded-0" placeholder="search messages"
                            aria-label="Button" aria-describedby="" />
                    </div>
                    <div class="col-12">
                        <ul class="list-group list-group-flush">
                            <li @click="activeInbox = i" v-for="i in 5" :key="i" class="list-group-item ps-0 cursor-pointer"
                                :class="{ 'bg-light theme-color': activeInbox == i }">
                                <div class="row justify-content-center align-items-center">
                                    <div class="col-lg-2">
                                        <div class="img-circle"></div>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="fw-bold text-capitalize">
                                            John Mayer- {{ i }}
                                            <span class="fw-light small float-end">
                                                {{ 12 + i }} mins ago
                                            </span>
                                        </div>
                                        <div class="fw-lighter text-truncate">
                                            We want to invite you for a quicc ccxc cx sdsds sdsds sdsd dssds sdds sdsds
                                            sddsd
                                        </div>
                                    </div>
                                </div>

                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-7 px-0 mx-0 bg-ligh pt-3">
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-1">
                        <div class="img-circle"></div>
                    </div>
                    <div class="col ">
                        <div class="fw-bold text-capitalize">
                            John Mayer- {{ activeInbox }}
                            <span class=" float-end">
                                <div class="btn-group">
                                    <span class="cursor-pointer" id="triggerId" data-bs-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        <i class="bi bi-three-dots-vertical"></i>
                                    </span>

                                    <div class="dropdown-menu dropdown-menu-start" aria-labelledby="triggerId">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item disabled" href="#">Disabled action</a>
                                        <h6 class="dropdown-header">Section header</h6>
                                        <a class="dropdown-item" href="#">Action</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">After divider action</a>
                                    </div>
                                </div>


                            </span>
                        </div>
                        <div class="fw-lighter text-truncate">
                            Recruiter at Nomad
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="mx-3">
                <div class="main bg-light">
                    <div class="px-2 scroll">
                        <div class="d-flex align-items-center">
                            <div class="text-left pr-1"><img src="https://img.icons8.com/color/40/000000/guest-female.png"
                                    width="30" class="img1" /></div>
                            <div class="pr-2 pl-1"> <span class="name">Sarah Anderson</span>
                                <p class="msg">Hi Dr. Hendrikson, I haven't been falling well for past few days.
                                </p>
                            </div>
                        </div>
                        <div class="d-flex align-items-center text-right justify-content-end ">
                            <div class="pr-2"> <span class="name">Dr. Hendrikson</span>
                                <p class="msg">Let's jump on a video call</p>
                            </div>
                            <div><img src="https://i.imgur.com/HpF4BFG.jpg" width="30" class="img1" /></div>
                        </div>
                        <div class="text-center"><span class="between">Call started at 10:47am</span></div>
                        <div class="text-center"><span class="between">Call ended at 11:03am</span></div>
                        <div class="d-flex align-items-center">
                            <div class="text-left pr-1"><img src="https://img.icons8.com/color/40/000000/guest-female.png"
                                    width="30" class="img1" /></div>
                            <div class="pr-2 pl-1"> <span class="name">Sarah Anderson</span>
                                <p class="msg">How often should i take this?</p>
                            </div>
                        </div>
                        <div class="d-flex align-items-center text-right justify-content-end ">
                            <div class="pr-2"> <span class="name">Dr. Hendrikson</span>
                                <p class="msg">Twice a day, at breakfast and before bed</p>
                            </div>
                            <div><img src="https://i.imgur.com/HpF4BFG.jpg" width="30" class="img1" /></div>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="text-left pr-1"><img src="https://img.icons8.com/color/40/000000/guest-female.png"
                                    width="30" class="img1" /></div>
                            <div class="pr-2 pl-1"> <span class="name">Sarah Anderson</span>
                                <p class="msg">How often should i take this?</p>
                            </div>
                        </div>
                    </div>
                    <nav class="navbar bg-white  d-flex justify-content-between"> <input type="text number" name="text"
                            class="form-control form-control-chat w-100 rounded-0 form-control-lg"
                            placeholder="Type a message...">
                        <div class="icondiv d-flex justify-content-end align-content-center text-center ml-2">
                            <i class="fa fa-paperclip icon1"></i> <i class="fa fa-arrow-circle-right icon2"></i>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeInbox = ref<any>(1)
</script>

<style lang="css" scoped>
.img-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--theme-color-soft);
    border: 1px solid #e8e5e5;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}




/* body {
    background: #651fff;
}

::-webkit-scrollbar {
    width: 10px
}

::-webkit-scrollbar-track {
    background: #eee
}

::-webkit-scrollbar-thumb {
    background: #888
}

::-webkit-scrollbar-thumb:hover {
    background: #555
} */

/* .wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #651FFF
} */

.main {
    /* background-color: #eee; */
    /* width: 320px; */
    position: relative;
    /* border-radius: 8px; */
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
    /* padding: 6px 0px 0px 0px */
}

.scroll {
    overflow-y: scroll;
    scroll-behavior: smooth;
    height: 325px;
    /* height: 400px */
}

.img1 {
    border-radius: 50%;
    background-color: #66BB6A
}

.name {
    font-size: 8px
}

.msg {
    background-color: #fff;
    font-size: 11px;
    padding: 5px;
    border-radius: 5px;
    font-weight: 500;
    color: #3e3c3c
}

.between {
    font-size: 8px;
    font-weight: 500;
    color: #a09e9e
}

.navbar {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) */
}

/* .form-control-chat {
    font-size: 12px;
    font-weight: 400;
    height: 30px;
    border: none
} */

/* .form-control:focus {
    box-shadow: none;
    overflow: hidden;
    border: none
} */

.form-control-chat:focus {
    box-shadow: none !important
}

.icon1 {
    color: #7C4DFF !important;
    font-size: 18px !important;
    cursor: pointer
}

.icon2 {
    color: #512DA8 !important;
    font-size: 18px !important;
    position: relative;
    left: 8px;
    padding: 0px;
    cursor: pointer
}

.icondiv {
    border-radius: 50%;
    width: 15px;
    height: 15px;
    padding: 2px;
    position: relative;
    bottom: 1px
}
</style>
