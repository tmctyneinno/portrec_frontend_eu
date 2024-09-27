import jobsEndPoints from "./endPoints/jobs"
import userEndPoints from "./endPoints/user"
import recruiterEndPoints from "./endPoints/recruiter"
import messagingEndPoints from "./endPoints/messaging"
import companiesEndPoint from "./endPoints/companies"
import general from "./endPoints/general"

export default {
    ...jobsEndPoints,
    ...userEndPoints,
    ...recruiterEndPoints,
    ...messagingEndPoints,
    ...companiesEndPoint,
    ...general,
}