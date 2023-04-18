import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://camp-courses.api.kreosoft.space/",
  });
  
  export default axiosInstance;