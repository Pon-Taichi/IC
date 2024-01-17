export default function Header() {
    const menuList = [
        { name: "ダッシュボード", href: "/" },
        { name: "プロジェクト", href: "/projects" },
        {
            name: "入力",
            href: "/input",
        },
        { name: "レポート", href: "/reports" },
        { name: "設定", href: "/settings" },
    ];

    return (
        <header className="flex items-center h-16 shadow">
            <div className="title w-40 text-3xl text-center font-extrabold">
                IC
            </div>
            <ul className="flex font-semibold space-x-12">
                {menuList.map((menu, index) => (
                    <li key={index} className=" hover:text-green-400">
                        {menu.name}
                    </li>
                ))}
            </ul>
        </header>
    );
}
