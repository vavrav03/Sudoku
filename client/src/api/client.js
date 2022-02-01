import axios from "axios";

export default axios.create({
   baseURL: `${window.location.origin}/api/`,
   timeout: 31000
})
