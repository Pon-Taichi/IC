import { Outlet, useLoaderData } from "@remix-run/react";
import SubMenu from "~/components/layout/submenu";

export const clientLoader = () => {
    const submenuList = [
        { name: "基本設定", href: "/master" },
        { name: "収集プロジェクト", href: "/master/core" },
        { name: "決算プロジェクト", href: "/master/consolidates" },
    ];

    return { submenuList };
};

export default function Master() {
    const { submenuList } = useLoaderData<typeof clientLoader>();

    return (
        <div className="flex h-full">
            <SubMenu submenuList={submenuList} />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}
