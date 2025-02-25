import {NextResponse} from "next/server";
import axiosInstance from "@/services/api.service";

export async function POST(request: Request) {

    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const {data: userWithTokens} = await axiosInstance.post('/auth/login', {
        username,
        password,
        expiresInMins: 1
    });

    const {accessToken, refreshToken, ...userData} = userWithTokens;


    const response = NextResponse.json({ success: true });


    response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
    });

    response.cookies.set("userData", JSON.stringify(userData), {
        path: "/",
    });


    return response;
}