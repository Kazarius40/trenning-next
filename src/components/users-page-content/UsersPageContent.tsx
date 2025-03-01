"use client";

import SearchInput from "@/components/search-input/SearchInput";
import UsersContainer from "@/components/users/users-container/UsersContainer";
import {useSearchParams} from "next/navigation";
import {useState} from "react";
import PaginationComponent from "@/components/pagination/PaginationComponentUsers";

function UsersPageContent() {
    const searchParams = useSearchParams();
    const pageParam = searchParams.get("page") || "1";
    const page = Number(pageParam);
    const limit = 30;
    const skip = (page - 1) * limit;

    const [total, setTotal] = useState<number>(0)

    return (
        <>
            <PaginationComponent page={page} total={total}/>
            <SearchInput />
            <UsersContainer page={page} limit={limit} skip={skip} setTotal={setTotal} />
        </>
    );
}

export default UsersPageContent;