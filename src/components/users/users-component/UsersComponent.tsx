'use client';
import Link from "next/link";
import {IUser} from "@/models/user/IUser";

interface IUsersProps {
    users: IUser[];
    user: IUser | null;
}

export default function UsersComponent({users, user}: IUsersProps) {

    if (!user && users.length === 0) {
        return <p>Завантаження...</p>;
    }

    return(
        <div>
            <h1>Список користувачів</h1>
            {user ? (
                <ul>
                    <li key={user.id}>
                        <p>
                            <strong>ID:</strong> {user.id}
                        </p>
                        <p>
                            <strong>Name:</strong> {user.username}
                        </p>
                        <p>
                            <strong>E-Mail:</strong> {user.email}
                        </p>
                        <Link href={`/user/${user.id}`}>Переглянути профіль</Link>
                    </li>
                </ul>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <p>
                                <strong>ID:</strong> {user.id}
                            </p>
                            <p>
                                <strong>Name:</strong> {user.username}
                            </p>
                            <p>
                                <strong>E-Mail:</strong> {user.email}
                            </p>
                            <Link href={`/user/${user.id}`}>Переглянути профіль</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};