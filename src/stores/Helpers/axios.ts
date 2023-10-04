import axios from 'axios'
import { type ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress';

const progresses = [] as ProgressFinisher[];

const hostURL = 'https://staging.tmcinstitute.com'

const $instance = axios.create({
    baseURL: `${hostURL}/api/`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8;text/json',
        // 'Content-Type': 'application/json;charset=UTF-8;text/json;multipart/form-data',
        withCredentials: true,
    },
})

// create interceptor for renewing token
$instance.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem('');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        progresses.push(useProgress().start());
        return config;
    }
);

$instance.interceptors.response.use(resp => {
    progresses.pop()?.finish();
    return resp;
}, (error) => {
    progresses.pop()?.finish();
    return Promise.reject(error);
});

export default {


    // jobs ####################################################
    allJobs() {
        return $instance.get(`job/all`)
    },

    jobDetails(id: any) {
        return $instance.get(`job/${id}`)
    },

    jobCategories() {
        return $instance.get(`job/categories`)
    },

    jobTypes() {
        return $instance.get(`job/types`)
    },

    jobFunctions() {
        return $instance.get(`job/functions`)
    },

    // samplePost(data: object) {
    //     return $instance.post(`sendFeedBack`, JSON.stringify(data))
    // }

}