import { $instance, $instanceForm } from '../instances'

export default {
    recruiterRegister(data: any) {
        return $instance.post(`recruiter/signup`, JSON.stringify(data))
    },

    recruiterLogin(data: any) {
        return $instance.post(`recruiter/login`, JSON.stringify(data))
    },

    recruiterProfile() {
        return $instance.get(`recruiter/profile`)
    },

    recruiterUpdateProfile(data: any) {
        return $instance.post(`recruiter/profile/update`, JSON.stringify(data))
    },

    recruiterProfilePicture(form: FormData, id?: any) {
        const str: string = id ? `/recruiter/profile/picture/${id}` : `/recruiter/profile/picture`
        return $instanceForm.post(`${str}`, form)
    },

    recruiterPassword(data: any) {
        return $instance.post(`/recruiter/password`, JSON.stringify(data))
    },

    recruiterMessageSend(data: any) {
        return $instance.put(`/messages`, JSON.stringify(data))
    },


    recruiterJobsList(data: any) {
        return $instance.post(`recruiter/job/list`, JSON.stringify(data))
    },

    recruiterJobsListAll() {
        return $instance.get(`recruiter/job/listAll`)
    },

    recruiterJobPosting(job: any) {
        return $instance.post(`recruiter/job/post`, JSON.stringify(job))
    },

    recruiterJobPostingUpdate(id: string | number, job: Object) {
        return $instance.post(`recruiter/job/update/${id}`, JSON.stringify(job))
    },

    recruiterJobDelete(id: any) {
        return $instance.delete(`recruiter/job/delete/${id}`,)
    },

    recruiterJobApplicationsList(data: Object) {
        return $instance.post(`recruiter/job/applications`, JSON.stringify(data))
    },
    recruiterJobApplicationDetails(applicationId: string | number) {
        return $instance.get(`recruiter/job/application/${applicationId}`)
    },

    recruiterJobsSelect() {
        return $instance.get(`recruiter/jobs/select`)
    },



    recruiterCompanyInformation() {
        return $instance.get(`recruiter/company/info`)
    },

    recruiterUpdateCompany(data: Object) {
        return $instance.post(`recruiter/company/update`, JSON.stringify(data))
    },


    recruiterCompanyResources() {
        return $instance.get(`recruiter/company/resources`)
    },

    recruiterCompanyAvatarUpload(form: FormData) {
        return $instanceForm.post(`recruiter/company/image`, form)
    },

    recruiterUpdateJobApplicationStatus(data: any) {
        return $instance.post(`recruiter/job/application/status/update`, JSON.stringify(data))
    },

    recruiterNotifications() {
        return $instance.get(`notifications/recruiter`)
    },

    recruiterScheduleInterview(form: FormData) {
        return $instanceForm.post(`create/meeting`, form)
    },

    recruiterGetInterviews() {
        return $instance.get(`get/recruiter/interviews`)
    },

    recruiterDeleteInterview(form: FormData) {
        return $instanceForm.post(`delete/interview`, form)
    },

    recruiterSearchTalent(form: FormData) {
        return $instanceForm.post(`get/all/careers`, form)
    },

    recruiterGetUserProfile(id: any) {
        return $instance.get(`recruiter/get/user/profile/${id}`,)
    },

}