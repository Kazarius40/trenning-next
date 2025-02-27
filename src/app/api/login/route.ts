import {NextResponse} from "next/server";
import axiosInstance from "@/services/axios.instance";
import {IUserWithToken} from "@/models/user-with-token/IUserWithToken";
import {setTokensInCookies} from "@/utils/cookies.utils";

export async function POST(request: Request) {

    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const {data: userWithTokens} = await axiosInstance.post<IUserWithToken>('/auth/login', {
        username,
        password,
        expiresInMins: 1
    });

    const {accessToken, refreshToken, ...userData} = userWithTokens;
    const response = NextResponse.json({});
    if (accessToken && refreshToken && userData) {
        return setTokensInCookies(response, accessToken, refreshToken, userData);
    }
    return response;
}