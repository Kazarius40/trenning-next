import Link from "next/link";

export default function Home() {
    return (
        <>
            <>
                <h1>Ласкаво просимо на головну сторінку!</h1>
                <p>Для подальшої роботи з сайтом потрібно залогінитися.</p>
                <Link href="/authorization">
                    <button>Перейти до сторінки входу</button>
                </Link>
            </>
        </>
    );
}
