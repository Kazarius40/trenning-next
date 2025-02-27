'use client';
import Link from "next/link";
import {IUser} from "@/models/user/IUser";

interface IUsersProps {
    users: IUser[];
}

export default function UsersComponent({users}: IUsersProps) {
    return(
        <div>
            <h1>Список користувачів</h1>
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
                        <Link href={`/pages/user/${user.id}`}>Переглянути профіль</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};