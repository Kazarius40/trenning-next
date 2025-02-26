import Link from "next/link";
import {useEffect, useState} from "react";
import {fetchUsersApi} from "@/services/api.service";

interface PaginationProps {
    page: number
}

export default function PaginationComponentUsers({page}: PaginationProps) {

    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const {total} = await fetchUsersApi(`/auth/users?limit=1`);
            setTotal(total);
        })();
    }, []);


    const limit = 30;

    return (
        <div>
            <Link href={`/users?page=${page - 1}`}>
                <button disabled={page <= 1}>Попередня</button>
            </Link>

            <Link href={`/users?page=${page + 1}`}>
                <button disabled={page * limit >= total}>Наступна</button>
            </Link>

            <div>Content UsersPage</div>
        </div>
    );
}
