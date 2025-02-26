import axios from "axios";

export async function loginWithToken(data: FormData): Promise<void> {
    await axios.post('http://localhost:3000/api/login', data);
}