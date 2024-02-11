import { Outlet, useLoaderData } from "@remix-run/react";
import Header from "~/components/header";

export const loader = () => {
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
    return { menuList };
};

export default function App() {
    const { menuList } = useLoaderData<typeof loader>();
    return (
        <div className="flex flex-col h-screen">
            <div>
                <Header menuList={menuList} />
            </div>

            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
    );
}
