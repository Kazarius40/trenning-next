'use client';
import React, {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSearch(newValue);

        const newUrl = pathname.startsWith("/recipes")
            ? `/recipes?q=${newValue}`
            : `/users?q=${newValue}`;
        router.push(newUrl);
    };

    useEffect(() => {
        setSearch(searchParams.get("q") || "");
    }, [searchParams]);

    return (
        <>
            <input
                type="text"
                value={search}
                onChange={handleSearch}
            />

        </>
    )
}

export default SearchInput;