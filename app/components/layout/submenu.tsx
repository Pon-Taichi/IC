import { Link } from "@remix-run/react";

export type SubMenuProps = {
    submenuList: {
        name: string;
        href: string;
    }[];
};

export default function SubMenu({ submenuList }: SubMenuProps) {
    return (
        <div className="w-64 border-r">
            <ul className="font-medium my-8 space-y-8 text-center text-md">
                {submenuList.map((menu, index) => (
                    <li key={index}>
                        <Link
                            to={menu.href}
                            className="hover:text-green-400 transition"
                        >
                            {menu.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
