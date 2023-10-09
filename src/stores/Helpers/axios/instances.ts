import axios from 'axios'
import { type ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress';

const progresses = [] as ProgressFinisher[];

const hostURL = 'https://staging.tmcinstitute.com'



// create instances #######################################################
const $instance = axios.create({
    baseURL: `${hostURL}/api/`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8;text/json',
        withCredentials: true,
    },
})

const $instanceForm = axios.create({
    baseURL: `${hostURL}/api/`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8;text/json;multipart/form-data',
        withCredentials: true,
    },
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

$instanceForm.interceptors.request.use(
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
    $instance, $instanceForm
}