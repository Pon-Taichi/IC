import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export type HeaderProps = {
    menuList: {
        name: string;
        href: string;
    }[];
};

export default function Header({ menuList }: HeaderProps) {
    return (
        <header className="flex justify-between items-center h-16 shadow">
            <div className="flex items-center">
                <div className="title w-64 text-2xl text-center font-extrabold">
                    連結会計
                </div>
                <ul className="flex font-bold space-x-12">
                    {menuList.map((menu, index) => (
                        <li
                            key={index}
                            className=" hover:text-green-400 transition-all"
                        >
                            <Link to={menu.href}>{menu.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <Button variant={"link"} className="w-64 font-semibold">
                    <Link to={"/logout"}>ログアウト</Link>
                </Button>
            </div>
        </header>
    );
}
