import {NextResponse} from "next/server";
import {IUserWithToken} from "@/models/user-with-token/IUserWithToken";

export function setTokensInCookies(response: NextResponse, accessToken: string, refreshToken: string, userData?: IUserWithToken) {
    response.cookies.set("accessToken", accessToken, {httpOnly: true, path: "/"});

    response.cookies.set("refreshToken", refreshToken, {httpOnly: true, path: "/"});

    if (userData) {
        response.cookies.set("userData", JSON.stringify(userData), {path: "/"});
    }

    return response;
}