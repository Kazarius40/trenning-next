import axios from "axios";

export async function fetchUsersApi(endpoint: string) {
    try {
        const {data} = await axios.get(`http://localhost:3000/api/get${endpoint}`);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {


            await axios.post(`http://localhost:3000/api/refresh`);
            return fetchUsersApi(endpoint);
        }
    }
}