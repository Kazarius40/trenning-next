import PaginationComponentUsers from "@/app/components/pagination/PaginationComponentUsers";
import SearchInput from "@/app/components/search-input/SearchInput";
import {fetchUsersApi} from "@/app/services/get.service";

interface UsersPageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function UsersPage({searchParams}: UsersPageProps) {
    const resolvedSearchParams = (await searchParams) ?? {};
    const page = Number(resolvedSearchParams?.page) || 1;

    const limit = 30;
    const skip = (page - 1) * limit;
    let total;

    const response = await fetchUsersApi(`/auth/users?limit=1`);
    total = response.total;


    return (
        <>
            <PaginationComponentUsers page={page} total={total}/>
            <SearchInput/>
            <UsersContainer page={page} limit={limit} skip={skip}/>
        </>
    );
}