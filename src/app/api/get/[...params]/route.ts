import axios from "axios";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, { params }: { params: { params: string[] } }) {
    const resolvedParams = await (async () => params)();

    const apiPath = resolvedParams?.params ? `/${resolvedParams.params.join("/")}` : "";

    const { search } = new URL(request.url);

    const queryParams = search || "";



    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${apiPath}${queryParams}`;

    const authHeader = request.headers.get("Authorization");

    const response = await axios.get(apiUrl, {
        headers: {
            Authorization: authHeader,
        },
    });

    return NextResponse.json(response.data);
}