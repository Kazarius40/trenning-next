import {NextRequest, NextResponse} from "next/server";
import {setTokensInCookies} from "@/utils/cookies.utils";
import axiosInstance from "@/services/axios.instance";

export async function POST(request: NextRequest) {


    const refreshToken = request.cookies.get("refreshToken")?.value;

    const {data: userWithTokens} = await axiosInstance.post("/auth/refresh", {refreshToken, expiresInMins: 1});

    const {accessToken, refreshToken: newRefreshToken} = userWithTokens;
    const response = NextResponse.json({});
    if (accessToken && newRefreshToken) {
        return setTokensInCookies(response, accessToken, newRefreshToken);
    }
    return response;
}
