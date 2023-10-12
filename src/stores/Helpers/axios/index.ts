import jobsEndPoints from "./endPoints/jobs"
import userEndPoints from "./endPoints/user"

export default {
    ...jobsEndPoints,
    ...userEndPoints,
}