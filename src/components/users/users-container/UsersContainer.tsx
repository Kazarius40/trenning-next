"use client";
import React, {FC, useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {IUser} from "@/models/user/IUser";
import {fetchUsersApi} from "@/services/api.service";
import UsersComponent from "@/components/users/users-component/UsersComponent";

interface UsersContainerProps {
    page: number;
    limit: number;
    skip: number;
}

const UsersContainer: FC<UsersContainerProps> = ({page, limit, skip}) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const searchEndpoint = getCookie("searchEndpoint");

    useEffect(() => {
        const fetchUsers = async () => {


            const baseEndpoint = `/auth/users?limit=${limit}&skip=${skip}`;
            const finalEndpoint = searchEndpoint ? searchEndpoint + "&" + baseEndpoint : baseEndpoint;


            setUsers((await fetchUsersApi(finalEndpoint)).users);

        };
        fetchUsers().catch(console.error);
    }, [searchEndpoint, page, limit, skip]);

    return <UsersComponent users={users}/>;
};

export default UsersContainer;
