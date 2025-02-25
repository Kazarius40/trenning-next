"use client";
import {fetchUsersApi} from "@/services/get.service";
import {useEffect, useState} from "react";

export default function UsersPage() {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await fetchUsersApi(`/auth/users?limit=1`);
            setUsers(response);
        })();
    }, []);


    return (
        <>
          Content UsersPage
            {users ? (
                <pre>{JSON.stringify(users, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}