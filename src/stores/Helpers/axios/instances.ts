import axios from 'axios'
import { type ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress';

const progresses = [] as ProgressFinisher[];

const hostURL = 'https://staging.tmcinstitute.com';
const apiURL = `${hostURL}/api/`;

const headers = {
    Accept: 'application/json',
    withCredentials: true,
    'Content-Type': 'application/json;charset=UTF-8;text/json;multipart/form-data',
}

// create instances #######################################################
const $instance = axios.create({
    baseURL: apiURL,
    headers: headers,
})

const $instanceJobs = axios.create({
    baseURL: apiURL,
    headers: headers,
})








// create interceptor for renewing token ##########################################3
$instance.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem('');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        progresses.push(useProgress().start());
        return config;
    }
);



// include progress bar ###########################################################3
$instance.interceptors.response.use(resp => {
    progresses.pop()?.finish();
    return resp;
}, (error) => {
    progresses.pop()?.finish();
    return Promise.reject(error);
});

export {
    $instance, $instanceJobs
}