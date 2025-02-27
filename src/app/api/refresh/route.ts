import {NextRequest, NextResponse} from "next/server";
import axios, {AxiosError} from "axios";

export async function POST(request: NextRequest) {

    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

    try {
        const refreshToken = request.cookies.get("refreshToken")?.value;


        const { data: userWithTokens } = await axios.post(`${baseUrl}/auth/refresh`, {
            refreshToken,
            expiresInMins: 1,
        }, {
            headers: { "Content-Type": "application/json" }
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
    } catch (error) {
        const axiosError = error as AxiosError;

        const status = axiosError.response?.status || 500;
        const message = axiosError.response?.data || "Щось пішло не так при отриманні токенів";

        if (status === 401 || status === 403) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.json({ success: false, message }, { status });
    }
}
