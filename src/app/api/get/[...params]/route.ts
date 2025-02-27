import {AxiosError} from "axios";
import {NextRequest, NextResponse} from "next/server";
import axiosInstance from "@/services/axios.instance";
import {ApiResponse} from "@/models/api-response/ApiResponse";

interface RequestParams {
    params: { params: string[] };
}

export async function GET(
    request: NextRequest,
    {params}: RequestParams
): Promise<NextResponse<ApiResponse | null>> {

    const resolvedParams = await (async () => params)();
    const apiPath = resolvedParams?.params ? `/${resolvedParams.params.join("/")}` : "";
    const {search} = new URL(request.url);
    const queryParams = search || "";

    const apiUrl = `${apiPath}${queryParams}`;
    const Authorization = request.headers.get("Authorization");

    try {
        const {data} = await axiosInstance.get<ApiResponse>(apiUrl, {headers: {Authorization}});

        return NextResponse.json(data);
    } catch (error) {
        const status = (error as AxiosError).response?.status || 500;
        return NextResponse.json(null, {status});
    }

}