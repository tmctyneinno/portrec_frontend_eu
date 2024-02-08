import jobsEndPoints from "./endPoints/jobs"
import userEndPoints from "./endPoints/user"
import messagingEndPoints from "./endPoints/messaging"

export default {
    ...jobsEndPoints,
    ...userEndPoints,
    ...messagingEndPoints
}