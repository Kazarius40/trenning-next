import Link from "next/link";
import {useSearchParams} from "next/navigation";

interface PaginationProps {
    page: number;
    total: number;
}

export default function PaginationComponent({page, total}: PaginationProps) {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const limit = 30;

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
