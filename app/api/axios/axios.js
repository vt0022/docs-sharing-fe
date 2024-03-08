import axios from "axios";
const BASE_URL = "http://192.168.0.101:8080/docs-sharing/api/v1";

export default axios.create({
    baseURL: BASE_URL,
});

export const privateAxios = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
