import Link from "next/link";
import {useCallback, useEffect, useState} from "react";
import {fetchUsersApi} from "@/services/api.service";
import {useRouter, useSearchParams} from "next/navigation";
import {IUsers} from "@/models/users/IUsers";

interface PaginationProps {
    page: number
}

export default function PaginationComponentUsers({page}: PaginationProps) {
    const [total, setTotal] = useState<number>(0);
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const limit = 30;

    const redirectToHome = useCallback(() => {
        router.push("/");
    }, [router]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetchUsersApi<IUsers>(`/auth/users?limit=1`);
                setTotal(response.total);
            } catch (error) {
                console.error(error);
                redirectToHome();
            }
        })();
    }, [redirectToHome]);

    const isDisabled = query !== "";

    return (
        <div>
            <Link href={`/users?page=${page - 1}`}>
                <button disabled={page <= 1 || isDisabled}>Попередня</button>
            </Link>

            <Link href={`/users?page=${page + 1}`}>
                <button disabled={page * limit >= total || isDisabled}>Наступна</button>
            </Link>

            <div>Content UsersPage</div>
        </div>
    );
}
