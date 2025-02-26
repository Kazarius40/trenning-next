import axios from "axios";
import {NextRequest, NextResponse} from "next/server";

interface RequestParams {
    params: { params: string[] };
}

export async function GET(request: NextRequest, {params}: RequestParams) {
    const resolvedParams = await (async () => params)();

    const apiPath = resolvedParams?.params ? `/${resolvedParams.params.join("/")}` : "";

    const {search} = new URL(request.url);

    const queryParams = search || "";

    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
    const apiUrl = `${baseUrl}${apiPath}${queryParams}`;

    const Authorization = request.headers.get("Authorization");

    const response = await axios.get(apiUrl, {
        headers: {
            Authorization,
        },
    });
    const users = response.data;
    const total = users.total;
    if(Error){
        console.log(Error);
    }
    return NextResponse.json({users, total});
}