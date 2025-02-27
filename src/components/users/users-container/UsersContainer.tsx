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
    const [user, setUser] = useState<IUser | null>(null);
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const isNumericQuery = !isNaN(Number(query)) && query.trim() !== "";

    useEffect(() => {
        const fetchUsers = async () => {
            const baseEndpoint = `/auth/users?limit=${limit}&skip=${skip}`;

            const finalEndpoint = isNumericQuery
                ? `/auth/users/${Number(query)}`
                : query
                    ? `/auth/users/search?q=${query}` : baseEndpoint;

            const response = await fetchUsersApi(finalEndpoint);

            if (isNumericQuery) {
                setUser(response);
                setUsers([]);
            } else {
                setUser(null);
                setUsers(response.users);
            }
        };
        fetchUsers().catch(console.error);
    }, [query, isNumericQuery, page, limit, skip]);

    return <UsersComponent user={user} users={users}/>;
};

export default UsersContainer;
