import axios from "axios";
import {getTokensFromCookies} from "@/app/utils/getTokensFromCookies";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {"Content-Type": "application/json"},
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const {accessToken} = await getTokensFromCookies()
        console.log("то є мабуть токен: ", accessToken);

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);




export default axiosInstance;