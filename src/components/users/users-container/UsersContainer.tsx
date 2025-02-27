"use client";
import React, {FC, useEffect, useState} from "react";
import {IUser} from "@/models/user/IUser";
import {fetchUsersApi} from "@/services/api.service";
import UsersComponent from "@/components/users/users-component/UsersComponent";
import {useSearchParams} from "next/navigation";

interface UsersContainerProps {
    page: number;
    limit: number;
    skip: number;
}

const UsersContainer: FC<UsersContainerProps> = ({page, limit, skip}) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    useEffect(() => {
        const fetchUsers = async () => {
            const baseEndpoint = `/auth/users?limit=${limit}&skip=${skip}`;
            const finalEndpoint = query ? `/search?q=${query}&${baseEndpoint}` : baseEndpoint;

            setUsers((await fetchUsersApi(finalEndpoint)).users);
        };
        fetchUsers().catch(console.error);
    }, [query, page, limit, skip]);

    return <UsersComponent users={users}/>;
};

export default UsersContainer;
