import {NextRequest, NextResponse} from "next/server";
import axios from "axios";
import {setTokensInCookies} from "@/utils/cookies.utils";

export async function POST(request: NextRequest) {

    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

    const refreshToken = request.cookies.get("refreshToken")?.value;

    const {data: userWithTokens} = await axios.post(`${baseUrl}/auth/refresh`, {
        refreshToken,
        expiresInMins: 1,
    });

    const {accessToken, refreshToken: newRefreshToken} = userWithTokens;
    const response = NextResponse.json({});
    if (accessToken && newRefreshToken) {
        return setTokensInCookies(response, accessToken, newRefreshToken);
    }
    return response;
}
