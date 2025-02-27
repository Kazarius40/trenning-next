import {NextRequest, NextResponse} from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {

    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

    const refreshToken = request.cookies.get("refreshToken")?.value;


    const {data: userWithTokens} = await axios.post(`${baseUrl}/auth/refresh`, {
        refreshToken,
        expiresInMins: 1,
    });

    const {accessToken, refreshToken: newRefreshToken} = userWithTokens;

    const response = NextResponse.json({success: true});

    if (accessToken && newRefreshToken) {
        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            path: "/",
        });

        response.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            path: "/",
        });
    }
    return response;
}
