<template>
    <div class="wholePage">
        <div class="container">
            <div class="row justify-content-center g-3">
                <div> <img src="/images/site_logo.png" width="140" alt="site_logo"></div>
                <div class="fw-bold fs-5">Invitation Details</div>
                <div class="small"> Friday, Nov 21 </div>
                <div class="col-12">
                    <div class="fw-bold">UI/UX Designer (Tech) - Remote</div>
                    <div class="text-muted small">Johndoe Enterprises, Lagos.</div>
                    <div class="text-muted mt-2 small">
                        <i class="bi bi-clock-history me-2"></i> 11:00 - 11:30 WAT
                    </div>
                    <div class="text-muted mt-2 small">
                        <i class="bi bi-camera-video me-2"></i>Video interview
                    </div>
                </div>
                <hr>
                <div class="col-12">
                    <p>Dear candidate,</p>
                    <p>Sequel to your application as the role of a ui ux designer at Johndoe Enterprises, you are hereby
                        scheduled for a zoom meeting with details as follows:</p>
                    <p>Time: Friday, 21st Nov 2024 11:00AM WAT</p>
                    <div class="my-3">
                        <div>Join zoom meeting</div>
                        <a href="https://dghfigfwggdhj,joerljrjoqrioqrjgjg123" target="_blank">
                            https://dghfigfwggdhj,joerljrjoqrioqrjgjg123
                        </a>
                    </div>
                    <div class="my-3">
                        <div>Meeting ID: 12345747</div>
                        Passcode: 6zhfyfb
                    </div>

                    <p>You are expected to be punctual</p>
                    <p>Kindly acknowledge this.</p>
                    <p> Goodluck!</p>
                </div>
                <div class="col-12">
                    <primaryButtonOutline :btnClass="'rounded-3 float-end mx-2'">
                        Reject
                    </primaryButtonOutline>
                    <primaryButton :btnClass="'rounded-3 float-end mx-2'">
                        Accept
                    </primaryButton>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.wholePage {
    min-height: 100vh;
    padding-block: 30px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    /* background-color: var(--theme-color); */
}
</style>