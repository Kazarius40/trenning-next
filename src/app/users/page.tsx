"use client";
import PaginationComponentUsers from "@/components/pagination/PaginationComponentUsers";
import {useEffect, useState} from "react";
import SearchInput from "@/components/search-input/SearchInput";
import UsersContainer from "@/components/users/users-container/UsersContainer";

interface UsersPageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default function UsersPage({searchParams}: UsersPageProps) {
    const [page, setPage] = useState(1);

    const limit = 30;
    const skip = (page - 1) * limit;

    useEffect(() => {
        searchParams.then((resolvedSearchParams) => {
            setPage(Number(resolvedSearchParams?.page) || 1);
        });
    }, [searchParams]);

    return (
        <>
            <PaginationComponentUsers page={page}/>
            <SearchInput/>
            <UsersContainer page={page} limit={limit} skip={skip} />
        </>
    );
}