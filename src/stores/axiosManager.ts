import axios from 'axios'

const hostURL = '' 

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
        return config;
    }
);

export default {

    sampleGet(_id: string) {
        return $instance.get(`url?_id=${_id}`)
    },

    sampleGet2(_id: string) {
        return $instance.get(`url/${_id}`,)
    },

    sampleGet3() {
        return $instance.get(`getFeedbacks`)
    },

    samplePost(data: object) {
        return $instance.post(`sendFeedBack`, JSON.stringify(data))
    }

}