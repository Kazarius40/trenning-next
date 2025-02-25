import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
    if (req.method === "GET") {
        console.log("req.cookies:", req.cookies);

        const accessTokenCookie = req.cookies.get("accessToken");

        const accessToken = accessTokenCookie?.value;


        console.log("accessToken в middleware: ", accessToken);

        const headers = new Headers(req.headers);

        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
            console.log("middleware щось тут намагається зробити");
        }

        console.log("headers в middleware: ", headers);

        return NextResponse.next({
            request: {headers}
        });
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/",
};
