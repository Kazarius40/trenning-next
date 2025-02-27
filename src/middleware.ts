import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
    const accessTokenCookie = req.cookies.get("accessToken");
    const accessToken = accessTokenCookie?.value;

    if (req.method === "GET" && accessToken) {
        const headers = new Headers(req.headers);
        headers.set('Authorization', `Bearer ${accessToken}`);
        return NextResponse.next({request: {headers}});
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/api/:path*",
};
