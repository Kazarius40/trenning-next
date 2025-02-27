import {AxiosError} from "axios";
import {NextRequest, NextResponse} from "next/server";
import axiosInstance from "@/services/axios.instance";

interface RequestParams {
    params: { params: string[] };
}

export async function GET(request: NextRequest, {params}: RequestParams) {

    const resolvedParams = await (async () => params)();
    const apiPath = resolvedParams?.params ? `/${resolvedParams.params.join("/")}` : "";
    const {search} = new URL(request.url);
    const queryParams = search || "";

    const apiUrl = `${apiPath}${queryParams}`;
    const Authorization = request.headers.get("Authorization");

    try {
        const {data} = await axiosInstance.get(apiUrl, {headers: {Authorization}});

        return NextResponse.json(data);
    } catch (error) {
        const axiosError = error as AxiosError;
        const status = axiosError.response?.status || 500;

        return NextResponse.json({}, {status});
    }

}