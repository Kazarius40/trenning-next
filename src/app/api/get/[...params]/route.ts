import {AxiosError} from "axios";
import {NextRequest, NextResponse} from "next/server";
import axiosInstance from "@/services/axios.instance";
import {ApiResponse} from "@/models/api-response/ApiResponse";

export async function GET(
    request: NextRequest
): Promise<NextResponse<ApiResponse | null>> {

    const url = new URL(request.url);
    const apiPath = url.pathname.replace(/^\/api\/get/, "");

    const queryParams = url.search || "";

    const Authorization = request.headers.get("Authorization");

    try {
        const {data} = await axiosInstance.get<ApiResponse>(`${apiPath}${queryParams}`, {headers: {Authorization}});

        return NextResponse.json(data);
    } catch (error) {
        const status = (error as AxiosError).response?.status || 500;
        return NextResponse.json(null, {status});
    }

}