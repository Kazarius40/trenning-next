import axios from "axios";

export async function fetchUsersApi(endpoint: string, retryCount = 0) {
    try {
        const {data} = await axios.get(`http://localhost:3000/api/get${endpoint}`);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401 && retryCount < 1) {
            try {
                await axios.post(`http://localhost:3000/api/refresh`);
                return fetchUsersApi(endpoint, retryCount + 1);
            } catch (error) {
                throw error;
            }
        }
        throw error;
    }
}