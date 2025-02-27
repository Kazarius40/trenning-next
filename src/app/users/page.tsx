"use client";
import PaginationComponentUsers from "@/components/pagination/PaginationComponentUsers";
import SearchInput from "@/components/search-input/SearchInput";
import UsersContainer from "@/components/users/users-container/UsersContainer";
import {useSearchParams} from "next/navigation";

export default function UsersPage() {
    const searchParams = useSearchParams();
    const pageParam = searchParams.get("page") || "1";
    const page = Number(pageParam);

    const limit = 30;
    const skip = (page - 1) * limit;

    return (
        <>
            <PaginationComponentUsers page={page}/>
            <SearchInput/>
            <UsersContainer page={page} limit={limit} skip={skip} />
        </>
    );
}