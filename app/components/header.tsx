import { Link } from "@remix-run/react";

export type HeaderProps = {
    menuList: {
        name: string;
        href: string;
    }[];
};

export default function Header({ menuList }: HeaderProps) {
    return (
        <header className="flex items-center h-16 shadow">
            <div className="title w-64 text-2xl text-center font-extrabold">
                連結会計
            </div>
            <ul className="flex font-semibold space-x-12">
                {menuList.map((menu, index) => (
                    <li key={index} className=" hover:text-green-400">
                        <Link to={menu.href}>{menu.name}</Link>
                    </li>
                ))}
            </ul>
        </header>
    );
}
