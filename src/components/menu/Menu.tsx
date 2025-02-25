import Link from "next/link";


const Menu = () => {


    return (
        <nav>
            <ul>
                <li><Link href="/users">Користувачі</Link></li>
                <li><Link href="/recipes">Рецепти</Link></li>
            </ul>
        </nav>
    );
};

export default Menu;