import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
    baseURL: "http://localhost:9000",
    withCredentials: true,
});

//  Response Interceptor (Global Error Handling)
API.interceptors.response.use(
    (response) => response,
    (error) => {
        toast.error("Server API Error:", error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

//  Centralized API Methods
const apiService = {
    signup: (data) => API.post("/signup", data),
    login: (data) => API.post("login", data),
    logout: () => API.post("/logout"),
    profile: () => API.get("profile"),
    profileUpdate: (data) => API.put("profile/update", data),
    contact: (data) => API.post("api/contact", data),
    matchOverview: () => API.get('match/overview'),

    //  Generic API Calls 
    fetchData: (endpoint) => API.get(endpoint),
    postData: (endpoint, data) => API.post(endpoint, data),
};

export default apiService;
