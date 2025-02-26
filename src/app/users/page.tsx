"use client";
import PaginationComponentUsers from "@/components/pagination/PaginationComponentUsers";
import {useEffect, useState} from "react";

interface UsersPageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default function UsersPage({searchParams}: UsersPageProps) {
    const [page, setPage] = useState(1);

    useEffect(() => {
        searchParams.then((resolvedSearchParams) => {
            setPage(Number(resolvedSearchParams?.page) || 1);
        });
    }, [searchParams]);

    return (
        <>
            <PaginationComponentUsers page={page}/>
        </>
    );
}