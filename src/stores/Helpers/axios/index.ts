import jobsEndPoints from "./endPoints/jobs"
import userEndPoints from "./endPoints/user"
import messagingEndPoints from "./endPoints/messaging"
import companiesEndPoint from "./endPoints/companies"

export default {
    ...jobsEndPoints,
    ...userEndPoints,
    ...messagingEndPoints,
    ...companiesEndPoint
}