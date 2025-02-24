import Link from "next/link";


const Menu = () => {


    return (
        <nav>
            <ul>
                <li><Link href="/pages/users">Користувачі</Link></li>
                <li><Link href="/pages/recipes">Рецепти</Link></li>
            </ul>
        </nav>
    );
};

export default Menu;