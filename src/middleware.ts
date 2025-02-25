import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {

    if (req.method === "GET") {
        const accessTokenCookie = req.cookies.get("accessToken");
        const accessToken = accessTokenCookie?.value;


        const headers = new Headers(req.headers);

        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }

        return NextResponse.next({
            request: {headers}
        });
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/api/:path*",
};
