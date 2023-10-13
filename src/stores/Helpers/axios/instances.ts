import axios from 'axios'
import { type ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress';

const progresses = [] as ProgressFinisher[];

const hostURL = 'https://staging.tmcinstitute.com';
const apiURL = `${hostURL}/api/`;

const headersNormal = {
    Accept: 'application/json',
    withCredentials: true,
    // 'Content-Type': 'application/json;charset=UTF-8;text/json;multipart/form-data',
    'Content-Type': 'application/json',
}

const headersForForm = {
    Accept: 'application/json',
    withCredentials: true,
    'Content-Type': 'multipart/form-data',
}



// create instances #######################################################
const $instance = axios.create({
    baseURL: apiURL,
    headers: headersNormal
})

const $instanceJobs = axios.create({
    baseURL: apiURL,
    headers: headersNormal,
})
const $instanceForm = axios.create({
    baseURL: apiURL,
    headers: headersForForm,
})


// create interceptor for renewing token ##########################################3
const setAuthorizationAndAddProgress = (config: any) => {
    const token = localStorage.getItem('protrec_$authTkn');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    progresses.push(useProgress().start());

    return config;
};

// Set interceptors
$instance.interceptors.request.use(setAuthorizationAndAddProgress);
$instanceForm.interceptors.request.use(setAuthorizationAndAddProgress);


// include progress bar ###########################################################3
$instance.interceptors.response.use(resp => {
    progresses.pop()?.finish();
    return resp;
}, (error) => {
    progresses.pop()?.finish();
    return Promise.reject(error);
});

export {
    $instance, $instanceJobs, $instanceForm
}