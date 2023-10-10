import { $instance, $instanceJobs } from '../instances'

export default {

    allJobs(queryStr?: string) {
        return $instance.get(`job/all${queryStr}`)
    },

    latestJobs() {
        return $instance.get(`job/all/latest`)
    },

    jobDetails(id: any) {
        return $instanceJobs.get(`job/${id}`)
    },

    jobCategories() {
        return $instanceJobs.get(`job/categories`)
    },

    jobTypes() {
        return $instanceJobs.get(`job/types`)
    },

    jobFunctions() {
        return $instanceJobs.get(`job/functions`)
    },
}